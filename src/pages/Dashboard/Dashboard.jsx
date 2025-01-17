import React, { useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import styles from "./style.module.css"
import VaccinesIcon from '@mui/icons-material/Vaccines';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Navbar from '../../components/Navbar/Navbar';
import Allinvoice from '../Invoice/Allinvoice/Allinvoive';
import Addinvoice from '../Invoice/AddInvoice/Addinvoice';
import { useGlobalContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import ViewInvoice from '../Invoice/ViewInvoice/ViewInvoice';
import UpdateInvoice from '../Invoice/UpdateInvoice/UpdateInvoice';
import SingleInvoiceUpdate from '../Invoice/SingleInvoiceUpdate/SingleInvoiceUpdate';
const Dashboard = () => {
  const Navigate = useNavigate();
  const { auth } = useGlobalContext();

  useEffect(() => {
    const Erox = () => {
      toast.error("Login first");
      setTimeout(() => {
        Navigate("/");
      }, 1000);

    }
    if (auth === false) {
      Erox();
    }

  }, [])
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
              <Route path="viewinvoice/:id" element={<ViewInvoice />} />
              <Route path='updateinvoice' element={<UpdateInvoice />} />
              <Route path='invoiceupdate/:id' element={<SingleInvoiceUpdate />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard