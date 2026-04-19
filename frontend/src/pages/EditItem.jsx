

// import React, { useEffect, useState } from 'react'
// import Nav from '../components/Nav'
// import { FaUtensils } from "react-icons/fa"
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { useParams } from 'react-router-dom'

// const EditItem = () => {
//      const [CurrentItem ,setCurrentItem ]=useState(null)
//     const {itemId}=useParams()
//   const dispatch = useDispatch()
//   const { myShopData } = useSelector(state => state.owner)

//   const [formData, setFormData] = useState({
//     name: useState(CurrentItem?.name)||"",
//     price: useState(CurrentItem?.price)||"",
//     category:useState(CurrentItem?.category)|| "",
//     foodType: useState(CurrentItem?.foodType)|| "veg",
//     image: null
//   })

//   const [preview, setPreview] = useState(null)
//   const [loading, setLoading] = useState(false)
 
//   const handleChange = (e) => {
//     const { name, value, files } = e.target

//     if (name === "image") {
//       const file = files[0]
//       setFormData(prev => ({ ...prev, image: file }))
//       setPreview(URL.createObjectURL(file))
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setLoading(true)

//     const formdata = new FormData()

//     formdata.append("name", formData.name)
//     formdata.append("price", formData.price)
//     formdata.append("category", formData.category)
//     formdata.append("foodType", formData.foodType)

//     if (formData.image) {
//       formdata.append("image", formData.image)
//     }

//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/item/add-item`,
//         formdata,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       )

//       console.log("Item added:", result.data)

//       // 👉 OPTIONAL: you can refetch shop OR push item manually
//       // dispatch(updateItems(result.data))

//     } catch (error) {
//       console.log("Error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }
//    useEffect(()=>{
//     const handleGetItemById=async ()=>{
//         try {
//             const result=await get.axios(`${serverUrl}/api/item/get-by-id/${itemId}`,{withCredentials:true})
//             setCurrentItem(result.data)
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
//     handleGetItemById()
//    },[itemId])

//   return (
//     <>
//       <Nav />

//       <div className="w-full min-h-screen bg-gradient-to-br from-[#fff7f3] to-[#ffeae4] flex justify-center items-center pt-[100px]">

//         <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-7">

//           {/* Header */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] p-4 rounded-full shadow-md">
//               <FaUtensils className='text-white w-6 h-6' />
//             </div>

//             <h2 className="text-2xl font-bold text-gray-800 mt-3">
//               Edit Item
//             </h2>

//             <p className="text-gray-500 text-sm text-center mt-1">
//               Add new food item to your menu
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             
//              {/* Shop Name (Auto) */}
// <input
//   type="text"
//   value={myShopData?.name || ""}
//   disabled
//   className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
// />

//             {/* Name */}
//             <input
//               type="text"
//               name="name"
//               placeholder="Item Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
//               required
//             />

//             {/* Price */}
//             <input
//               type="number"
//               name="price"
//               placeholder="Price (₹)"
//               value={formData.price}
//               onChange={handleChange}
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
//               required
//             />

//             {/* Category */}
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
//               required
//             >
//               <option value="">Select Category</option>
//               <option>Pizza</option>
//               <option>Burger</option>
//               <option>Chinese</option>
//               <option>North Indian</option>
//               <option>South Indian</option>
//               <option>Dessert</option>
//               <option>Drinks</option>
//             </select>

//             {/* Food Type */}
//             <div className="flex gap-3">

//               <button
//                 type="button"
//                 onClick={() => setFormData(prev => ({ ...prev, foodType: "veg" }))}
//                 className={`flex-1 py-2 rounded-lg text-sm border ${
//                   formData.foodType === "veg"
//                     ? "bg-green-500 text-white border-green-500"
//                     : "border-gray-300 text-gray-500"
//                 }`}
//               >
//                 Veg
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setFormData(prev => ({ ...prev, foodType: "nonVeg" }))}
//                 className={`flex-1 py-2 rounded-lg text-sm border ${
//                   formData.foodType === "nonVeg"
//                     ? "bg-red-500 text-white border-red-500"
//                     : "border-gray-300 text-gray-500"
//                 }`}
//               >
//                 Non Veg
//               </button>

//             </div>

//             {/* Image */}
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="text-sm border border-gray-200 rounded-lg px-2 py-2"
//               required
//             />

//             {/* Preview */}
//             {preview && (
//               <div className="relative">
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-full h-[140px] object-cover rounded-lg border"
//                 />
//                 <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
//                   Preview
//                 </span>
//               </div>
//             )}

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-3 py-2.5 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
//             >
//               {loading ? "Adding..." : "Add Item"}
//             </button>

//           </form>

//         </div>

//       </div>
//     </>
//   )
// }

// export default EditItem


// import React, { useEffect, useState } from 'react'
// import Nav from '../components/Nav'
// import { FaUtensils } from "react-icons/fa"
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { useParams } from 'react-router-dom'

// const EditItem = () => {

//   const [CurrentItem, setCurrentItem] = useState(null)
//   const { itemId } = useParams()

//   const dispatch = useDispatch()
//   const { myShopData } = useSelector(state => state.owner)

//   // ✅ FIXED (removed wrong useState inside object)
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     foodType: "veg",
//     image: null
//   })

//   const [preview, setPreview] = useState(null)
//   const [loading, setLoading] = useState(false)

//   // ✅ FIXED axios + form autofill
//   useEffect(() => {
//     const handleGetItemById = async () => {
//       try {
//         const result = await axios.get(
//           `${serverUrl}/api/item/get-by-id/${itemId}`,
//           { withCredentials: true }
//         )

//         setCurrentItem(result.data)

//         // ✅ fill form (IMPORTANT FIX)
//         setFormData({
//           name: result.data.name || "",
//           price: result.data.price || "",
//           category: result.data.category || "",
//           foodType: result.data.foodType || "veg",
//           image: null
//         })

//         setPreview(result.data.image)

//       } catch (error) {
//         console.log(error)
//       }
//     }

//     handleGetItemById()
//   }, [itemId])

//   const handleChange = (e) => {
//     const { name, value, files } = e.target

//     if (name === "image") {
//       const file = files[0]
//       setFormData(prev => ({ ...prev, image: file }))
//       setPreview(URL.createObjectURL(file))
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setLoading(true)

//     const formdata = new FormData()

//     formdata.append("name", formData.name)
//     formdata.append("price", formData.price)
//     formdata.append("category", formData.category)
//     formdata.append("foodType", formData.foodType)

//     if (formData.image) {
//       formdata.append("image", formData.image)
//     }

//     try {
//       // ✅ FIXED (edit API instead of add)
//       const result = await axios.put(
//         `${serverUrl}/api/item/edit/${itemId}`,
//         formdata,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       )

//       console.log("Item updated:", result.data)

//     } catch (error) {
//       console.log("Error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Nav />

//       <div className="w-full min-h-screen bg-gradient-to-br from-[#fff7f3] to-[#ffeae4] flex justify-center items-center pt-[100px]">

//         <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-7">

//           {/* Header */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] p-4 rounded-full shadow-md">
//               <FaUtensils className='text-white w-6 h-6' />
//             </div>

//             <h2 className="text-2xl font-bold text-gray-800 mt-3">
//               Edit Item
//             </h2>

//             <p className="text-gray-500 text-sm text-center mt-1">
//               Update your food item
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//             {/* Shop Name */}
//             <input
//               type="text"
//               value={myShopData?.name || ""}
//               disabled
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm bg-gray-100 text-gray-500"
//             />

//             {/* Name */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none"
//               required
//             />

//             {/* Price */}
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none"
//               required
//             />

//             {/* Category */}
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none"
//               required
//             >
//               <option value="">Select Category</option>
//               <option>Pizza</option>
//               <option>Burger</option>
//               <option>Chinese</option>
//               <option>North Indian</option>
//               <option>South Indian</option>
//               <option>Dessert</option>
//               <option>Drinks</option>
//             </select>

//             {/* Food Type */}
//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFormData(prev => ({ ...prev, foodType: "veg" }))}
//                 className={`flex-1 py-2 rounded-lg text-sm border ${
//                   formData.foodType === "veg"
//                     ? "bg-green-500 text-white"
//                     : "border-gray-300 text-gray-500"
//                 }`}
//               >
//                 Veg
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setFormData(prev => ({ ...prev, foodType: "nonVeg" }))}
//                 className={`flex-1 py-2 rounded-lg text-sm border ${
//                   formData.foodType === "nonVeg"
//                     ? "bg-red-500 text-white"
//                     : "border-gray-300 text-gray-500"
//                 }`}
//               >
//                 Non Veg
//               </button>
//             </div>

//             {/* Image */}
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="text-sm border border-gray-200 rounded-lg px-2 py-2"
//             />

//             {/* Preview */}
//             {preview && (
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-full h-[140px] object-cover rounded-lg border"
//               />
//             )}

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-3 py-2.5 rounded-full bg-[#ff4d2d] text-white"
//             >
//               {loading ? "Updating..." : "Update Item"}
//             </button>

//           </form>

//         </div>

//       </div>
//     </>
//   )
// }

// export default EditItem


import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { FaUtensils } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const EditItem = () => {
  const navigate=useNavigate()
  const [CurrentItem, setCurrentItem] = useState(null)
  const { itemId } = useParams()

  const dispatch = useDispatch()
  const { myShopData } = useSelector(state => state.owner)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    foodType: "veg",
    image: null
  })

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  // ✅ Fetch item by ID
  useEffect(() => {
    const handleGetItemById = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-id/${itemId}`,
          { withCredentials: true }
        )

        setCurrentItem(result.data)

        setFormData({
          name: result.data.name || "",
          price: result.data.price || "",
          category: result.data.category || "",
          foodType: result.data.foodType || "veg",
          image: null
        })
      
        setPreview(result.data.image)
        

      } catch (error) {
        console.log(error)
      }
    }

    handleGetItemById()
  }, [itemId])

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "image") {
      const file = files[0]
      setFormData(prev => ({ ...prev, image: file }))
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formdata = new FormData()

    formdata.append("name", formData.name)
    formdata.append("price", formData.price)
    formdata.append("category", formData.category)
    formdata.append("foodType", formData.foodType)

    if (formData.image) {
      formdata.append("image", formData.image)
    }

    try {
      // ✅ FIXED: match backend route (POST + edit-item)
      const result = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      console.log("Item updated:", result.data)
     navigate('/')
    } catch (error) {
      console.log("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />

      <div className="w-full min-h-screen bg-gradient-to-br from-[#fff7f3] to-[#ffeae4] flex justify-center items-center pt-[100px]">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-7">

          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] p-4 rounded-full shadow-md">
              <FaUtensils className='text-white w-6 h-6' />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              Edit Item
            </h2>

            <p className="text-gray-500 text-sm text-center mt-1">
              Update your food item
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Shop Name */}
            <input
              type="text"
              value={myShopData?.name || ""}
              disabled
              className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm bg-gray-100 text-gray-500"
            />

            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              required
            />

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              required
            >
              <option value="">Select Category</option>
              <option>Pizza</option>
              <option>Burger</option>
              <option>Chinese</option>
              <option>North Indian</option>
              <option>South Indian</option>
              <option>Dessert</option>
              <option>Drinks</option>
            </select>

            {/* Food Type */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, foodType: "veg" }))}
                className={`flex-1 py-2 rounded-lg text-sm border ${
                  formData.foodType === "veg"
                    ? "bg-green-500 text-white border-green-500"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                Veg
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, foodType: "nonVeg" }))}
                className={`flex-1 py-2 rounded-lg text-sm border ${
                  formData.foodType === "nonVeg"
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                Non Veg
              </button>
            </div>

            {/* Image */}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="text-sm border border-gray-200 rounded-lg px-2 py-2"
            />

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-[140px] object-cover rounded-lg border"
              />
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 py-2.5 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white font-semibold"
            >
              {loading ? "Updating..." : "Update Item"}
            </button>

          </form>

        </div>

      </div>
    </>
  )
}

export default EditItem