import React, { useState } from 'react';

const LicenseRenewalService = () => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    expirationDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    acceptTerms: false
  });

  const handleLicenseSelect = (licenseType) => {
    setSelectedLicense(licenseType);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the data to your backend
    console.log('Form submitted:', { licenseType: selectedLicense, ...formData });
    alert('Renewal request submitted successfully!');
    // Reset form or redirect as needed
    setSelectedLicense(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      expirationDate: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      acceptTerms: false
    });
  };

  const handleBack = () => {
    setSelectedLicense(null);
  };

  // License options with descriptions
  const licenseTypes = [
    {
      id: 'drivers',
      title: "Driver's License",
      description: "Renew or replace your driver's license"
    },
    {
      id: 'business',
      title: "Business License",
      description: "Renew your business operating permit"
    },
    {
      id: 'professional',
      title: "Professional License",
      description: "Renew professional certifications"
    },
    {
      id: 'special',
      title: "Special Permits",
      description: "Event permits, parking permits, etc."
    }
  ];

  // Form for the selected license type
  const renderForm = () => {
    const selectedLicenseInfo = licenseTypes.find(lt => lt.id === selectedLicense);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 mr-4"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">Renew {selectedLicenseInfo.title}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="licenseNumber">License Number</label>
                <input 
                  type="text" 
                  id="licenseNumber" 
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">License Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="expirationDate">Expiration Date</label>
                <input 
                  type="date" 
                  id="expirationDate" 
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="city">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="state">State</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="zipCode">Zip Code</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="acceptTerms" 
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
              <label className="ml-2 text-gray-700" htmlFor="acceptTerms">
                I confirm that all information provided is accurate and I agree to the terms and conditions.
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Submit Renewal Application
            </button>
          </div>
        </form>
      </div>
    );
  };

  // License selection screen
  const renderLicenseSelection = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-blue-200 p-2 rounded mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">License Renewal</h1>
          </div>
          <p className="text-gray-600 mb-6">Renew your driver's license, business permits, and professional credentials</p>
          
          <h2 className="text-xl font-semibold mb-4">License Types</h2>
          <div className="space-y-4">
            {licenseTypes.map(license => (
              <div 
                key={license.id}
                className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                onClick={() => handleLicenseSelect(license.id)}
              >
                <h3 className="text-lg font-semibold text-blue-600">{license.title}</h3>
                <p className="text-gray-600">{license.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {selectedLicense ? renderForm() : renderLicenseSelection()}
    </div>
  );
};

export default LicenseRenewalService;