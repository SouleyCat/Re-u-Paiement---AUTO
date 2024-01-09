import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LOGO from 'file:///C:/Users/jules/Downloads/LOGO_CAT.png';
import EditReceiptModal from './Modals/EditReceiptModal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [objetFilter, setObjetFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('');
  const [classeFilter, setClasseFilter] = useState('');


  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const response = await axios.get('http://172.16.4.46:8000/api/receipts');
      setReceipts(response.data.receipts);
    } catch (error) {
      console.error('Error fetching receipts:', error.response ? error.response.data : error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return formattedDate;
  };

  const formatMonth = (month) => {
    const options = { month: 'long' };
    const formattedMonth = new Date(2022, month - 1, 1).toLocaleDateString('fr-FR', options);
    return formattedMonth;
  };
  

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedReceipt(null);
  };

  const handleSaveChanges = (editedData) => {
    updateReceipt(selectedReceipt.id, editedData);
    handleModalClose();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://172.16.4.46:8000/api/delete/${id}`);
      setReceipts((prevReceipts) => prevReceipts.filter((receipt) => receipt.id !== id));
    } catch (error) {
      console.error('Error deleting receipt:', error.response ? error.response.data : error.message);
    }
  };

  const updateReceipt = async (id, editedData) => {
    try {
      await axios.put(`http://172.16.4.46/api/edit/${id}`, editedData);
      fetchReceipts();
    } catch (error) {
      console.error('Error updating receipt:', error.response ? error.response.data : error.message);
    }
  };

  const filteredReceipts = receipts.filter((receipt) => {
    const nameMatch = receipt.nomComplet.toLowerCase().includes(nameFilter.toLowerCase());
    const objetMatch = receipt.paymentReason.toLowerCase().includes(objetFilter.toLowerCase());
    const monthMatch = monthFilter ? new Date(receipt.date).getMonth() + 1 === parseInt(monthFilter) : true;
    const paymentTypeMatch = paymentTypeFilter ? receipt.paymentType.toLowerCase() === paymentTypeFilter.toLowerCase() : true;
    const classMatch = classeFilter ? receipt.classe.toLowerCase() === classeFilter.toLowerCase() : true;

    return nameMatch && monthMatch && paymentTypeMatch && classMatch && objetMatch;
  });

  // Extract unique values for "Mois" and "Type de Paiement" filters
  const uniqueMonths = Array.from(new Set(receipts.map((receipt) => new Date(receipt.date).getMonth() + 1)));
  const uniquePaymentTypes = Array.from(new Set(receipts.map((receipt) => receipt.paymentType.toLowerCase())));
  const uniqueClasses = Array.from(new Set(receipts.map((receipt) => receipt.classe.toLowerCase())));

  return (
    <>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <img src={LOGO} alt="Logo" style={{ height: '100px' }} />
        <h1 className="mb-4">Historique de Reçus</h1>
      </header>

      <div className="container mt-4 bg-white">
        <div className="text-end mb-3">
          <Link to="/receiptform" className="btn btn-primary">
            Nouveau
          </Link>
        </div>

        <div className="mb-4">
          {/* Filter inputs */}
          <div className="row">
            <div className="col-md-2">
              <label className="form-label">Rechercher Par Nom</label>
              <input
                type="text"
                className="form-control"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Classe</label>
              <select
                className="form-select"
                value={classeFilter}
                onChange={(e) => setClasseFilter(e.target.value)}
              >
                <option value="">Tous</option>
                {uniqueClasses.map((classe) => (
                  <option key={classe} value={classe}>
                    {classe}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Mois</label>
              <select
                className="form-select"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="">Tous</option>
                {uniqueMonths.map((month) => (
                  <option key={month} value={month}>
                    {formatMonth(month)}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Rechercher Par Objet</label>
              <input
                type="text"
                className="form-control"
                value={objetFilter}
                onChange={(e) => setObjetFilter(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Type de Paiement</label>
              <select
                className="form-select"
                value={paymentTypeFilter}
                onChange={(e) => setPaymentTypeFilter(e.target.value)}
              >
                <option value="">Tous</option>
                {uniquePaymentTypes.map((paymentType) => (
                  <option key={paymentType} value={paymentType}>
                    {paymentType}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="table table-bordered small-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">NUMERO DOSSIER</th>
              <th scope="col">Nom Complet</th>
              <th scope="col">Classe</th>
              <th scope="col">Date</th>
              <th scope="col">Somme</th>
              <th scope="col">Objet</th>
              <th scope="col">Type de Paiement</th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.map((receipt) => (
              <tr key={receipt.id}>
                <th scope="row">{receipt.dossierNumber}</th>
                <td>{receipt.nomComplet}</td>
                <td>{receipt.classe}</td>
                <td>{formatDate(receipt.date)}</td>
                <td className="individual-amount-cell">
                  {parseInt(receipt.amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} FCFA
                </td>
                <td>{receipt.paymentReason}</td>
                <td>{receipt.paymentType}</td>
                <td>
                  <Link to={`/receipt/${receipt.id}`}>
                    <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: '22px' }}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>

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
            <tr>
              <td colSpan="4">Total:</td>
              <td className="total-amount-cell">
                <strong>
                {(
                  filteredReceipts.reduce((total, receipt) => total + (parseInt(receipt.amount) || 0), 0)
                ).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} FCFA
                </strong>
              </td>
              <td colSpan="3"></td>
            </tr>
          </tbody>
        </table>

        {selectedReceipt && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Receipt</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleModalClose}
                  >
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
      <br/>
      <br/>

    </>  
    );
};

export default Receipts;
