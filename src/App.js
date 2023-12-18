import React, { useState } from 'react';
import ReceiptForm from './Components/ReceiptForm';
import Receipt from './Components/Receipt';
import Login from './Components/Auth/Login';

function ReceiptApp() {
  const [receiptData, setReceiptData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    // For now, let's assume the login is successful
    setLoggedIn(true);
  };

  const handleSave = (data) => {
    // Store the data in the application state
    setReceiptData(data);
  };

  return (
    <div className="App">
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && receiptData ? (
        <Receipt data={receiptData} />
      ) : isLoggedIn ? (
        <ReceiptForm onSave={handleSave} />
      ) : null}
    </div>
  );
}

export default ReceiptApp;
