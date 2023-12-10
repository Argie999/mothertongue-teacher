'use client'

import axios from '@/app/lib/axios';
import { useRouter } from "next/navigation"
import { useState } from "react"
import { login } from "@/app/hook/login"
import Swal from "sweetalert2"

export default function Login () {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
      });
      const { redirect } = login();
      const router = useRouter();
    
      const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({
          ...loginForm,
          [name]: value,
        });
      };
    
    //  const csrf = async () => {
    //     try {
    //         await axios.get('/sanctum/csrf-cookie');
    //     } catch (error) {
    //         console.error('CSRF request failed:', error.message);
    //         console.error('Error Details:', error);
    //         throw error; // Re-throw the error for the calling function to handle
    //     }
    // };
    
      const submitLogin = async () => {
        const response = await axios.post('/api/login', loginForm);
        console.log(response.data);
        
        try {
          const response = await axios.post('/api/login', loginForm);
          const api_token = req.api_token;
          console.log(response.data);
          
          localStorage.setItem('uid', response.data.uid);
          redirect(response.data.uid);
    
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } catch (error) {
          console.error('Login failed:', error);
    
          if (error.response) {
            // The request was made, but the server responded with an error
            Swal.fire(error.response.data.message);
          } else if (error.request) {
            // The request was made, but no response was received
            Swal.fire('No response received from the server.');
          } else {
            // Something happened in setting up the request that triggered an Error
            Swal.fire('An unexpected error occurred.');
          }
        }
      };

    return (
        <div className="absolute w-full h-full flex justify-center items-center">
            <div className="w-full md:w-1/3 bg-gray-400 text-gray-700 rounded-lg shadow-md p-6 space-y-2">
                <div className="w-full group">
                    <label className="text-xs font-bold">Email</label>
                    <input 
                        type="text"
                        className="w-full p-2 rounded-lg border hover:border-black"
                        name="email"
                        onChange={handleLoginChange}
                        value={loginForm.email}
                    />
                </div>
                <div className="w-full group">
                    <label className="text-xs font-bold">Password</label>
                    <input 
                        type="password"
                        className="w-full p-2 rounded-lg border hover:border-black"
                        name="password"
                        onChange={handleLoginChange}
                        value={loginForm.password}
                    />
                </div>
                <div className="w-full flex gap-2">
                    <button
                        className="w-1/2 p-2 rounded-lg bg-slate-900 hover:bg-slate-900/80 hover:font-bold text-white"
                        onClick={submitLogin}
                    >
                        login
                    </button>
                </div>
            </div>
        </div>
    )
}