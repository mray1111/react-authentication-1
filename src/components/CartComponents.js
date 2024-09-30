import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cardComponents.css';  

const CardComponent = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://172.105.55.211/api/packageApi.php?type=getHolidayPackage', {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRyYXZlbGFnZW50QGdtYWlsLmNvbSIsImlkIjoxMSwidXNlcnR5cGUiOiJ0cmF2ZWxfYWdlbnQiLCJleHAiOjE3MzAyNTk5MTh9.zi9WHid5zu48JhUXod1hPVZc7Cg79AX7JyuVMs3qFiU`,
          },
        });

        if (response.data.isSuccess && response.data.data) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Holiday Packages</h2>
      <div className="card-container">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div className="card" key={pkg.id}>
              <h3>{pkg.title}</h3>
              <img 
                src={pkg.images[0]} 
                alt={pkg.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
             
            </div>
          ))
        ) : (
          <p>No packages available.</p>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
