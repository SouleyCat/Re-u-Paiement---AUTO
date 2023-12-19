import React, { useState } from 'react';

const ReceiptForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    amount: '',
    paymentType: 'Espèce',
    dossierNumber: '',
    phoneNumber: '',
    paymentReason: '',
    classe: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      // Send a POST request to your backend
      const response = await fetch('http://localhost:3001/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Receipt saved successfully');
        // Optionally, you can handle the response or update the UI as needed
        onSave(formData); // Notify the parent component about the saved data
      } else {
        console.error('Error saving receipt:', response.status);
        // Handle error and update the UI accordingly
      }
    } catch (error) {
      console.error('Error saving receipt:', error);
      // Handle error and update the UI accordingly
    }
  };

  return (
    <>
      <div
        className="container mt-3"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: 'auto',
          marginTop: '10vh',
          paddingBottom: '20vh',
          boxSizing: 'border-box',
        }}
      >
        <h1 className="text-center">Entrer les données de l'étudiant pour générer le reçu</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <div style={{ flex: 1, marginRight: '5px' }}>
            <img
              src="https://cat.sn/storage/0XFJUqtbNQwEZwYXiSSMt6KJLWRTPUHMqA81frjc.png"
              alt="Cat illustration representing a receipt or payment"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ flex: 1, paddingLeft: '20px' }}>
          <form>
              <div className="form-group">
                <label htmlFor="date" style={{ fontWeight: 'bold' }}>Date du jour :</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name" style={{ fontWeight: 'bold' }}>Nom :</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                  <label htmlFor="amount" style={{ fontWeight: 'bold' }}>Somme reçue :</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="paymentType" style={{ fontWeight: 'bold' }}>Type de paiement :</label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="Espèce">Espèce</option>
                    <option value="Chèque">Chèque</option>
                    <option value="Virement">Virement</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="dossierNumber" style={{ fontWeight: 'bold' }}>Numéro de dossier :</label>
                <input
                  type="text"
                  name="dossierNumber"
                  value={formData.dossierNumber}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="classe" style={{ fontWeight: 'bold' }}>Classe :</label>
                <select
                  name="classe"
                  value={formData.classe}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Sélectionnez la classe</option>
                  <option value="LICENCE 1">LICENCE 1</option>
                  <option value="LICENCE 2">LICENCE 2</option>
                  <option value="LICENCE 3">LICENCE 3</option>
                  <option value="MASTER 1">MASTER 1</option>
                  <option value="MASTER 2">MASTER 2</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" style={{ fontWeight: 'bold' }}>Numéro de téléphone :</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentReason" style={{ fontWeight: 'bold' }}>Objet:</label>
                <input
                  type="text"
                  name="paymentReason"
                  value={formData.paymentReason}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <br />
              <div className="form-group">
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="btn btn-primary"
                >
                  GÉNÉRER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptForm;
