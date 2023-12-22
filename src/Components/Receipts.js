import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditReceiptModal from './Modals/EditReceiptModal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch receipts when the component mounts
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      // Fetch all receipts from the backend
      const response = await axios.get('http://localhost:8000/api/receipts');
      setReceipts(response.data.receipts);
    } catch (error) {
      console.error('Error fetching receipts:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (id) => {
    const selectedReceipt = receipts.find((receipt) => receipt.id === id);
    setSelectedReceipt(selectedReceipt);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedReceipt(null);
  };

  const handleSaveChanges = (editedData) => {
    // Send an update request to the server with the edited data
    // Then update the local state or refetch the data
    // For simplicity, let's assume you have an updateReceipt function
    // that sends a PUT request to the server
    updateReceipt(selectedReceipt.id, editedData);

    // Close the modal
    handleModalClose();
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to delete the receipt
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      // Update the local state after successful deletion
      setReceipts((prevReceipts) => prevReceipts.filter((receipt) => receipt.id !== id));
    } catch (error) {
      console.error('Error deleting receipt:', error.response ? error.response.data : error.message);
    }
  };

  const updateReceipt = async (id, editedData) => {
    try {
      // Send a PUT request to update the receipt
      await axios.put(`http://localhost:8000/api/edit/${id}`, editedData);
      // Update the local state or refetch the data
      fetchReceipts();
    } catch (error) {
      console.error('Error updating receipt:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
    <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <img src="https://cat.sn/storage/0XFJUqtbNQwEZwYXiSSMt6KJLWRTPUHMqA81frjc.png" alt="Logo" style={{ height: '100px' }} />
        <h1 className="mb-4">Historique de Reçus</h1>
      </header>
    <div
      className="container mt-4 bg-white" >    
        <div className="text-end">
      <Link to="/receiptform" className="btn btn-primary">
        Enregistrer
      </Link>
    </div>
    <div>
    <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NUMERO DOSSIER</th>
            <th scope="col">Nom Complet</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Type de Paiement</th>
            <th scope="col" className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.id}>
              <th scope="row">{receipt.dossierNumber}</th>
              <td>{receipt.nomComplet}</td>
              <td>{receipt.date}</td>
              <td>{receipt.amount}</td>
              <td>{receipt.paymentType}</td>
              <td>
                {/* <button
                    type="button"
                    className="btn btn-warning btn-sm btn-left"
                    style={{ marginRight: '14px' }}
                    onClick={() => handleEdit(receipt.id)}>
                    Modifier
                </button> */}
                <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ marginLeft: '22px' }}

                // onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon  icon={faEye}/>
              </button>
              <button
                    type="button"
                    className="btn btn-danger btn-sm btn-end" 
                    style={{ marginLeft: '14px' }}
                    onClick={() => handleDelete(receipt.id)}
                >
                    Supprimer
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {selectedReceipt && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Receipt</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditReceiptModal
                  receiptData={selectedReceipt}
                  onSave={handleSaveChanges}
                  onClose={handleModalClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Receipts;
