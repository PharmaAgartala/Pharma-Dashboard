import React, { useState } from 'react';
import styles from "./style.module.css"
import { toast } from 'react-toastify';
const Addinvoice = () => {
  const [formData, setFormData] = useState({
    distributorName: '',
    invoiceNumber: '',
    amount: '',
    date: '',
    paymentType: '',
    comment: '',
    deliveredBy: '',
    billType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatDate = (date) => {
      const formattedDate = new Date(date).toISOString();
      return formattedDate;
    };
    const Uploaddata = {
      distributor_name: formData.distributorName,
      invoice_number: formData.invoiceNumber,
      amount: formData.amount,
      date: formatDate(formData.date),
      payment_type: formData.paymentType,
      comment: formData.comment,
      delivered_by: formData.deliveredBy,
      bill_type: formData.billType
    };
    fetch(`${process.env.REACT_APP_BACKEND_Link}/invoice/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Uploaddata)
    }).then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        toast("data added")
        // Reset form data after successful submission
        setFormData({
          distributorName: '',
          invoiceNumber: '',
          amount: '',
          date: '',
          paymentType: '',
          comment: '',
          deliveredBy: '',
          billType: '',
        });
        alert('Invoice added successfully!');
      })
      .catch(error => {
        console.error('Error adding invoice:', error);
        alert('Error adding invoice. Please try again.');
      });
  };

  return (
    <div className={styles.main} >
      <h2>Add Invoice</h2>
      <form className={styles.Addform} onSubmit={handleSubmit}>
        <label>
          Distributor Name:
          <input
            type="text"
            name="distributorName"
            value={formData.distributorName}
            onChange={handleChange}
          />
        </label>
        <label>
          Invoice Number:
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Payment Type:
          <input
            type="text"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
          />
        </label>
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </label>
        <label>
          Delivered By:
          <input
            type="text"
            name="deliveredBy"
            value={formData.deliveredBy}
            onChange={handleChange}
          />
        </label>
        <label>
          Bill Type:
          <input
            type="text"
            name="billType"
            value={formData.billType}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Addinvoice;
