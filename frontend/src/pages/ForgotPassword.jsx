import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  // STEP 1 → Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Enter email");
      return;
    }

    try {
      await axios.post(`${serverUrl}/api/auth/send-otp`, { email });
      setStep(2);
      setMessage("OTP sent to email");
    } catch (err) {
      setMessage("Error sending OTP");
    }
  };

  // STEP 2 → Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Enter OTP");
      return;
    }

    try {
      await axios.post(`${serverUrl}/api/auth/verify-otp`, {
        email,
        otp,
      });
      setStep(3);
      setMessage("OTP verified");
    } catch (err) {
      setMessage("Invalid OTP");
    }
  };

  // STEP 3 → Reset Password
  const handleResetPassword = async () => {
    if (!newPassword) {
      setMessage("Enter new password");
      return;
    }

    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, {
        email,
        password: newPassword,
      });

      setMessage("Password updated successfully");

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="bg-[#f4efec] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[300px] bg-white rounded-lg shadow-sm px-4 py-4">

        <h2 className="text-orange-400 text-sm font-semibold mb-2">
          Forgot Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 px-2 py-1 border text-[11px]"
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-orange-400 text-white py-1 text-[12px]"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-2 px-2 py-1 border text-[11px]"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-orange-400 text-white py-1 text-[12px]"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-2 px-2 py-1 border text-[11px]"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-orange-400 text-white py-1 text-[12px]"
            >
              Reset Password
            </button>
          </>
        )}

        {/* Message */}
        {message && (
          <p className="text-[10px] mt-2 text-center text-gray-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;