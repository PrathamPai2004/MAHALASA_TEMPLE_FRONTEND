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
import BhajanPlayer from './components/BhajanPlayer'
import TempleChatbot from './components/TempleChatbot'




function App() {

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
       <Route path='/admin/dashboard/:username' element={<LoginPage/>}></Route>
       <Route path='/Bhajans' element={<BhajanPlayer/>}></Route>
       <Route path='/chatbot' element={<TempleChatbot />} />
       <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  
  )

  
}
// exports.countForAnimation;

export default App

