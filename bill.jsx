// Utility Bill Payment Page
export const UtilityBillPage = ({ darkMode, onBack, userData }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [selectedUtility, setSelectedUtility] = useState('');
    const [billHistory, setBillHistory] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const utilities = [
      { id: 'water', name: 'Water', icon: '💧', amount: '78.25' },
      { id: 'electric', name: 'Electricity', icon: '⚡', amount: '124.50' },
      { id: 'gas', name: 'Natural Gas', icon: '🔥', amount: '65.75' },
      { id: 'internet', name: 'Internet', icon: '🌐', amount: '89.99' }
    ];
    
    // Pre-fill form if userData exists
    useEffect(() => {
      if (userData?.utilities) {
        setAccountNumber(userData.utilities.accountNumber || '');
        if (userData.utilities.accountNumber) {
          loadBillHistory();
        }
      }
    }, [userData]);
  
    const loadBillHistory = () => {
      setLoading(true);
      
      // Simulate API call to fetch bill history
      setTimeout(() => {
        setBillHistory([
          { id: 1, type: 'Water', date: '03/15/2025', amount: '78.25', status: 'Due' },
          { id: 2, type: 'Electricity', date: '03/10/2025', amount: '124.50', status: 'Due' },
          { id: 3, type: 'Water', date: '02/15/2025', amount: '72.50', status: 'Paid' },
          { id: 4, type: 'Electricity', date: '02/10/2025', amount: '118.75', status: 'Paid' }
        ]);
        setLoading(false);
      }, 800);
    };
  
    const handleAccountLookup = (e) => {
      e.preventDefault();
      loadBillHistory();
    };
  
    const handlePayment = (utilityId) => {
      alert(`Payment for ${utilities.find(u => u.id === utilityId).name} bill successful!`);
      setSelectedUtility('');
      
      // Update bill status in history
      setBillHistory(billHistory.map(bill => 
        bill.type.toLowerCase() === utilityId && bill.status === 'Due' 
          ? {...bill, status: 'Processing'} 
          : bill
      ));
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
              <h1 className="text-2xl font-bold">Utility Bill Payment</h1>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Account Lookup */}
          {billHistory.length === 0 && (
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-6`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Find Your Account
              </h2>
              
              <form onSubmit={handleAccountLookup}>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Utility Account Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className={`w-full p-3 rounded-md border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your utility account number"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className={`mt-4 w-full px-6 py-3 rounded-md ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Looking up...' : 'Look Up Account'}
                </button>
              </form>
            </div>
          )}
  
          {/* Bill Payment Section */}
          {billHistory.length > 0 && (
            <div className="space-y-6">
              {/* Current Bills */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Current Bills
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {utilities.map((utility) => (
                    <div 
                      key={utility.id}
                      className={`p-4 border rounded-lg ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                      } ${selectedUtility === utility.id ? 
                        darkMode ? 'bg-blue-900 bg-opacity-20 border-blue-700' : 'bg-blue-50 border-blue-300' 
                        : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{utility.icon}</span>
                          <div>
                            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {utility.name}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Due April 15, 2025
                            </p>
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          ${utility.amount}
                        </div>
                      </div>
                      
                      {selectedUtility === utility.id ? (
                        <div className="mt-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedUtility('')}
                              className={`flex-1 px-4 py-2 rounded-md ${
                                darkMode 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handlePayment(utility.id)}
                              className={`flex-1 px-4 py-2 rounded-md ${
                                darkMode 
                                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedUtility(utility.id)}
                          className={`mt-4 w-full px-4 py-2 rounded-md ${
                            darkMode 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          Pay Bill
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bill History */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Payment History
                </h2>
                
                <div className="overflow-x-auto">
                  <table className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <thead>
                      <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                        <th className="py-3 text-left">Utility</th>
                        <th className="py-3 text-left">Date</th>
                        <th className="py-3 text-right">Amount</th>
                        <th className="py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billHistory.map((bill) => (
                        <tr 
                          key={bill.id}
                          className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}
                        >
                          <td className="py-3">{bill.type}</td>
                          <td className="py-3">{bill.date}</td>
                          <td className="py-3 text-right">${bill.amount}</td>
                          <td className="py-3 text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              bill.status === 'Paid' 
                                ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                                : bill.status === 'Processing'
                                  ? darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                                  : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                            }`}>
                              {bill.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  