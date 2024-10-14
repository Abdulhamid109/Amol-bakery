"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin(){
  const router = useRouter();
  const [data, setdata] = useState({
    email: "",
    password: "",
    shopNumber:"",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const AdminLogin = async(e:React.FormEvent)=>{
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post('/api/admin/login',data);
      if(response.status===400){
        console.log("No Account information found");
        toast.error("No account Found");
      }
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/admin/home");
    } catch (error) {
      console.log("Something went wrong"+String(error));
    }
  }

  useEffect(() => {
    if(data.email.length > 0 && data.password.length > 0) {
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
}, [data]);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
    
            <form>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e)=>setdata({...data,email:e.target.value})}
                  placeholder="admin@example.com"
                  required
                />
              </div>
    
              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e)=>setdata({...data,password:e.target.value})}
                  required
                />
              </div>
    
              {/* Shop ID Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopId">
                  Shop ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                  id="shopId"
                  type="text"
                  value={data.shopNumber}
                  onChange={(e)=>setdata({...data,shopNumber:e.target.value})}
                  placeholder="abc123"
                  required
                />
              </div>
    
              {/* Login Button */}
              <button
                type="submit"
                onClick={AdminLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                <h1>{loading ? "Processing" : "Login"}</h1>
              </button>
            </form>
    
            {/* Link to Reset Password */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Forgot your password? 
                <Link href="#" className="text-blue-500 hover:underline"> Reset it</Link>
              </p>
            </div>
            {/* Link to Login */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Don&apos;t have an Accout? 
                <Link href={'/admin/signup'} className="text-blue-500 hover:underline">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      );
}


