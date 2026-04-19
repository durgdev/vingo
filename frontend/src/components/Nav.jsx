
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaLocationDot, FaPlus } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io"
import { FiShoppingCart } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const { userData, city } = useSelector(state => state.user)
  const { myShopData } = useSelector(state => state.owner)
  const dispatch = useDispatch()
 const navigate=useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const orders = [1, 2, 3, 4]

  const HandlelogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/Signout`, { withCredentials: true })
      dispatch(setUserData(null))
    } catch (error) {
      console.log(error)
    }
  }

  const role = userData?.role

  return (
    <>
      <div className="w-full h-[70px] flex items-center justify-between px-[15px] md:px-[40px] fixed top-0 z-[9999] bg-white/80 backdrop-blur-md shadow-md">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#ff4d2d] cursor-pointer">
          Vingo
        </h1>

        {/* USER SEARCH */}
        {role === "user" && (
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
        )}

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-[15px]">

          {/* Mobile Search */}
          {role === "user" && (
            <div className="md:hidden cursor-pointer" onClick={() => setShowSearch(true)}>
              <IoIosSearch size={24} className="text-[#ff4d2d]" />
            </div>
          )}

          {/* Cart */}
          {role === "user" && (
            <div className='relative cursor-pointer'>
              <FiShoppingCart size={24} className='text-[#ff4d2d]' />
              <span className='absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-[10px] px-[5px] rounded-full'>
                0
              </span>
            </div>
          )}

          {/* OWNER + USER ACTIONS */}
          {(role === "owner" || role === "user") && (
            <div className="flex items-center gap-2 sm:gap-4">

              <>
                {/* ✅ Add Food Item ONLY if shop exists */}
                {role === "owner" && myShopData && (
                  <button onClick={()=>navigate('/add-item')} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-[#fff1ec] text-[#ff4d2d] text-xs sm:text-sm font-medium hover:bg-[#ffe4dc] active:scale-95 transition">

                    <div  className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex items-center justify-center bg-[#ff4d2d] text-white rounded-full text-[9px] sm:text-[10px]">
                      <FaPlus />
                    </div>

                    <span className="hidden sm:inline">Add Food Item</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                )}

                {/* Orders Button */}
                <button className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-[#fff1ec] text-[#ff4d2d] text-xs sm:text-sm font-medium hover:bg-[#ffe4dc] active:scale-95 transition">

                  <>
                    <span className="hidden sm:inline">
                      {role === "user" ? "My Orders" : "Orders"}
                    </span>
                    <span className="sm:hidden">
                      {role === "user" ? "My" : "Orders"}
                    </span>
                  </>

                  {role === "owner" && (
                    <span className="absolute -top-2 -right-3 bg-[#ff4d2d] text-white text-[10px] px-[6px] py-[1px] rounded-full">
                      {orders?.length || 0}
                    </span>
                  )}

                </button>
              </>

            </div>
          )}

          {/* Avatar */}
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] text-white text-[16px] shadow-lg font-semibold cursor-pointer'
          >
            {userData?.fullName
              ? userData.fullName.slice(0, 1).toUpperCase()
              : "U"}
          </div>

          {/* Dropdown */}
          {showUserMenu && (
            <div className="absolute right-[20px] top-[70px] w-[200px] bg-white rounded-xl shadow-xl p-[15px] z-[99999] flex flex-col gap-[10px]">

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

              <button
                onClick={HandlelogOut}
                className="text-left text-sm text-red-500 hover:bg-red-50 px-[10px] py-[6px] rounded-md transition"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
      {/* 🔍 Mobile Search Popup */}
{showSearch && role === "user" && (
  <div className="fixed inset-0 bg-white z-[99999] p-[20px] flex flex-col gap-[20px]">

    {/* Header */}
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
        className='w-full outline-none text-sm' 
        placeholder="Search food..."
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