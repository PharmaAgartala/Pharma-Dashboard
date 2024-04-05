import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import styles from "./style.module.css";

const Allinvoice = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [windowPosition, setWindowPosition] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleCloseSidebar = () => {
    setShowOptions(false);
  };

  const handleRecordClick = (record, event) => {
    setSelectedRecord(record);
    setShowOptions(true);
    setWindowPosition({ top: event.clientY, left: event.clientX });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_Link}/invoice`, { signal });
        const result = await response.json();
        const totalLength = result.length;
        setCount(totalLength);
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

  useEffect(() => {
    const filtered = data?.filter(item =>
      item.distributor_name.toLowerCase().includes(selectedValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [selectedValue, data]);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h2>Total Invoice</h2>
        <div className={styles.Count}>
          <h2>{count}</h2>
          <p>Total</p>
        </div>
      </div>
      <br />
      <div className={styles.inputBox}>
        <input
          className={styles.searchinput}
          placeholder="Distributor"
          list="browsers"
          name="browser"
          id="browser"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
        <datalist className={styles.inputlist} id="browsers">
          {data?.map((item, index) => (
            <option key={index} value={item.distributor_name} />
          ))}
        </datalist>
      </div>
      <br />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
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
            {filteredData?.map((item, index) => (
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
          <div className={styles.closeButton}>
            <p>{selectedRecord.distributor_name}</p>
            <ClearIcon className={styles.cross} onClick={handleCloseSidebar} />
          </div>
          <Link to="#">View Record</Link>
          <Link to="#">Update Record</Link>
        </div>
      )}
    </div>
  );
};

export default Allinvoice;
