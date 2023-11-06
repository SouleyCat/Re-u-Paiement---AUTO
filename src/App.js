import React, { useState } from 'react';
import ReceiptForm from './Components/ReceiptForm';
import Receipt from './Components/Receipt';

function ReceiptApp() {
  const [receiptData, setReceiptData] = useState(null);

  const handleSave = (data) => {
    // Stockez les données dans l'état de l'application
    setReceiptData(data);
  };

  return (
    <div className="App">
      {receiptData ? (
        <Receipt data={receiptData} />
      ) : (
        <ReceiptForm onSave={handleSave} />
      )}
    </div>
  );
}

export default ReceiptApp;
