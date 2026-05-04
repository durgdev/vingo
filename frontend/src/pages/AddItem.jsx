
import axios from 'axios';
import React, { useState } from 'react'
import { FaUtensils, FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import { setmyShopData } from '../redux/ownerSlice'   // ✅ ADDED

const AddItem = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    formdata.append("shop", myShopData?._id)

    if (formData.image) {
      formdata.append("image", formData.image)
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      console.log("Item added:", result.data)

      // ✅ ADDED (ONLY THIS)
      dispatch(setmyShopData(result.data))
      navigate("/")

    } catch (error) {
      console.log("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed top-6 left-6 z-[9999]">
        <button
          onClick={() => navigate('/')}
          className="p-3 bg-white border shadow-lg hover:scale-110 transition"
        >
          <FaArrowLeft className="text-[#ff4d2d]" size={18} />
        </button>
      </div>

      <div className="w-full min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#ffeae4] to-[#fff] flex justify-center items-start pt-[120px] px-3">

        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-7 border border-gray-100">

          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-tr from-[#ff4d2d] to-[#ff7a5c] p-4 rounded-full shadow-md">
              <FaUtensils className='text-white w-6 h-6' />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
              Add Item
            </h2>

            <p className="text-gray-400 text-sm text-center mt-1">
              Add new food item to your menu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              type="text"
              value={myShopData?.name || ""}
              disabled
              className="border border-gray-200 px-4 py-3 rounded-xl text-sm bg-gray-100 text-gray-500"
            />

            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d] transition"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d] transition"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d] transition"
              required
            >
              <option value="">Select Category</option>
              <option>Pizza</option>
              <option>Burgers</option>
              <option>Chinese</option>
              <option>North Indian</option>
              <option>South Indian</option>
              <option>Desserts</option>
              <option>Others</option>
            </select>

            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, foodType: "veg" }))}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                  formData.foodType === "veg"
                    ? "bg-green-500 text-white shadow"
                    : "text-gray-500"
                }`}
              >
                Veg
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, foodType: "non veg" }))}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                  formData.foodType === "non veg"
                    ? "bg-red-500 text-white shadow"
                    : "text-gray-500"
                }`}
              >
                Non Veg
              </button>
            </div>

            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="text-sm border border-dashed border-gray-300 rounded-xl px-3 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-[160px] object-cover rounded-xl border shadow-sm"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-3 py-3 rounded-xl bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white font-semibold shadow-md hover:scale-[1.02] transition"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>

          </form>

        </div>

      </div>
    </>
  )
}

export default AddItem