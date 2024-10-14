"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword(){
    const [email,setEmail] = useState({
        email:""
    });
    const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(email.email.length>0){
            setButtonDisabled(false);
        }
        setButtonDisabled(true);
    },[email]);

    const sendOTP = async(e:React.FormEvent)=>{
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('/api/users/forgetpassword',email);
            if(response.status===404){
                console.log("Email is not registered!!");
                toast.error("Invalid email credentials..");
            }
            console.log("Successfully send the OTP to email");
            router.push('/user/forgetpassword/OTP');
        } catch (error) {
            console.log("Failed to send the OTP"+String(error));
            toast.error("Failed to send the OTP");
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Forgot Password
            </h2>
    
            <form>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Enter your Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                  id="email"
                  type="email"
                  value={email.email}
                  onChange={(e) => setEmail({...email,email:e.target.value})}
                  placeholder="you@example.com"
                  required
                />
              </div>
    
              {/* Send OTP Button */}
              <button
                type="button"
                onClick={sendOTP}
                disabled={buttonDisabled || loading}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full 
                  ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""} `}
              >
              {/* */}
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      );
}