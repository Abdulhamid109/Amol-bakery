"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle OTP input changes
  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // Function to handle OTP verification
  const verifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      toast.error("Please enter a 4-digit OTP.");
      return;
    }
    console.log(otpCode);
    

    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyOTP", { otp: otpCode });

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        // Handle post-verification actions (e.g., redirecting)
        router.push('/user/forgetpassword/OTP/updatepassword')
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Failed to verify OTP: ", error);
      toast.error("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(otp.some((digit) => digit === ""));
  }, [otp]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter OTP
        </h2>

        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => {
                if (e.key === "Backspace" && otp[index] === "" && index > 0) {
                  (document.getElementById(`otp-${index - 1}`) as HTMLInputElement).focus();
                } else if (/^\d$/.test(e.key) && index < 3) {
                  (document.getElementById(`otp-${index + 1}`) as HTMLInputElement).focus();
                }
              }}
              id={`otp-${index}`}
            />
          ))}
        </div>

        {/* Verify OTP Button */}
        <button
          onClick={verifyOTP}
          disabled={buttonDisabled || loading}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full 
          ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
