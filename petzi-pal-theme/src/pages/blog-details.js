import Link from "next/link";
import React from "react";
import BlogCategoryWidget from "../components/blog/BlogCategoryWidget";
import BlogComment from "../components/blog/BlogComment";
import BlogRecentPostWidget from "../components/blog/BlogRecentPostWidget";
import BlogSocialWidget from "../components/blog/BlogSocialWidget";
import BlogTagWidget from "../components/blog/BlogTagWidget";
import SearchWidget from "../components/blog/SearchWidget";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";

function BlogDetailsPage() {
  return (
    <Layout>
      <Breadcrumb pageName="Blog Details" pageTitle="Blog Details" />
      <div className="blog-details-pages pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5 justify-content-center mb-70">
            <div className="col-lg-8">
              <div className="blog-details-wrap mb-120">
                <div className="post-thum">
                  <img
                    className="img-fluid"
                    src="assets/images/blog/blog-dt-img.png"
                    alt="blog-dt-img"
                  />
                  <div className="category">
                    <Link legacyBehavior href="/blog-grid">
                      <a>Medical Care</a>
                    </Link>
                  </div>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li>
                      <Link legacyBehavior href="/blog-grid">
                        <a>August 12, 2022</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid">
                        <a>By, Nikon Brook</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <h2 className="post-title">
                  Luctus justo quis feugiat lacus orcha ornare auguelon Integer
                  gon form together nicelon.
                </h2>
                <div className="post-content">
                  <p>
                    Pellentesque maximus augue orci, quis congue purus iaculison
                    id. Maecenas eu lorem quisesdoi massal molestie vulputate in
                    sitagi amet diam. Cras eu odio sit amet ipsum cursus for
                    that gone pellentesquea. thisaton Vestibulum ut aliquet
                    risus. In hac habitasse plateajoa dictumst. Nuncet posuere
                    scelerisque justo in accumsan.Pellentesque maximus augue
                    orci, quis congue purus iaculison id. Maecenas eu lorem
                    quisesdoi massal molestie vulputate in sitagi amet diam.
                    Cras eu odio sit amet ipsum cursus for that gone
                    pellentesquea. thisaton Vestibulum ut aliquet risus. In hac
                    habitasse plateajoa dictumst. Nuncet posuere scelerisque
                    justo in accumsan.
                  </p>
                  <blockquote>
                    <p>
                      <sup>
                        <img
                          src="assets/images/icon/quage-icon-top.svg"
                          alt="image"
                        />
                      </sup>{" "}
                      Integer quis libero semper, interdum odio non, consequat
                      sem. Qui woner pretium, quamtenti utendi lacinianti
                      ultricies, est urna cursus purus, ut tristique purusenali
                      pretium, quam ut laciniaun est urna{" "}
                      <sub>
                        <img
                          src="assets/images/icon/quage-icon-btm.svg"
                          alt="image"
                        />
                      </sub>
                    </p>
                    <cite>Ezekiel Miles</cite>
                  </blockquote>
                  <p>
                    Pellentesque maximus augue orci, quis congue purus iaculison
                    id. Maecenas eu lorem quisesdoi massal molestie vulputate in
                    sitagi amet diam. Cras eu odio sit amet ipsum cursus for
                    that gone pellentesquea. thisaton Vestibulum ut aliquet
                    risus. In hac habitasse plateajoa dictumst. Nuncet posuere
                    scelerisque justo in accumsan.Pellentesque maximus augue
                    orci, quis congue purus iaculison id. Maecenas eu lorem
                    quisesdoi massal molestie vulputate in sitagi amet diam.
                    Cras eu odio sit amet ipsum
                  </p>
                  <h2>
                    Luctus justo quis feugiat lacus orcha ornare auguelon
                    Integer gon form together nicelon.
                  </h2>
                  <p>
                    Pellentesque maximus augue orci, quis congue purus iaculison
                    id. Maecenas eu lorem quisesdoi massal molestie vulputate in
                    sitagi amet diam. Cras eu odio sit amet ipsum cursus for
                    that gone pellentesquea. thisaton Vestibulum ut aliquet
                    risus. In hac habitasse plateajoa dictumst. Nuncet posuere
                    scelerisque justo in accumsan.Pellentesque maximus augue
                    orci, quis congue purus iaculison id. Maecenas eu lorem
                    quisesdoi massal molestie vulputate in sitagi amet diam.
                    Cras eu odio sit amet ipsum cursus for that gone
                    pellentesquea. thisaton Vestibulum ut aliquet risus. In hac
                    habitasse plateajoa dictumst. Nuncet posuere scelerisque
                    justo in accumsan.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget-area">
                <SearchWidget />
                <BlogRecentPostWidget />
                <BlogSocialWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetailsPage;
