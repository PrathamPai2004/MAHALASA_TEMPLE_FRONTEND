import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Routes, useParams} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import Login from './components/Login'
import Entry from './components/Entry'
import ForgotPassword from './components/ForgotPassword'
import UpdateCredentials from './components/UpdateCredentials'
// import Sevas from './components/Sevas'
import SevaTable from './components/SevaTable'
import Checkout from './components/Checkout'
import DormBooking from './components/DormBooking'
import DormView from './components/DormView'
// import DownloadRec from './components/DownloadRec'
import Mahalasa from './components/Mahalasa'
import Invoice from './components/Invoice'
import Contacts from './components/Contacts'
import CustomCursor from "./components/CustomCursor";
import InvoiceRoom from './components/InvoiceRoom'
import SplineLayer from './components/SplineLayer'
import Media from './components/Media'
import LoginPage from './components/admin/LoginPage'
import Dashboard from './components/admin/Dashboard'



function ProtectedDashboard() {
  const { username } = useParams();

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (username !== "abc" && isLoggedIn!=true) {

    return <Navigate to="/" replace />;
  }

  return <Dashboard />;
}

function App() {
  // FOR KEEPING BACKEND ALIVE - SCRIPT STARTS HERE
  useEffect(() => {
    const pingBackend = () => {
      fetch('https://your-backend.onrender.com/ping')
        .then(res => {
          if (res.ok) {
            console.log(`[PING] ✅ Backend alive - ${new Date().toLocaleTimeString()}`);
          } else {
            console.warn(`[PING] ⚠️ Backend responded with status ${res.status}`);
          }
        })
        .catch(err => {
          console.error(`[PING] ❌ Error pinging backend:`, err.message);
        });
    };

    // Initial ping on page load
    pingBackend();

    // Ping every 5 minutes
    const interval = setInterval(pingBackend, 5 * 60 * 1000); // 5 mins

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);
  // FOR KEEPING BACKEND ALIVE - SCRIPT ENDS HERE

  const[countForAnimation,setCountAnimation]=useState(0);
  localStorage.setItem('countForAnimation',countForAnimation);

  return (
    <BrowserRouter>
      <CustomCursor/>
      <Routes>
        <Route path='/' element={<Mahalasa/>}></Route>
        <Route path='/entry' element={<Entry/>}></Route>
        <Route path='/register' element={<Signup/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/login/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/sevas' element={<SevaTable/>}></Route>
        <Route path='/sevas/checkout' element={<Checkout/>}></Route>
        <Route path='/dorm-booking' element={<DormBooking/>}></Route> 
       <Route path='/dorm-booking/dorm-view/:dormName' element={<DormView/>}></Route>
       <Route path='/dorm-booking/dorm-view/:dormName/download-room-invoice' element={<InvoiceRoom/>}></Route>
       <Route path='/sevas/download-receipt' element={<Invoice/>}></Route>
       <Route path='/contacts' element={<Contacts/>}></Route>
       <Route path='/media' element={<Media/>}></Route>
       <Route path='/spline' element={<SplineLayer/>}></Route>
       <Route path='/admin' element={<LoginPage/>}></Route>
       <Route path='/admin/dashboard/:username' element={<ProtectedDashboard/>}></Route>
       <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  
  )

  
}
// exports.countForAnimation;

export default App
