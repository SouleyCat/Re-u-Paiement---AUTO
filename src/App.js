// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReceiptForm from './Components/ReceiptForm';
import Receipt from './Components/Receipt';
import Login from './Components/Auth/Login';
import Receipts from './Components/Receipts';

function App() {
  const [receiptData, setReceiptData] = useState(null);

  const handleSave = (data) => {
    // Store the data in the application state
    setReceiptData(data);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route
            path="/receiptform"
            element={
              receiptData ? (
                <Receipt data={receiptData} />
              ) : (
                <ReceiptForm onSave={handleSave} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
