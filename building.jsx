//Building Permits Page
export const BuildingPermitsPage = ({ darkMode, onBack, userData }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [permitType, setPermitType] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [existingPermits, setExistingPermits] = useState([]);
  
  useEffect(() => {
    // Simulate fetching existing permits
    setTimeout(() => {
      setExistingPermits([
        { id: 'BP-2025-0123', type: 'Residential Addition', status: 'Under Review', submitted: '03/15/2025' },
        { id: 'BP-2024-9876', type: 'Fence Installation', status: 'Approved', submitted: '12/10/2024' }
      ]);
}, 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Move to next step or submit form
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      // Here you would submit the form data to your backend
      alert('Building permit application submitted! You will receive updates via email.');
      onBack();
    }
  };

  const permitTypes = [
    { id: 'residential', name: 'Residential Construction', description: 'New homes, additions, remodels' },
    { id: 'commercial', name: 'Commercial Construction', description: 'New buildings, tenant improvements' },
    { id: 'fence', name: 'Fence/Wall', description: 'Property boundary fences, retaining walls' },
    { id: 'electrical', name: 'Electrical', description: 'Wiring, panels, electrical systems' },
    { id: 'plumbing', name: 'Plumbing', description: 'Water lines, sewer connections, fixtures' },
    { id: 'demolition', name: 'Demolition', description: 'Structure removal or demolition' }
  ];

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
            <h1 className="text-2xl font-bold">Building Permits</h1>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('new')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'new'
                  ? darkMode 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              New Permit
            </button>
            <button
              onClick={() => setActiveTab('existing')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'existing'
                  ? darkMode 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Existing Permits
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'new' ? (
          <div>
            {/* Progress Steps for New Permit */}
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
                      {step === 1 ? 'Permit Type' : step === 2 ? 'Property Details' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className={`absolute top-0 left-0 h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-full rounded`}></div>
                <div className={`absolute top-0 left-0 h-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-600'} rounded`} style={{ width: `${((formStep - 1) / 2) * 100}%` }}></div>
              </div>
            </div>

            {/* New Permit Form */}
            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Select Permit Type
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permitTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setPermitType(type.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300
                          ${permitType === type.id 
                            ? darkMode ? 'border-blue-500 bg-blue-500 bg-opacity-20' : 'border-blue-500 bg-blue-50' 
                            : darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            name="permitType" 
                            id={type.id}
                            checked={permitType === type.id}
                            onChange={() => setPermitType(type.id)}
                            className="mr-3"
                          />
                          <label htmlFor={type.id} className="flex-1 cursor-pointer">
                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{type.name}</div>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {type.description}
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
                    Property Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Property Address
                      </label>
                      <input
                        type="text"
                        className={`w-full p-3 rounded-md border ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Enter property address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Parcel Number
                      </label>
                      <input
                        type="text"
                        className={`w-full p-3 rounded-md border ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Enter parcel number"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Project Description
                      </label>
                      <textarea
                        className={`w-full p-3 rounded-md border ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Describe your project"
                        rows={4}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Estimated Project Value
                      </label>
                      <div className="flex">
                        <span className={`inline-flex items-center px-3 ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 border-gray-700' 
                            : 'bg-gray-200 text-gray-600 border-gray-300'
                        } border rounded-l-md`}>$</span>
                        <input
                          type="number"
                          className={`flex-1 p-3 rounded-none rounded-r-md border ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Review & Submit
                  </h2>
                  
                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="space-y-4">
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Selected Permit Type</h3>
                        <p className="mt-1">
                          {permitTypes.find(type => type.id === permitType)?.name || ''}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Required Documents</h3>
                        <ul className={`mt-1 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <li>Property deed or proof of ownership</li>
                          <li>Site plan/drawings (PDF format)</li>
                          <li>Contractor information (if applicable)</li>
                          <li>HOA approval (if applicable)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Fee Estimate</h3>
                        <div className={`mt-2 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <div className="flex justify-between">
                            <span>Application Fee:</span>
                            <span>$150.00</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>Plan Review:</span>
                            <span>$75.00</span>
                          </div>
                          <div className="flex justify-between mt-1 font-medium">
                            <span>Total:</span>
                            <span>$225.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="terms" className="mr-2" required />
                    <label htmlFor="terms" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                    </label>
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
                  {formStep < 3 ? 'Continue' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Your Permit Applications
            </h2>
            
            {existingPermits.length > 0 ? (
              <div className="space-y-4">
                {existingPermits.map((permit) => (
                  <div 
                    key={permit.id}
                    className={`p-4 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {permit.type}
                        </h3>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          ID: {permit.id} • Submitted: {permit.submitted}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        permit.status === 'Approved' 
                          ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                          : permit.status === 'Under Review'
                            ? darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                            : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                      }`}>
                        {permit.status}
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className={`px-4 py-2 rounded-md ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        View Details
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          darkMode 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Track Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-6 text-center border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  You don't have any active permit applications.
                </p>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`mt-4 px-6 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Apply for a New Permit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
