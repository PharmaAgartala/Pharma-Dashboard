import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
// import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const SingleInvoiceUpdate = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    distributorName: '',
    invoiceNumber: '',
    amount: '',
    date: '',
    paymentType: '',
    comment: '',
    deliveredBy: '',
    billType: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log(formData.date)
  }
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const format = (date) => {
      const formattedDate = new Date(date).toISOString().split('T')[0]
      return formattedDate
    }
    const fetchData = async () => {
      try {
        // setIsLoading(true)
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_Link}/invoice/${id}`,
          { signal }
        )
        const result = await response.json()

        setFormData((prevData) => ({
          ...prevData,
          distributorName: result[0].distributor_name,
          invoiceNumber: result[0].invoice_number,
          amount: result[0].amount,
          date: format(result[0].date),
          paymentType: result[0].payment_type,
          comment: result[0].comment,

          billType: result[0].bill_type,
          deliveredBy: result[0].delivered_by,
        }))
        console.log('jaks')
        console.log(result[0].date)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.error('Error fetching data:', error)
        }
        // setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formatDate = (date) => {
      const formattedDate = new Date(date).toISOString()
      return formattedDate
    }
    const Uploaddata = {
      distributor_name: formData.distributorName,
      invoice_number: formData.invoiceNumber,
      amount: formData.amount,
      date: formatDate(formData.date),
      payment_type: formData.paymentType,
      comment: formData.comment,
      delivered_by: formData.deliveredBy,
      bill_type: formData.billType,
    }
    fetch(
      `${process.env.REACT_APP_BACKEND_Link}/invoice/update/${formData.invoiceNumber}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Uploaddata),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data)

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
        })
        // alert('Invoice added successfully!');
        toast.success(`Data Updated `, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(()=>{

            Navigate(`/dashboard/viewinvoice/${id}`)
        },1200)
      })
      .catch((error) => {
        console.error('Error adding invoice:', error)
        alert('Error adding invoice. Please try again.')
      })
  }

  return (
    <div className={styles.main}>
      <h2>Update Invoice No:{id}</h2>
      <ToastContainer />
      <br />
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
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SingleInvoiceUpdate
