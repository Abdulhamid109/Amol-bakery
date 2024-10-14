"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
// import { MdVisibility } from "react-icons/md";
export default function Signup(){
  const router = useRouter();
  const [data, setdata] = useState({
    name:"",
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [visible,setvisible] = useState(false);

  // const visibilitytoggle = () =>setvisible(!visible);
  //onclick event for signup
  const signup = async(e:React.FormEvent)=>{
    try {
      e.preventDefault()
      setLoading(true);
      const response = await axios.post('/api/users/signup',data);
      if(response.status===404){
        toast.error("User Not found, Signup")
      }
      console.log("Successfully created account", response.data);
      toast.success("Successfully created Account");
      router.push("/user/login");
    } catch (error) {
      console.log("Failed to signup "+String(error));
      
    }
  }

  useEffect(() => {
    if(data.name.length>0 && data.email.length > 0 && data.password.length > 0) {
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
}, [data]);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
    
            <form>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e)=>setdata({...data,name:e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
    
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
                  placeholder="you@example.com"
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
    
              {/* Sign-Up Button */}
              <button
                type="submit"
                onClick={signup}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                <h1>{loading ? "Processing" : "SignUp"}</h1>
              </button>
            </form>
    
            {/* Link to Login */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account? 
                <Link href="/user/login" className="text-blue-500 hover:underline"> Log In</Link>
              </p>
            </div>
            <div className="flex justify-end items-center underline cursor-pointer hover:text-sky-600"><Link href={'/admin/signup'}>Admin</Link></div>
          </div>
        </div>
      );
}

