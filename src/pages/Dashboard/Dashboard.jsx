import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import styles from "./style.module.css"
import VaccinesIcon from '@mui/icons-material/Vaccines';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Navbar from '../../components/Navbar/Navbar';
// import Allinvoive from '../Invoice/Allinvoice/Allinvoive';
import Allinvoice from '../Invoice/Allinvoice/Allinvoive';
import Addinvoice from '../Invoice/AddInvoice/Addinvoice';
const Dashboard = () => {
  return (
    <div className={styles.main} >
      <div className={styles.sidebar} >
        <div className={styles.top}>
          <div className={styles.Logo} >
            <VaccinesIcon className={styles.icon} /> Pharma-DashBoard
          </div>
        </div>
        <div className={styles.bottom} >
          <ul>
            <li>
              <Link to="allinvoice"> <DashboardIcon className={styles.icon} /> All Invoice</Link>
            </li>
            <li>
              <Link to="addinvoice"> <AddCircleOutlineIcon className={styles.icon} /> Add Invoice</Link>
            </li>
            <li>
              <Link to="updateinvoice"> <PublishedWithChangesIcon className={styles.icon} /> Update Invoice</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Navbar />
        <div className={styles.maincontent} >
          <div>
            <Routes>
              <Route path="/" element={<Allinvoice />} />
              <Route path="allinvoice" element={<Allinvoice />} />
              <Route path="addinvoice" element={<Addinvoice />} />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard