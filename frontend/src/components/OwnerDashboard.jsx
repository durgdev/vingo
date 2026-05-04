// import React from 'react'
// import { useSelector } from 'react-redux'
// import { FaUtensils } from "react-icons/fa"
// import { useNavigate } from 'react-router-dom'
// import { FaPen } from "react-icons/fa";
// import OwnerItemCard from './ownerItemCard';

// const OwnerDashboard = () => {
//   const { myShopData } = useSelector(state => state.owner)
//   const navigate = useNavigate()
  
//   return (
//     <div className='w-full flex justify-center'>

//       {!myShopData &&
        
//         <div className='flex justify-center items-center p-4 sm:p-6'>
//           <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
//             <div className='flex flex-col items-center text-center p-4 sm:p-6'>
//               <FaUtensils className='text-[#f04324] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
//               <h2 className='text-xl font-bold text-gray-800 mb-2'>Add Your Restaurant</h2>
//               <p className='text-gray-500 mb-4 text-sm sm:text-base'>
//                 Join our food delivery platform and reach thousands of hungry customers every day.
//               </p>

//               <button
//                 onClick={() => navigate("/create-edit-shop")}
//                 className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>
       
//       }
//       {myShopData && 
//       <div className='flex-col justify-center items-center p-4 sm:p-6'>
//         <h1 className='text-2xl sm:text-3xl text-gray-800 flex items-center gap-3 mt-8 text-center'>  <FaUtensils className='text-[#f04324] w-12 h-10 ' /> Welcome to {myShopData.name}</h1>
//         <div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>
          
//     <div className='absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer' onClick={()=>{
//       navigate("/create-edit-shop")
//     }}>
//            <FaPen size={20}/>

//            </div>

//           <img src={myShopData.image} alt={myShopData.name} className='w-full h-48 sm:h-64 object-cover'/>
//              <div className='p-4 sm:p-6'>
//             <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>
//               {myShopData.name}
//             </h1>
//             <p className='text-gray-500 '>{myShopData.city},{myShopData.state}</p>
//             <p className='text-gray-500 mb-4'>{myShopData.address}</p>
//           </div>
//         </div>
//          {myShopData.items.length==0 && 
//           <div className='flex justify-center items-center p-4 sm:p-6'>
//           <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
//             <div className='flex flex-col items-center text-center p-4 sm:p-6'>
//               <FaUtensils className='text-[#f04324] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
//               <h2 className='text-xl font-bold text-gray-800 mb-2'>Add Your Item</h2>
//               <p className='text-gray-500 mb-4 text-sm sm:text-base'>
//                Share your delicious creation with our customers by adding them to the menu
//               </p>

//               <button
//                 onClick={() => navigate("/add-item")}
//                 className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
//               >
//                 Add Food
//               </button>
//             </div>
//           </div>
//         </div>
//          }
//          {myShopData.items.length>0 && 
//              <div className='flex flex-col items-center gap-4 w-full max-w-3xl'>
//              {/* {myShopData.items.map((item,index)=>(<OwnerItemCard data={item} key={index}/>))} */}
//              {myShopData.items.map((item) => (
//   <OwnerItemCard data={item} key={item._id} />
// ))}
//              </div>
//          }
//       </div>
//     }

//     </div>
//   )
// }

// export default OwnerDashboard

import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setmyShopData } from '../redux/ownerSlice'
import { FaUtensils } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { FaPen } from "react-icons/fa";
import OwnerItemCard from './ownerItemCard';

const OwnerDashboard = () => {
  const { myShopData } = useSelector(state => state.owner)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ✅ ADDED: fetch latest data
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/shop/my-shop`,
          { withCredentials: true }
        )
        dispatch(setmyShopData(res.data))
      } catch (err) {
        console.log(err)
      }
    }

    fetchShop()
  }, [])

  return (
    <div className='w-full flex justify-center'>

      {!myShopData &&
        <div className='flex justify-center items-center p-4 sm:p-6'>
          <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex flex-col items-center text-center p-4 sm:p-6'>
              <FaUtensils className='text-[#f04324] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
              <h2 className='text-xl font-bold text-gray-800 mb-2'>Add Your Restaurant</h2>
              <p className='text-gray-500 mb-4 text-sm sm:text-base'>
                Join our food delivery platform and reach thousands of hungry customers every day.
              </p>

              <button
                onClick={() => navigate("/create-edit-shop")}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      }

      {myShopData &&
        <div className='flex-col justify-center items-center p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl text-gray-800 flex items-center gap-3 mt-8 text-center'>
            <FaUtensils className='text-[#f04324] w-12 h-10 ' />
            Welcome to {myShopData.name}
          </h1>

          <div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>

            <div
              className='absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer'
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPen size={20} />
            </div>

            <img src={myShopData.image} alt={myShopData.name} className='w-full h-48 sm:h-64 object-cover' />

            <div className='p-4 sm:p-6'>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>
                {myShopData.name}
              </h1>
              <p className='text-gray-500 '>{myShopData.city},{myShopData.state}</p>
              <p className='text-gray-500 mb-4'>{myShopData.address}</p>
            </div>
          </div>

          {myShopData.items.length == 0 &&
            <div className='flex justify-center items-center p-4 sm:p-6'>
              <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                <div className='flex flex-col items-center text-center p-4 sm:p-6'>
                  <FaUtensils className='text-[#f04324] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
                  <h2 className='text-xl font-bold text-gray-800 mb-2'>Add Your Item</h2>
                  <p className='text-gray-500 mb-4 text-sm sm:text-base'>
                    Share your delicious creation with our customers by adding them to the menu
                  </p>

                  <button
                    onClick={() => navigate("/add-item")}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </div>
          }

          {myShopData.items.length > 0 &&
            <div className='flex flex-col items-center gap-4 w-full max-w-3xl'>
              {myShopData.items.map((item) => (
                <OwnerItemCard data={item} key={item._id} />
              ))}
            </div>
          }
        </div>
      }

    </div>
  )
}

export default OwnerDashboard