import React, { useState, useEffect } from 'react';

const CivicConnectSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [expandedService, setExpandedService] = useState(null);

  // Sample data with detailed information about each service
  const cityServices = [
    {
      city: 'New York',
      services: [
        { 
          id: 1, 
          name: 'Trash Collection', 
          description: 'Weekly residential garbage pickup',
          details: {
            schedule: 'Monday and Thursday for residential areas',
            requirements: 'Use city-approved bins or bags',
            contactInfo: '(212) 555-1234',
            website: 'nyc.gov/sanitation',
            fees: 'Included in city taxes',
            additionalServices: ['Bulk item pickup', 'E-waste disposal', 'Composting']
          }
        },
        { 
          id: 2, 
          name: 'Water & Sewer', 
          description: 'Pay your water and sewer bill',
          details: {
            billingCycle: 'Quarterly',
            paymentMethods: ['Online', 'Mail', 'In-person at City Hall'],
            contactInfo: '(212) 555-2345',
            website: 'nyc.gov/water',
            fees: 'Based on usage, minimum $45/quarter',
            additionalServices: ['Water quality testing', 'Leak inspection', 'Service line repairs']
          }
        },
        { 
          id: 3, 
          name: 'Property Taxes', 
          description: 'View and pay property taxes',
          details: {
            dueDate: 'January 15 and July 15',
            paymentMethods: ['Online', 'Mail', 'In-person at Tax Office'],
            contactInfo: '(212) 555-3456',
            website: 'nyc.gov/taxes',
            penalties: '1.5% interest per month on late payments',
            additionalServices: ['Tax exemption applications', 'Assessment appeals', 'Payment plans']
          }
        },
        { 
          id: 4, 
          name: 'Building Permits', 
          description: 'Apply for construction permits',
          details: {
            applicationProcess: 'Online or in-person at Department of Buildings',
            processingTime: '3-15 business days depending on project',
            contactInfo: '(212) 555-4567',
            website: 'nyc.gov/buildings',
            fees: 'Varies by project scope and size',
            additionalServices: ['Plan review', 'Inspections', 'Certificate of occupancy']
          }
        }
      ]
    },
    {
      city: 'Los Angeles',
      services: [
        { 
          id: 1, 
          name: 'Parking Permits', 
          description: 'Apply for residential parking permits',
          details: {
            eligibility: 'Must be a resident of designated permit area',
            cost: '$34 per year per vehicle',
            contactInfo: '(213) 555-1234',
            website: 'la.gov/parking',
            application: 'Online or at City Hall',
            renewalProcess: 'Annual renewal required, notices sent 30 days prior'
          }
        },
        { 
          id: 2, 
          name: 'Street Cleaning', 
          description: 'Check street cleaning schedule',
          details: {
            schedule: 'Varies by neighborhood, typically bi-weekly',
            parkingRestrictions: 'No parking during posted hours - citations issued',
            contactInfo: '(213) 555-2345',
            website: 'la.gov/street-cleaning',
            notifications: 'Sign up for text or email alerts',
            holidayExceptions: 'No street cleaning on federal holidays'
          }
        },
        { 
          id: 3, 
          name: 'Recreation Programs', 
          description: 'Register for city recreation activities',
          details: {
            programs: ['After-school activities', 'Sports leagues', 'Summer camps', 'Senior programs'],
            registration: 'Online, by phone, or in-person at recreation centers',
            contactInfo: '(213) 555-3456',
            website: 'la.gov/recreation',
            fees: 'Vary by program, financial assistance available',
            locations: '35 recreation centers throughout the city'
          }
        },
        { 
          id: 4, 
          name: 'Pet Licensing', 
          description: 'License your pets',
          details: {
            requirements: 'All dogs and cats over 4 months must be licensed and vaccinated for rabies',
            fees: 'Dogs: $20/year (spayed/neutered), $100/year (unaltered); Cats: $10/year',
            contactInfo: '(213) 555-4567',
            website: 'la.gov/animal-services',
            renewalProcess: 'Annual renewal required',
            additionalServices: ['Microchipping', 'Spay/neuter vouchers', 'Lost pet assistance']
          }
        }
      ]
    },
    {
      city: 'Chicago',
      services: [
        { 
          id: 1, 
          name: 'Snow Removal', 
          description: 'Winter snow clearing updates',
          details: {
            priority: 'Main roads cleared first, followed by residential streets',
            parkingRestrictions: 'Snow emergency routes must be cleared of vehicles',
            contactInfo: '(312) 555-1234',
            website: 'chicago.gov/snow',
            notifications: 'Sign up for text or email alerts for snow emergencies',
            selfService: 'Free salt available at fire stations during heavy snow events'
          }
        },
        { 
          id: 2, 
          name: 'Vehicle Stickers', 
          description: 'Purchase annual city vehicle stickers',
          details: {
            requirement: 'Required for all Chicago residents with vehicles',
            cost: '$90.88 for passenger vehicles, $144.44 for larger vehicles',
            deadline: 'Due by July 15 each year',
            contactInfo: '(312) 555-2345',
            website: 'chicago.gov/stickers',
            penalties: '$60 late fee plus $200 ticket for non-compliance'
          }
        },
        { 
          id: 3, 
          name: 'Business Licensing', 
          description: 'Apply for business licenses',
          details: {
            licenseTypes: ['Retail', 'Food Establishment', 'Limited Business', 'Regulated Business'],
            applicationProcess: 'Online application with in-person inspection',
            contactInfo: '(312) 555-3456',
            website: 'chicago.gov/business',
            fees: 'Vary by license type, $250-$700 for most common licenses',
            renewalPeriod: 'Every two years for most licenses'
          }
        },
        { 
          id: 4, 
          name: 'Public Transportation', 
          description: 'Transit maps and schedules',
          details: {
            services: ['CTA Buses', 'L Trains', 'Metra Commuter Rail', 'Water Taxi'],
            fareOptions: ['Ventra Card', 'Single Ride', 'Day Pass', 'Weekly Pass', 'Monthly Pass'],
            contactInfo: '(312) 555-4567',
            website: 'transitchicago.com',
            hours: 'Varies by route, some 24/7 service available',
            accessibility: 'All buses wheelchair accessible, most train stations accessible'
          }
        }
      ]
    }
  ];

  // Filter cities based on search term
  const searchCities = (term) => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredCities = cityServices.filter(city => 
        city.city.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredCities);
      setIsSearching(false);
    }, 500);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 2) {
      searchCities(value);
    } else {
      setSearchResults([]);
    }
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setSearchTerm(city.city);
    setSearchResults([]);
    setExpandedService(null);
  };

  const toggleServiceDetails = (serviceId) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-blue-600 p-6 rounded-t-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-3xl font-bold">CivicConnect</h1>
          <div className="flex items-center">
            <button className="text-white mr-4">
              <span className="text-yellow-300 text-xl">☾</span>
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium">
              Sign In
            </button>
          </div>
        </div>
        
        <h2 className="text-white text-4xl font-bold mb-2">Your City Services, Simplified</h2>
        <p className="text-white text-xl mb-6">Access government services quickly and easily, all in one place.</p>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search for city services..."
            className="w-full p-4 rounded-md text-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="absolute right-2 top-2 bg-blue-500 p-2 rounded-md">
            <div className="text-white text-xl">🔍</div>
          </button>
          
          {searchResults.length > 0 && !selectedCity && (
            <div className="absolute z-10 bg-white w-full mt-1 rounded-md shadow-lg">
              {searchResults.map((city, index) => (
                <div 
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => selectCity(city)}
                >
                  {city.city}
                </div>
              ))}
            </div>
          )}
          
          {isSearching && (
            <div className="absolute z-10 bg-white w-full mt-1 rounded-md shadow-lg p-4 text-center">
              Searching...
            </div>
          )}
        </div>
      </div>
      
      {selectedCity && (
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Services in {selectedCity.city}</h3>
          <div className="space-y-4">
            {selectedCity.services.map(service => (
              <div key={service.id} className="border rounded-md hover:shadow-md overflow-hidden">
                <div className="p-4">
                  <h4 className="font-bold text-lg">{service.name}</h4>
                  <p className="text-gray-600">{service.description}</p>
                  <button 
                    className="mt-2 text-blue-600 hover:underline"
                    onClick={() => toggleServiceDetails(service.id)}
                  >
                    {expandedService === service.id ? "Hide Details" : "Learn More"}
                  </button>
                </div>
                
                {expandedService === service.id && (
                  <div className="bg-blue-50 p-4 border-t">
                    <h5 className="font-bold mb-2">Service Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(service.details).map(([key, value]) => (
                        <div key={key} className="mb-2">
                          <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                          {Array.isArray(value) ? (
                            <ul className="list-disc ml-5">
                              {value.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <span>{value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Contact This Department
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!selectedCity && (
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Popular Services</h3>
          <p className="text-gray-600">Search for a city to see available services.</p>
        </div>
      )}
    </div>
  );
};

export default CivicConnectSearch;
