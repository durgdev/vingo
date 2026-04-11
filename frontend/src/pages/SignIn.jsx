// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { serverUrl } from "../App";

// const SignIn = () => {
//   const navigate = useNavigate();

//   // Only required fields
//   const [userInfo, setUserInfo] = useState({
//     emailAddress: "",
//     passwordValue: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Input handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   // SignIn handler
//   const handleSignIn = async () => {
//     if (!userInfo.emailAddress || !userInfo.passwordValue) {
//       alert("Please fill all fields");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/auth/signin`,
//         {
//           email: userInfo.emailAddress,
//           password: userInfo.passwordValue,
//         },
//         { withCredentials: true }
//       );

//       console.log("Login success:", result.data);
//       alert("Login successful!");

//       navigate("/"); // ✅ redirect to home/dashboard
//     } catch (error) {
//       console.log("Login error:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-[#f4efec] min-h-screen flex  items-center justify-center  px-4">
//       <div className="w-full max-w-[300px] bg-white rounded-lg shadow-sm px-4 py-4">

//         {/* Title */}
//         <h2 className="text-orange-400 text-sm font-semibold mb-1">Vingo</h2>

//         <p className="text-gray-500 text-[10px] leading-tight mb-2">
//           Welcome back! Please login to continue 🍔
//         </p>

//         {/* Email */}
//         <div className="mb-1.5">
//           <label className="text-[10px] text-gray-600">Email</label>
//           <input
//             type="email"
//             name="emailAddress"
//             value={userInfo.emailAddress}
//             onChange={handleInputChange}
//             placeholder="Enter your Email"
//             className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px]"
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
//             className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px]"
//           />
//         </div>

//         {/* Forget Password */}
//         <p
//           className="text-[10px] text-right text-orange-400 cursor-pointer mb-2 hover:underline"
//           onClick={() => navigate("/forgotpassword")}
//         >
//           Forgot Password?
//         </p>

//         {/* Button */}
//         <button
//           onClick={handleSignIn}
//           disabled={isSubmitting}
//           className="w-full bg-orange-400 text-white py-1 rounded-md text-[12px]"
//         >
//           {isSubmitting ? "Signing In..." : "Sign In"}
//         </button>

//         {/* Footer */}
//         <p
//           className="text-center text-[10px] text-gray-500 mt-2 cursor-pointer"
//           onClick={() => navigate("/signup")}
//         >
//           Don't have an account?{" "}
//           <span className="text-orange-400 hover:underline">Sign Up</span>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default SignIn;



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignIn = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    emailAddress: "",
    passwordValue: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch=useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSignIn = async () => {
    if (!userInfo.emailAddress || !userInfo.passwordValue) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email: userInfo.emailAddress,
          password: userInfo.passwordValue,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data))
      console.log("Login success:", result.data);
      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4efec] min-h-screen flex items-center justify-center px-4">

      {/* ✅ FORM START */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className="w-full max-w-[300px] bg-white rounded-lg shadow-sm px-4 py-4"
      >

        <h2 className="text-orange-400 text-sm font-semibold mb-1">Vingo</h2>

        <p className="text-gray-500 text-[10px] leading-tight mb-2">
          Welcome back! Please login to continue 🍔
        </p>

        {/* Email */}
        <div className="mb-1.5">
          <label className="text-[10px] text-gray-600">Email</label>
          <input
            type="email"
            name="emailAddress"
            value={userInfo.emailAddress}
            onChange={handleInputChange}
            placeholder="Enter your Email"
            autoComplete="email"   // ✅ added
            className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px]"
          />
        </div>

        {/* Password */}
        <div className="mb-1.5">
          <label className="text-[10px] text-gray-600">Password</label>
          <input
            type="password"
            name="passwordValue"
            value={userInfo.passwordValue}
            onChange={handleInputChange}
            placeholder="Enter your Password"
            autoComplete="current-password"   // ✅ IMPORTANT
            className="w-full mt-0.5 px-2 py-1 border border-gray-300 rounded-md text-[11px]"
          />
        </div>

        {/* Forget Password */}
        <p
          className="text-[10px] text-right text-orange-400 cursor-pointer mb-2 hover:underline"
          onClick={() => navigate("/forgotpassword")}
        >
          Forgot Password?
        </p>

        {/* Button */}
        <button
          type="submit"   // ✅ IMPORTANT
          disabled={isSubmitting}
          className="w-full bg-orange-400 text-white py-1 rounded-md text-[12px]"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        {/* Footer */}
        <p
          className="text-center text-[10px] text-gray-500 mt-2 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span className="text-orange-400 hover:underline">Sign Up</span>
        </p>

      </form>
      {/* ✅ FORM END */}

    </div>
  );
};

export default SignIn;