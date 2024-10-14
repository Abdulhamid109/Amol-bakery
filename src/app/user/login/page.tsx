"use client"

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [data, setdata] = useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e:React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/users/login", data);
      if(response.status===404){
        toast.error("User Not found, Signup")
      }
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/user/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 404) {
          toast.error("User not found. Please sign up.");
        } else {
          console.error("Login failed", error);
          toast.error("Login failed. Please try again.");
        }
      }
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

        <form>
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

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
          onClick={onLogin}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            <h1>{loading ? "Processing" : "Login"}</h1>
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?
            <Link href="/user/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
          </p>
        </div>
        <div className="flex justify-end items-center underline cursor-pointer hover:text-sky-600"><Link href={'/admin/login'}>Admin</Link></div>
      </div>
    </div>
  );

}

