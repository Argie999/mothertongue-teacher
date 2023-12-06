'use client'

import axios from "@/app/lib/axios"
import { useState } from "react"
import Cookies from "universal-cookie"

export default function Register () {

    const [registrationForm, setRegistrationForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const cookies = new Cookies(null, {path: '/'})

    const handleFormChange = e => {
        const {name,value} = e.target
        setRegistrationForm({
            ...registrationForm,
            [name]: value
        })
    }

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async () => {
        try {
            await csrf()
            await axios.post('/api/register', registrationForm)
            .then(res=>{

            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="absolute w-full h-full flex justify-center items-center">
            <div className="w-2/5 rounded-lg bg-gray-400 text-gray-700 shadow-md p-6 space-y-2">
                <div className="w-full group">
                    <label className="text-xs font-bold">Name</label>
                    <input 
                        type="text"
                        name="name"
                        className="w-full p-2 rounded-lg border hover:border-black"
                        onChange={handleFormChange}
                        value={registrationForm.name}
                    />
                </div>
                <div className="w-full group">
                    <label className="text-xs font-bold">Email</label>
                    <input 
                        type="text"
                        name="email"
                        className="w-full p-2 rounded-lg border hover:border-black"
                        onChange={handleFormChange}
                        value={registrationForm.email}
                    />
                </div>
                <div className="w-full group">
                    <label className="text-xs font-bold">Password</label>
                    <input 
                        type="password"
                        name="password"
                        className="w-full p-2 rounded-lg border hover:border-black"
                        onChange={handleFormChange}
                        value={registrationForm.password}
                    />
                </div>
                <div className="w-full group">
                    <label className="text-xs font-bold">Confirm Password</label>
                    <input 
                        type="password"
                        name="password_confirmation"
                        className="w-full p-2 rounded-lg border hover:border-black"
                        onChange={handleFormChange}
                        value={registrationForm.password_confirmation}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={register}
                        className="w-1/2 p-2 rounded-lg text-white bg-slate-900 hover:bg-slate-900/80 hover:font-bold"
                    >
                        register
                    </button>
                </div>
            </div>
        </div>
    )
}