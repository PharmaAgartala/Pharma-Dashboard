import React, { useState, useEffect } from 'react';
import styles from "./style.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ViewInvoice = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_Link}/invoice/${id}`);
        const result = await response.json();
        setData(result[0]); // Access the first item in the array
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.main}>
      <ArrowBackIcon onClick={() => navigate(-1)} className={styles.backicon} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.invoicebox}>
          <table className={styles.verticalTable}>
            <tbody>
              <tr>
                <th>Distributor Name:</th>
                <td>{data.distributor_name}</td>
              </tr>
              <tr>
                <th>Invoice Number:</th>
                <td>{data.invoice_number}</td>
              </tr>
              <tr>
                <th>Amount:</th>
                <td>{data.amount}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{new Date(data.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Payment Type:</th>
                <td>{data.payment_type}</td>
              </tr>
              <tr>
                <th>Comment:</th>
                <td>{data.comment}</td>
              </tr>
              <tr>
                <th>Delivered By:</th>
                <td>{data.delivered_by}</td>
              </tr>
              <tr>
                <th>Bill Type:</th>
                <td>{data.bill_type}</td>
              </tr>
            </tbody>
          </table>
        </div>



      )}
      <br />
      <button className={styles.button} >
        Update Record
      </button>

    </div>
  );
}

export default ViewInvoice;
