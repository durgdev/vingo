// import React from 'react'

// const CategoryCard = ({data}) => {
//   return (
//     <div className='w-[120px] h-[120px] md:h-[180px] md:h-[180px] rounded-2xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden bg-white shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow'>
//     <img src={data.image} alt="" className='w-full h-full object-cover transform hover:scale-110 trasition-transform duration-300'/>
//     </div>
//   )
// }

// export default CategoryCard

// import React from "react"

// const CategoryCard = ({ data }) => {
//   return (
//     <div className="w-[112px] h-[112px] rounded-[14px] border border-[#d99080] shrink-0 overflow-hidden bg-white hover:shadow-sm transition-all duration-300 cursor-pointer relative">
//       <img
//         src={data.image}
//         alt=""
//         className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//       />
//       <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-95 px-3 py-1 rounded-t-xl text-x-center shadow text-sm font-medium text-gray-800 backdrop-blur">
//     {data.category}
//       </div>
//     </div>
//   )
// }

// export default CategoryCard

import React from "react"

const CategoryCard = ({ data, name, image }) => {
  return (
    <div className="w-[112px] h-[112px] rounded-[14px] border border-[#d99080] shrink-0 overflow-hidden bg-white hover:shadow-sm transition-all duration-300 cursor-pointer relative">
      
      <img
        src={data?.image || image}
        alt=""
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] px-3 py-1 rounded-t-xl text-center shadow text-sm font-medium text-gray-800 backdrop-blur">
        {data?.category || data?.name || name}
      </div>

    </div>
  )
}

export default CategoryCard