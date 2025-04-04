export const PropertyTaxPage = ({ darkMode, onBack, userData }) => {
    const [propertyAddress, setPropertyAddress] = useState('');
    const [taxId, setTaxId] = useState('');
    const [amountDue, setAmountDue] = useState('');
    const [loading, setLoading] = useState(false);
    const [propertyFound, setPropertyFound] = useState(false);
    
    // Pre-fill form if userData exists
    useEffect(() => {
      if (userData?.property) {
        setPropertyAddress(userData.property.address || '');
        setTaxId(userData.property.taxId || '');
        if (userData.property.taxId) {
          // Simulate fetching property data
          setTimeout(() => {
            setAmountDue('1,250.75');
            setPropertyFound(true);
          }, 500);
        }
      }
    }, [userData]);
  
    const handleLookup = (e) => {
      e.preventDefault();
      setLoading(true);
      
      // Simulate API call to look up property tax details
      setTimeout(() => {
        setAmountDue('1,250.75');
        setPropertyFound(true);
        setLoading(false);
      }, 1000);
    };
  
    const handlePayment = () => {
      alert('Payment successful! A receipt has been emailed to you.');
      onBack();
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
              <h1 className="text-2xl font-bold">Property Tax Payment</h1>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Property Information
            </h2>
            
            {!propertyFound ? (
              <form onSubmit={handleLookup}>
                <div className="space-y-4">
                  <div>
                    <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Property Tax ID
                    </label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className={`w-full p-3 rounded-md border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your property tax ID"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Property Address
                    </label>
                    <input
                      type="text"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className={`w-full p-3 rounded-md border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your property address"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full mt-4 px-6 py-3 rounded-md ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Looking up...' : 'Look Up Property'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Property Details</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Address:</span>
                      <span>{propertyAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tax ID:</span>
                      <span>{taxId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Assessment Year:</span>
                      <span>2025</span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-500 bg-opacity-10' : 'bg-blue-50'} border ${darkMode ? 'border-blue-600' : 'border-blue-300'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Amount Due:</span>
                    <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>${amountDue}</span>
                  </div>
                  <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Due Date: June 30, 2025
                  </div>
                </div>
                
                <div>
                  <h3 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Payment Method</h3>
                  <div className="space-y-3">
                    <div className={`p-3 border rounded-md ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      <div className="flex items-center">
                        <input type="radio" id="creditCard" name="paymentMethod" defaultChecked />
                        <label htmlFor="creditCard" className="ml-2">Credit Card</label>
                      </div>
                    </div>
                    <div className={`p-3 border rounded-md ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      <div className="flex items-center">
                        <input type="radio" id="bankTransfer" name="paymentMethod" />
                        <label htmlFor="bankTransfer" className="ml-2">Bank Transfer</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePayment}
                  className={`w-full px-6 py-3 rounded-md ${
                    darkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  