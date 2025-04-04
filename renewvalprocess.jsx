import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const DriverLicenseRenewalForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: 'Krish Sharma',
    email: 'krishsharma1037@gmail.com',
    phone: '09214589991',
    licenseNumber: '1234567891',
    address: '76, Shipra Path',
    city: 'Jaipur',
    state: 'Rajasthan',
    zipCode: '302020',
    termsAgreed: true
  });

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Set font size and style
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Driver's License Renewal Application", 20, 20);
    
    // Personal Information section
    doc.setFontSize(16);
    doc.text("Personal Information", 20, 35);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Full Name: ${formData.fullName}`, 20, 45);
    doc.text(`Email Address: ${formData.email}`, 20, 55);
    doc.text(`Phone Number: ${formData.phone}`, 20, 65);
    doc.text(`License Number: ${formData.licenseNumber}`, 20, 75);
    
    // Address Information section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text("Address Information", 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Address: ${formData.address}`, 20, 100);
    doc.text(`City: ${formData.city}`, 20, 110);
    doc.text(`State: ${formData.state}`, 20, 120);
    doc.text(`Zip Code: ${formData.zipCode}`, 20, 130);
    
    // Terms and Conditions
    doc.text("Terms and Conditions: Agreed", 20, 145);
    
    // Application Details
    doc.setFontSize(10);
    doc.text(`Application Date: ${new Date().toLocaleDateString()}`, 20, 160);
    doc.text("This is an electronic copy of your license renewal application.", 20, 170);
    
    // Save the PDF
    doc.save("driver_license_renewal.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <a href="#" className="text-blue-600 font-medium">← Back</a>
        <h1 className="text-2xl font-bold ml-4">Renew Driver's License</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">Personal Information</h2>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.fullName}
              readOnly
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.email}
              readOnly
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.phone}
              readOnly
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">License Number</label>
            <input 
              type="text" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.licenseNumber}
              readOnly
            />
          </div>
        </div>
        
        {/* License Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">License Information</h2>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">Address</label>
            <input 
              type="text" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.address}
              readOnly
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">City</label>
            <input 
              type="text" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.city}
              readOnly
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">State</label>
            <input 
              type="text" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.state}
              readOnly
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">Zip Code</label>
            <input 
              type="text" 
              className="w-full p-2 bg-blue-50 border border-gray-200 rounded-md"
              value={formData.zipCode}
              readOnly
            />
          </div>
        </div>
        
        {/* Terms checkbox */}
        <div className="mb-6">
          <div className="flex items-start">
            <input 
              type="checkbox" 
              className="mt-1 mr-2"
              checked={formData.termsAgreed}
              readOnly
            />
            <span>
              I confirm that all information provided is accurate and I agree to the terms and conditions.
            </span>
          </div>
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Renewal Application
        </button>
      </form>
    </div>
  );
};

export default DriverLicenseRenewalForm;