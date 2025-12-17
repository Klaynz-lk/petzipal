import React, { useState } from 'react';
import Layout from '../layout/Layout';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import PurchasedServiceCard from '../components/purchased/PurchasedServiceCard';
import PurchasedServiceStats from '../components/purchased/PurchasedServiceStats';
import PurchasedServiceSearchFilter from '../components/purchased/PurchasedServiceSearchFilter';
import purchasedServicesData from '../data/purchasedServicesData';

const PurchasedServices = () => {
  const [filteredServices, setFilteredServices] = useState(purchasedServicesData);

  const handleSearchAndFilter = (filtered) => {
    setFilteredServices(filtered);
  };

  return (
    <Layout>
      <Breadcrumb pageName="My Services" pageTitle="Purchased Services" />
      
      <section className="purchased-services-section">
        <div className="container">
          <div className="purchased-services-wrapper">
            
            <PurchasedServiceStats services={purchasedServicesData} />
            
            <PurchasedServiceSearchFilter 
              services={purchasedServicesData}
              onSearchAndFilter={handleSearchAndFilter}
            />
            
            <div className="services-grid">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <PurchasedServiceCard 
                    key={service.id} 
                    service={service} 
                  />
                ))
              ) : (
                <div className="no-services">
                  <p>No services found for the selected filter.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PurchasedServices;