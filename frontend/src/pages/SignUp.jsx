
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { serverUrl } from "../App"; 
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// const SignUp = () => {
//   const navigate = useNavigate();

//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     emailAddress: "",
//     phone: "",
//     passwordValue: "",
//     userRole: "user",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const roles = ["user", "owner", "deliveryBoy"];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };
//   const dispatch=useDispatch()
//   const handleSignUp = async () => {
//     if (!userInfo.name || !userInfo.emailAddress || !userInfo.phone || !userInfo.passwordValue) {
//       alert("Please fill all fields");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
      
      
//       const result = await axios.post(
//         `${serverUrl}/api/auth/signup`,
//         {
//           fullName: userInfo.name,
//           email: userInfo.emailAddress,
//           mobile: userInfo.phone,
//           password: userInfo.passwordValue,
//           role: userInfo.userRole,
//         },
//         { withCredentials: true }
//       )
      
//       dispatch(setUserData(result.data))
     
//       console.log("Signup success:", result.data);
//       alert("Signup successful!");
       
//       navigate("/signin");
//     } catch (error) {
//       console.log("Signup error:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Signup failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-[#f4efec] min-h-screen flex justify-center pt-10 pb-10 px-4">

//       {/* ✅ FORM START */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSignUp();
//         }}
//         className="w-full max-w-[300px] bg-white rounded-lg shadow-sm px-4 py-4"
//       >

//         <h2 className="text-orange-400 text-sm font-semibold mb-1">Vingo</h2>
//         <p className="text-gray-500 text-[10px] leading-tight mb-2">
//           Create your account to get started with delicious food deliveries 🍔
//         </p>

//         {/* Full Name */}
//         <div className="mb-1.5">
//           <label className="text-[10px] text-gray-600">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={userInfo.name}
//             onChange={handleInputChange}
//             placeholder="Enter your Full Name"
//             autoComplete="name"
//             className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px] focus:outline-none focus:ring-1 focus:ring-orange-300"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-1.5">
//           <label className="text-[10px] text-gray-600">Email</label>
//           <input
//             type="email"
//             name="emailAddress"
//             value={userInfo.emailAddress}
//             onChange={handleInputChange}
//             placeholder="Enter your Email"
//             autoComplete="email"
//             className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px] focus:outline-none focus:ring-1 focus:ring-orange-300"
//           />
//         </div>

//         {/* Mobile */}
//         <div className="mb-1.5">
//           <label className="text-[10px] text-gray-600">Mobile</label>
//           <input
//             type="text"
//             name="phone"
//             value={userInfo.phone}
//             onChange={handleInputChange}
//             placeholder="Enter your Mobile Number"
//             autoComplete="tel"
//             className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px] focus:outline-none focus:ring-1 focus:ring-orange-300"
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-1.5">
//           <label className="text-[10px] text-gray-600">Password</label>
//           <input
//             type="password"
//             name="passwordValue"
//             value={userInfo.passwordValue}
//             onChange={handleInputChange}
//             placeholder="Enter your Password"
//             autoComplete="new-password"
//             className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px] focus:outline-none focus:ring-1 focus:ring-orange-300"
//           />
//         </div>

//         {/* Role */}
//         <div className="mb-2">
//           <label className="text-[10px] text-gray-600">Role</label>
//           <div className="flex gap-1 mt-1">
//             {roles.map((r) => (
//               <button
//                 key={r}
//                 type="button"
//                 onClick={() => setUserInfo({ ...userInfo, userRole: r })}
//                 className={`flex-1 px-1 py-1 text-[10px] rounded-md border transition ${
//                   userInfo.userRole === r
//                     ? "bg-orange-400 text-white border-orange-400"
//                     : "border-gray-300 text-gray-500 hover:border-orange-300 hover:text-orange-400 cursor-pointer"
//                 }`}
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full cursor-pointer bg-orange-400 text-white py-1 rounded-md text-[12px] hover:bg-orange-500 transition disabled:opacity-50"
//         >
//           {isSubmitting ? "Signing Up..." : "Sign Up"}
//         </button>

//         {/* Footer */}
//         <p
//           className="text-center text-[10px] text-gray-500 mt-2 cursor-pointer"
//           onClick={() => navigate("/signin")}
//         >
//           Already have an account?{" "}
//           <span className="text-orange-400 cursor-pointer hover:underline">Login</span>
//         </p>

//       </form>
      

//     </div>
//   );
// };

// export default SignUp;



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App"; 
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    emailAddress: "",
    phone: "",
    passwordValue: "",
    userRole: "user",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const roles = ["user", "owner", "deliveryBoy"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!userInfo.name || !userInfo.emailAddress || !userInfo.phone || !userInfo.passwordValue) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName: userInfo.name,
          email: userInfo.emailAddress,
          mobile: userInfo.phone,
          password: userInfo.passwordValue,
          role: userInfo.userRole,
        },
        { withCredentials: true }
      );
      
      dispatch(setUserData(result.data));
     
      console.log("Signup success:", result.data);
      alert("Signup successful!");
       
      navigate("/signin");
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-[#fff7f3] to-[#ffeae4]">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-6 py-6"
      >

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-extrabold text-[#ff4d2d]">Vingo</h2>
          <p className="text-gray-500 text-xs mt-1">
            Create your account & start ordering 🍔
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-2">
          <label className="text-xs text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
          />
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="text-xs text-gray-600">Email</label>
          <input
            type="email"
            name="emailAddress"
            value={userInfo.emailAddress}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
          />
        </div>

        {/* Mobile */}
        <div className="mb-2">
          <label className="text-xs text-gray-600">Mobile</label>
          <input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-xs text-gray-600">Password</label>
          <input
            type="password"
            name="passwordValue"
            value={userInfo.passwordValue}
            onChange={handleInputChange}
            placeholder="Enter password"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="text-xs text-gray-600">Select Role</label>
          <div className="flex gap-2 mt-2">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setUserInfo({ ...userInfo, userRole: r })}
                className={`flex-1 py-1.5 text-xs rounded-full border transition ${
                  userInfo.userRole === r
                    ? "bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white border-none shadow"
                    : "border-gray-300 text-gray-500 hover:border-[#ff4d2d] hover:text-[#ff4d2d]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition duration-200"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p
          className="text-center text-xs text-gray-500 mt-4 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-[#ff4d2d] font-medium hover:underline">
            Login
          </span>
        </p>

      </form>
    </div>
  );
};

export default SignUp;