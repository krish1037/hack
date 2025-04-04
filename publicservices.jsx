// Public Records Page
import React, { useState } from 'react';
import { ArrowLeft } from 'react-feather'; // Assuming you have react-feather installed

export const PublicRecordsPage = ({ darkMode, onBack, userData }) => {
  const [activeTab, setActiveTab] = useState('search');
  const [recordType, setRecordType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const recordTypes = [
    { id: 'birth', name: 'Birth Certificate', icon: '👶' },
    { id: 'marriage', name: 'Marriage License', icon: '💍' },
    { id: 'death', name: 'Death Certificate', icon: '📜' },
    { id: 'property', name: 'Property Records', icon: '🏠' },
    { id: 'business', name: 'Business License', icon: '🏢' },
    { id: 'court', name: 'Court Records', icon: '⚖️' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!recordType || !searchQuery) return;

    setIsSearching(true);
    setSearchResults([]);

    // Simulate API search
    setTimeout(() => {
      // Mock search results
      if (recordType === 'birth') {
        setSearchResults([
          { id: 'BC1234', type: 'Birth Certificate', name: 'John Smith', date: '04/15/1985', status: 'Available' },
          { id: 'BC5678', type: 'Birth Certificate', name: 'Jane Smith', date: '07/22/1988', status: 'Available' },
        ]);
      } else if (recordType === 'property') {
        setSearchResults([
          { id: 'PR9876', type: 'Property Deed', address: '123 Main St', recorded: '06/10/2020', status: 'Available' },
          { id: 'PR5432', type: 'Property Tax Record', address: '123 Main St', recorded: '01/15/2025', status: 'Available' },
        ]);
      } else {
        setSearchResults([
          { id: 'REC1001', type: recordTypes.find((r) => r.id === recordType)?.name, date: '03/15/2022', status: 'Available' },
        ]);
      }

      setIsSearching(false);
    }, 1000);
  };

  const handleRecordRequest = (record) => {
    setSelectedRecord(record);
  };

  const confirmRequest = () => {
    alert(`Your request for ${selectedRecord.type} has been submitted. You will receive an email with further instructions.`);
    setSelectedRecord(null);
    setSearchResults([]);
    setRecordType('');
    setSearchQuery('');
  };

    const myRequests = userData?.requests || []; // Assuming userData has a requests array

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Service Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4`}>
        <div className="container mx-auto">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-opacity-20 hover:bg-white">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Public Records</h1>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('search')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'search'
                  ? darkMode
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : darkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              Search Records
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'requests'
                  ? darkMode
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : darkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              My Requests
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'search' ? (
          <div className="space-y-8">
            {/* Record Type Selection */}
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Select Record Type
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recordTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setRecordType(type.id)}
                    className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
                      recordType === type.id
                        ? darkMode
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                          : 'border-blue-500 bg-blue-50'
                        : darkMode
                        ? 'border-gray-700 hover:bg-gray-800'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{type.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Form */}
            {recordType && (
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Search {recordTypes.find((r) => r.id === recordType)?.name}
                </h3>

                <form onSubmit={handleSearch}>
                  <div className="space-y-4">
                    {recordType === 'birth' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full p-3 rounded-md border ${
                              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="Enter full name"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date of Birth</label>
                            <input
                              type="date"
                              className={`w-full p-3 rounded-md border ${
                                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Place of Birth</label>
                            <input
                              type="text"
                              className={`w-full p-3 rounded-md border ${
                                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                              }`}
                              placeholder="City or county"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {recordType === 'property' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Property Address</label>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full p-3 rounded-md border ${
                              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="Enter property address"
                            required
                          />
                        </div>
                        <div>
                          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Record Type</label>
                          <select
                            className={`w-full p-3 rounded-md border ${
                              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="">All Property Records</option>
                            <option value="deed">Deed</option>
                            <option value="tax">Tax Record</option>
                            <option value="lien">Liens</option>
                            <option value="plat">Plat Maps</option>
                          </select>
                        </div>
                      </>
                    )}

                    {!['birth', 'property'].includes(recordType) && (
                      <div>
                        <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Search Terms</label>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full p-3 rounded-md border ${
                            darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder={`Enter search terms for ${recordTypes.find((r) => r.id === recordType)?.name}`}
                          required
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className={`w-full px-6 py-3 rounded-md ${
                        darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      disabled={isSearching}
                    >
                      {isSearching ? 'Searching...' : 'Search Records'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Search Results</h3>
                <div className="space-y-4">
                  {searchResults.map((record) => (
                    <div key={record.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{record.type}</h4>
                          {record.name && <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Name: {record.name}</p>}
                          {record.address && <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address: {record.address}</p>}
                          {record.date && <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date: {record.date}</p>}
                          {record.recorded && <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recorded: {record.recorded}</p>}
                        </div>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-blue-500' : 'text-blue-600'}`}>{record.status}</span>
                      </div>
                        <button
                            onClick={() => handleRecordRequest(record)}
                            className={`mt-4 px-4 py-2 rounded-md ${
                            darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`} 
                            disabled={isSearching}
                        > Request Record // ...existing code...
                        disabled={isSearching}
                    
                      Request Record
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    ) : (
      // My Requests Tab Content 
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Record Requests</h3>
        {myRequests.length > 0 ? (
          <div className="space-y-4">
            {myRequests.map((request) => (
              <div key={request.id} className={`p-4 border rounded-md ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{request.type}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Requested on: {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    request.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : request.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            You haven't made any record requests yet.
          </p>
        )}
      </div>
    )}
  </div>

  {/* Record Request Modal */}
  {selectedRecord && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Confirm Record Request
        </h3>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Are you sure you want to request this {selectedRecord.type}?
        </p>
        <div className="flex space-x-4">
          <button
            onClick={confirmRequest}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm Request
          </button>
          <button
            onClick={() => setSelectedRecord(null)}
            className={`flex-1 px-4 py-2 rounded-md border ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>
);
};