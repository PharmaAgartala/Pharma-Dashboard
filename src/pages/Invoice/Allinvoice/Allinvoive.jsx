import React from 'react'
import { useState, useEffect } from 'react';
import styles from "./style.module.css"
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
const Allinvoice = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState(null); // Track the selected record
  const [showOptions, setShowOptions] = useState(false);
  const [windowPosition, setWindowPosition] = useState({});
  const handleCloseSidebar = () => {
    setShowOptions(false); // Close sidebar when cross is clicked
  };
  const handleRecordClick = (record, event) => {
    setSelectedRecord(record); // Update selected record when clicked
    setShowOptions(true); // Show the side window
    setWindowPosition({ top: event.clientY, left: event.clientX }); // Set position based on click coordinates
  };
  useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_Link}/invoice`, { signal });
        const result = await response.json();
        console.log(result)
        const totatalenght = result.length;
        setCount(totatalenght)
        setData(result);
        setIsLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching data:', error);
        }
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);



  return (
    <div className={styles.main} >
      <div className={styles.top} >
        <h2>Total Invoice</h2>
        <div className={styles.Count}>
          <h2>
            {count}
          </h2>
          <p>Total</p>
        </div>
      </div>
      <br />


      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data && <table>
          <thead>
            <tr>
              <th>Distributor Name</th>
              <th>Invoice Number</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Type</th>
              <th>Comment</th>
              <th>Delivered By</th>
              <th>Bill Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (

              <tr key={index} onClick={(event) => handleRecordClick(item, event)}>
                <td>{item.distributor_name}</td>
                <td>{item.invoice_number}</td>
                <td>{item.amount}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.payment_type}</td>
                <td>{item.comment}</td>
                <td>{item.delivered_by}</td>
                <td>{item.bill_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedRecord && showOptions && (
        <div className={styles.sideWindow} style={windowPosition}>
          <div className={styles.closeButton} >
            <p>{selectedRecord.distributor_name}</p>
            <ClearIcon className={styles.cross} onClick={handleCloseSidebar} />
          </div>
          <Link>
            View Record
          </Link>
          <Link>
            Update Record
          </Link>
          {/* Add your options here */}
        </div>
      )}
    </div>
  )
}

export default Allinvoice