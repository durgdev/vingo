

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { FaLocationDot } from "react-icons/fa6"
// import { IoIosSearch } from "react-icons/io";
// import { FiShoppingCart } from "react-icons/fi";

// const Nav = () => {
//   const { userdata } = useSelector(state => state.user)

//   return (
//     <div className="w-full h-[80px] flex items-center justify-between px-[20px] md:px-[40px] fixed top-0 z-[9999] bg-white/80 backdrop-blur-md shadow-md">


//       <h1 className="text-3xl font-extrabold text-[#ff4d2d] tracking-wide cursor-pointer hover:scale-105 transition">
//         Vingo
//       </h1>


//       <div className="hidden md:flex md:w-[55%] lg:w-[40%] h-[60px] bg-white border border-gray-200 shadow-lg rounded-xl items-center gap-[15px] px-[15px] hover:shadow-xl transition">

//         <div className='flex items-center w-[35%] gap-[8px] border-r border-gray-300 pr-[10px]'>
//           <FaLocationDot size={20} className="text-[#ff4d2d]" />
//           <div className='truncate text-gray-600 text-sm font-medium'>
//             Ghaziabad
//           </div>
//         </div>

//         <div className='flex items-center w-[65%] gap-[10px]'>
//           <IoIosSearch size={22} className='text-[#ff4d2d]' />
//           <input
//             type="text"
//             placeholder='Search for food...'
//             className='w-full text-gray-700 text-sm outline-none bg-transparent'
//           />
//         </div>
//       </div>


//       <div className="flex items-center gap-[20px]">


//         <div className='relative cursor-pointer group'>
//           <FiShoppingCart size={26} className='text-[#ff4d2d] group-hover:scale-110 transition' />
//           <span className='absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-[10px] px-[5px] py-[1px] rounded-full'>
//             0
//           </span>
//         </div>


//         <button className='hidden md:block px-4 py-1.5 rounded-full bg-[#ff4d2d] text-white text-sm font-medium hover:bg-[#e8431f] transition shadow-md'>
//           My Order
//         </button>


//         <div className='w-[42px] h-[42px] rounded-full flex items-center justify-center bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] text-white text-[16px] shadow-lg font-semibold cursor-pointer hover:scale-110 transition'>
//           {userdata?.fullName
//             ? userdata.fullName.slice(0, 1).toUpperCase()
//             : "U"}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Nav


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaLocationDot } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

const Nav = () => {
  const { userData,city } = useSelector(state => state.user)
  const dispatch=useDispatch()
  console.log("userData:", userData)
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const HandlelogOut = async () =>{
       try {
         const result= await axios.get(`${serverUrl}/api/auth/Signout`,{withCredentials:true})
         dispatch(setUserData(null))
       } catch (error) {
        console.log(error);
        
       }
  }

  return (
    <>
      <div className="w-full h-[70px] flex items-center justify-between px-[15px] md:px-[40px] fixed top-0 z-[9999] bg-white/80 backdrop-blur-md shadow-md">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#ff4d2d] cursor-pointer">
          Vingo
        </h1>

        {/* Desktop Search */}
        <div className="hidden md:flex md:w-[55%] lg:w-[40%] h-[55px] bg-white border shadow rounded-xl items-center gap-[10px] px-[12px]">

          <div className='flex items-center w-[35%] gap-[6px] border-r pr-[8px]'>
            <FaLocationDot size={18} className="text-[#ff4d2d]" />
            <div className='truncate text-gray-600 text-sm'>
              {city}
            </div>
          </div>

          <div className='flex items-center w-[65%] gap-[8px]'>
            <IoIosSearch size={20} className='text-[#ff4d2d]' />
            <input
              type="text"
              placeholder='Search food...'
              className='w-full text-sm outline-none'
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-[15px]">

          {/* Mobile Search Icon */}
          <div className="md:hidden cursor-pointer" onClick={() => setShowSearch(true)}>
            <IoIosSearch size={24} className="text-[#ff4d2d]" />
          </div>

          {/* Cart */}
          <div className='relative cursor-pointer'>
            <FiShoppingCart size={24} className='text-[#ff4d2d]' />
            <span className='absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-[10px] px-[5px] rounded-full'>
              0
            </span>
          </div>

          {/* Button */}
          <button className='hidden md:block px-4 py-1 rounded-full bg-[#ff4d2d] text-white text-sm font-medium'>
            My Order
          </button>

          {/* Avatar */}
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] text-white text-[16px] shadow-lg font-semibold cursor-pointer'
          >
            {userData?.fullName
              ? userData.fullName.slice(0, 1).toUpperCase()
              : "U"}
          </div>
          {showUserMenu && (
            <div className="absolute right-[20px] top-[70px] w-[200px] bg-white rounded-xl shadow-xl p-[15px] z-[99999] flex flex-col gap-[10px]">

              {/* User Info */}
              <div className="flex items-center gap-[10px] border-b pb-[10px]">
                <div className="w-[35px] h-[35px] rounded-full bg-[#ff4d2d] flex items-center justify-center text-white font-semibold">
                  {userData?.fullName
                    ? userData.fullName.slice(0, 1).toUpperCase()
                    : "U"}
                </div>
                <div className="text-sm font-medium text-gray-700 truncate">
                  {userData?.fullName || "User"}
                </div>
              </div>

              {/* Logout */}
              <button onClick={HandlelogOut} className="text-left text-sm text-red-500  hover:bg-red-50 px-[10px] py-[6px] rounded-md transition">
                Logout
              </button>

            </div>
          )}

        </div>
      </div>

      {/* 🔍 Mobile Search Popup */}
      {showSearch && (
        <div className="fixed inset-0 bg-white z-[99999] p-[20px] flex flex-col gap-[20px] animate-fadeIn">

          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Search</h2>
            <RxCross2
              size={24}
              className="cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-[10px] border rounded-lg px-[10px] py-[10px] shadow">
            <IoIosSearch size={22} className='text-[#ff4d2d]' />
            <input
              type="text"
              placeholder='Search food, restaurants...'
              className='w-full outline-none text-sm'
              autoFocus
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-[8px] text-gray-600">
            <FaLocationDot className="text-[#ff4d2d]" />
            {city}
          </div>

        </div>
      )}
    </>
  )
}

export default Nav