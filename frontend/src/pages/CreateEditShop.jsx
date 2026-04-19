import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { FaUtensils } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setmyShopData } from '../redux/ownerSlice'
import {  useNavigate } from 'react-router-dom'
const CreateEditShop = () => {
   const navigate=useNavigate()
  const dispatch = useDispatch()
  const { myShopData } = useSelector(state => state.owner)

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    image: null
  })

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  // ✅ Fill form when editing
  useEffect(() => {
    if (!myShopData) return;

    setFormData({
      name: myShopData.name || "",
      city: myShopData.city || "",
      state: myShopData.state || "",
      address: myShopData.address || "",
      image: null
    })

    setPreview(myShopData.image)
  }, [myShopData])

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
    formdata.append("city", formData.city)
    formdata.append("state", formData.state)
    formdata.append("address", formData.address)

    if (formData.image) {
      formdata.append("image", formData.image)
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      console.log("Shop saved:", result.data)

      // ✅ IMPORTANT: update redux store
      dispatch(setmyShopData(result.data))

    } catch (error) {
      console.log("Error:", error)

    } finally {
      setLoading(false)
      navigate('/')
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
              {myShopData ? "Edit Shop" : "Create Shop"}
            </h2>

            <p className="text-gray-500 text-sm text-center mt-1">
              {myShopData
                ? "Update your restaurant details"
                : "Add your restaurant to start selling"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Shop Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              required
            />

            {/* Image */}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="text-sm border border-gray-200 rounded-lg px-2 py-2"
            />

            {/* Preview */}
            {preview && (
              <div className="relative">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-[140px] object-cover rounded-lg border"
                />
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                  Preview
                </span>
              </div>
            )}

            {/* City + State */}
            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-1/2 border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-1/2 border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
                required
              />
            </div>

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-200 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              required
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 py-2.5 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
            >
              {loading
                ? "Saving..."
                : myShopData
                  ? "Save Changes"
                  : "Create Shop"}
            </button>

          </form>

        </div>

      </div>
    </>
  )
}

export default CreateEditShop