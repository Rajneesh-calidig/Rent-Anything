import Logo from "../../assets/img/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faBars,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { clearSessionData, getSessionData } from "../../services/session.service"
import { routes } from "../../routes/routes"
import { useAuth } from "../../providers/Auth/AuthProvider"
import {toast} from 'react-toastify'

export const Header=()=>{
  const [isOpen, setIsOpen] = useState(false);
  const {user,logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try{
      const response = await logout();
      
      toast.success("Logged out successfully!")
    }catch(err){
      console.error(err);
    }
    clearSessionData();
    navigate(routes.landing);
  }

    return (
        <>
       <div className="w-full ">
<div className="flex justify-around ">
<button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black focus:outline-none"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-8 h-8" />
        </button>
        <div
        className={`lg:hidden transition-all duration-300 absolute top-8  w-full  ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mt-4 space-y-2 bg-gray-700 p-4 rounded-lg">
          <li>
            <Link to="/home" className="block text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="block text-white hover:text-gray-300">About</Link>
          </li>
          <li>
            <a href="#" className="block text-white hover:text-gray-300">Services</a>
          </li>
          <li>
            <a href="#" className="block text-white hover:text-gray-300">Contact</a>
          </li>
        </ul>
      </div>
   <div className="flex w-1/2">
   <div className="relative w-1/2 my-auto mx-auto max-md:w-full">
  <input 
    type="text" 
    placeholder="What are you looking for?" 
    className="border h-12 pl-6 pr-4 my-auto bg-gray-100 rounded-3xl w-full border-none focus:outline-pink-100 focus:bg-white placeholder:text-gray-400 max-xl:w-full max-xl:p-1 max-lg:w-full max-md:float-right max-md:placeholder-hidden "
  />
  <FontAwesomeIcon 
    icon={faMagnifyingGlass} 
    className="absolute right-5  top-1/2 transform -translate-y-1/2 text-gray-300 text-xl font-bold max-xl:right-1"
  />
</div>
   <ul className="flex [&>*]:flex text-md align-center max-lg:hidden">
    <li className="items-center p-6"><Link to="/home" className="hover:text-blue-600">Home</Link></li>
    <li className="items-center p-6"><Link to="/about" className="hover:text-blue-600">About</Link></li>
    <li className="items-center p-6"><a href="#" className="hover:text-blue-600">Blog</a></li>
    <li className="items-center p-6"><a href="#" className="hover:text-blue-600">Support</a></li>
   </ul>
   </div>
   <div class="flex items-center max-md:hidden">
    {user?.email ? (
      <div>
      <button className="p-3 bg-blue-600 w-40 text-white text-lg font-semibold rounded ml-4 hover:bg-blue-700 cursor-pointer" onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
    ):(
      <div className="">

    <Link to="/signin">
   <button className="text-lg font-normal mr-4 cursor-pointer hover:text-gray-400">Sign In</button>
    </Link>
    <Link to="/signup">
    <button className="p-3 bg-blue-600 w-40 text-white text-lg font-semibold rounded ml-4 hover:bg-blue-700 cursor-pointer">Sign Up</button>
    </Link>
      </div>
    )}
   </div>
</div>

       </div>
    
        </>
    )
}