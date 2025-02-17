import { Outlet } from "react-router-dom"
 import Navbar from "./components/Navbar"
 import Footer from "./components/Footer"
 import './index.css'
 import { ToastContainer } from "react-toastify"
 import "react-toastify/dist/ReactToastify.css"
function App() {
console.log(import.meta.env.VITE_API_BASE_URL)
  return (
  <>
    <Navbar/>
    <ToastContainer/>
     <Outlet />
     <Footer/>
 </>
  )
}

export default App
