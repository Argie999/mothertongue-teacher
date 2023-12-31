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
  
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const submitLogin = async () => {
        try {
            await csrf()
            await axios.post('/api/login', loginForm)
            .then(res=>{
                localStorage.setItem('uid', res.data.uid)
                redirect(res.data.uid)
                setTimeout(()=>{
                    router.push('/')
                },2000)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.error(error);
            Swal.fire(error.message);
        }
    }

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