import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';

// License Renewal Page
export const LicenseRenewalPage = ({ darkMode, onBack, userData }) => {
  const [licenseType, setLicenseType] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [formStep, setFormStep] = useState(1);
  
  // Pre-fill form if userData exists
  useEffect(() => {
    if (userData?.licenses) {
      setLicenseNumber(userData.licenses.number || '');
      setExpirationDate(userData.licenses.expiration || '');
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Move to next step or submit form
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      // Here you would submit the form data to your backend
      alert('License renewal request submitted!');
      onBack();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Service Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4`}>
        <div className="container mx-auto">
          <div className="flex items-center">
            <button 
              onClick={onBack} 
              className="mr-4 p-2 rounded-full hover:bg-opacity-20 hover:bg-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">License Renewal</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 flex items-center justify-center rounded-full 
                    ${step === formStep 
                      ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white' 
                      : step < formStep 
                        ? darkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white' 
                        : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}
                >
                  {step < formStep ? '✓' : step}
                </div>
                <span className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step === 1 ? 'License Type' : step === 2 ? 'Personal Info' : 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className={`absolute top-0 left-0 h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-full rounded`}></div>
            <div className={`absolute top-0 left-0 h-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-600'} rounded`} style={{ width: `${((formStep - 1) / 2) * 100}%` }}></div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          {formStep === 1 && (
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Select License Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Driver\'s License', 'Business License', 'Professional License', 'Special Permit'].map((type) => (
                  <div 
                    key={type}
                    onClick={() => setLicenseType(type)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300
                      ${licenseType === type 
                        ? darkMode ? 'border-blue-500 bg-blue-500 bg-opacity-20' : 'border-blue-500 bg-blue-50' 
                        : darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="licenseType" 
                        id={type}
                        checked={licenseType === type}
                        onChange={() => setLicenseType(type)}
                        className="mr-3"
                      />
                      <label htmlFor={type} className="flex-1 cursor-pointer">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{type}</div>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Renew your {type.toLowerCase()} easily online
                        </p>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {licenseType} Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    License Number
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className={`w-full p-3 rounded-md border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your license number"
                    required
                  />
                </div>
                
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className={`w-full p-3 rounded-md border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Review Your Information
              </h2>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>License Type:</span>
                    <span className="font-medium">{licenseType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>License Number:</span>
                    <span className="font-medium">{licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Expiration Date:</span>
                    <span className="font-medium">{expirationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Renewal Fee:</span>
                    <span className="font-medium">$45.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {formStep > 1 && (
              <button
                type="button"
                onClick={() => setFormStep(formStep - 1)}
                className={`px-6 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`px-6 py-2 rounded-md ml-auto ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {formStep < 3 ? 'Continue' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
