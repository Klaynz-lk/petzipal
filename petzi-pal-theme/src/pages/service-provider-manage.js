import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { getUserData, isAuthenticated } from "../utils/authUtils";
import { useRouter } from "next/router";
import Link from "next/link";

const ServiceProviderManage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [services, setServices] = useState([]);
    const [profileLoading, setProfileLoading] = useState(true);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            const userData = getUserData();
            setUser(userData);
            setLoading(false);
            if (userData?.id) {
                fetchProfileAndServices(userData.id);
            }
        }
    }, [router]);

    const fetchProfileAndServices = async (userId) => {
        try {
            setProfileLoading(true);
            setServicesLoading(true);

            if (!backendUrl) {
                throw new Error("Backend URL is not configured");
            }

            // 1. Fetch Profile Data
            const profileRes = await fetch(`${backendUrl}/api/v1/pet-service-profile/user/${userId}`);
            if (!profileRes.ok) throw new Error("Failed to fetch profile");
            const profileData = await profileRes.json();
            setProfile(profileData);

            // 2. Fetch Provider's Services (using profile ID from the response)
            if (profileData?.id) {
                const servicesRes = await fetch(`${backendUrl}/api/v1/profiles/${profileData.id}/pet-services`);
                if (servicesRes.ok) {
                    const servicesData = await servicesRes.json();
                    setServices(servicesData);
                }
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message);
        } finally {
            setProfileLoading(false);
            setServicesLoading(false);
        }
    };

    if (loading || profileLoading) {
        return (
            <Layout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Breadcrumb pageName="Manage Profile" pageTitle="Service Provider Manage" />
                <div className="container pt-120 pb-120 text-center">
                    <div className="alert alert-danger mb-4">
                        <h4>Error Loading Profile</h4>
                        <p>{error}</p>
                    </div>
                    <button className="primary-btn1" onClick={() => fetchProfileAndServices(user?.id)}>Try Again</button>
                </div>
            </Layout>
        );
    }

    if (!profile) {
        return (
            <Layout>
                <Breadcrumb pageName="Manage Profile" pageTitle="Service Provider Manage" />
                <div className="container pt-120 pb-120 text-center">
                    <div className="alert alert-info">
                        <h4>No Profile Found</h4>
                        <p>You haven't created a service provider profile yet.</p>
                    </div>
                    <button className="primary-btn1">Create Profile</button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Breadcrumb pageName="Manage Profile" pageTitle="Service Provider Manage" />

            <div className="service-provider-manage-area pt-120 pb-120">
                <div className="container">
                    {/* 1. Profile Header Section */}
                    <div className="profile-header-card mb-5 wow fadeInUp" data-wow-duration="1.5s">
                        <div className="row align-items-center g-4">
                            <div className="col-md-auto text-center text-md-start">
                                <div className="profile-img-wrap">
                                    <img src={profile.profile_picture || "assets/images/team/team1.png"} alt="Profile" className="rounded-circle border border-5 border-white shadow" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                                    <span className="status-badge" style={{ backgroundColor: profile.status === "ACTIVE" ? "#28a745" : "#ffc107", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", position: "absolute", bottom: "10px", right: "10px" }}>{profile.status || "Pending"}</span>
                                </div>
                            </div>
                            <div className="col-md text-center text-md-start">
                                <div className="profile-info">
                                    <h2 className="mb-2">{profile.business_name}</h2>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Left Column */}
                        <div className="col-lg-8">

                            {/* 2. About Provider Section */}
                            <div className="card-custom mb-4 p-4 p-md-5 bg-white shadow-sm border rounded">
                                <h4 className="mb-4 d-flex align-items-center"><i className="bi bi-person-lines-fill text-primary me-2"></i> About Provider</h4>
                                <p className="mb-4 leading-relaxed">{profile.description}</p>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <h6 className="fw-bold mb-2">Qualifications</h6>
                                        <p>{profile.qualifications || "Not specified"}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="fw-bold mb-2">Experience</h6>
                                        <p>{profile.experience_years ? `${profile.experience_years} Years` : "Not specified"}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="card-custom mb-4 p-4 p-md-5 bg-white shadow-sm border rounded">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="mb-0 d-flex align-items-center"><i className="bi bi-scissors text-primary me-2"></i> Services Offered</h4>
                                </div>

                                {servicesLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading services...</span>
                                        </div>
                                        <p className="mt-2">Loading services...</p>
                                    </div>
                                ) : (
                                    <div className="row g-4 justify-content-center">
                                        {services.length > 0 ? (
                                            services.map((service) => (
                                                <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                                                    <div className="service-card text-center h-100">
                                                        <div className="service-img-wrapper mb-3">
                                                            <img
                                                                src={service.image || "/assets/images/bg/banner-img.jpg"}
                                                                alt={service.name}
                                                                className="img-fluid service-img"
                                                            />
                                                        </div>
                                                        <h3 className="service-title mb-4">{service.name}</h3>
                                                        <Link href={`/shop?service=${service.service_type_id || service.id}`} legacyBehavior>
                                                            <a className="account-btn">View Services</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center py-5">
                                                <p>No services found.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-4">
                            {/* 4. Availability & Working Hours */}
                            <div className="card-custom mb-4 p-4 bg-white shadow-sm border rounded">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="mb-0">Availability</h5>
                                </div>
                                <div className="working-hours">
                                    {profile.availability_hours ? (
                                        Object.entries(profile.availability_hours).map(([day, hours], idx) => (
                                            <div key={idx} className="d-flex justify-content-between py-2 border-bottom border-light">
                                                <span className="fw-medium">{day}</span>
                                                <span className="text-primary">{hours}</span>
                                            </div>
                                        ))
                                    ) : (
                                        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, idx) => (
                                            <div key={idx} className="d-flex justify-content-between py-2 border-bottom border-light">
                                                <span className="fw-medium">{day}</span>
                                                <span className="text-muted">Not set</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* 5. Location Information */}
                            <div className="card-custom mb-4 p-4 bg-white shadow-sm border rounded">
                                <h5 className="mb-4">Location</h5>
                                <div className="location-info">
                                    <p className="mb-3 text-muted leading-snug">
                                        {profile.address || "No address provided"}<br />
                                        {(typeof profile.city === 'object' ? profile.city?.city : profile.city) &&
                                            `${typeof profile.city === 'object' ? profile.city?.city : profile.city}, `}
                                        {typeof profile.district === 'object' ? profile.district?.district : profile.district}
                                    </p>
                                </div>
                            </div>

                            {/* 6. Owner / Contact Details */}
                            <div className="card-custom p-4 bg-white shadow-sm border rounded" style={{ backgroundColor: "#f8f9fa !important" }}>
                                <div className="d-flex align-items-center mb-4">
                                    <h5 className="mb-0">Contact Details</h5>
                                </div>

                                <div className="contact-item mb-3">
                                    <label className="text-muted small d-block">Contact Number</label>
                                    <span className="fw-medium">{profile.contact_number || "Not provided"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .card-custom {
          background: #fff;
          transition: transform 0.3s ease;
        }
        .profile-header-card {
          background: #fff;
          padding: 40px;
          border-radius: 15px;
          border: 1px solid #eee;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .profile-img-wrap {
          position: relative;
          display: inline-block;
        }
        .primary-btn3 {
          background: var(--primary-color1);
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          font-weight: 500;
        }
        .service-card-mini:hover {
          border-color: var(--primary-color1) !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .leading-relaxed {
          line-height: 1.8;
          color: #555;
        }
        .leading-snug {
          line-height: 1.4;
        }
      `}</style>
        </Layout>
    );
};

export default ServiceProviderManage;
