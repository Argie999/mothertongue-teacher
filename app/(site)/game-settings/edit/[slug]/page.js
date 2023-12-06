'use client'

import Navigation from "@/app/components/navigation/navigation"
import axios from "@/app/lib/axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Edit ({params})
{
    const [gameSettingsForm, setGameSettingsForm] = useState({
        category: '',
        level: '',
        answer: '',
        image: '',
        user_id: '',
        description: ''
    })
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const handleGameSettingsChange = e => {
        const {name, value} = e.target
        setGameSettingsForm({
            ...gameSettingsForm,
            [name]: value
        })
    }

    const handleImage = e => {
        const fr = new FileReader()
        fr.onload = () => {
            setGameSettingsForm({
                ...gameSettingsForm,
                image: fr.result.split(',')[1]
            })
        }
        fr.readAsDataURL(e.target.files[0])
    }

    const updateGameSettings = async () => {
        try {
            await csrf()
            await axios.post('/api/game-settings/update', gameSettingsForm)
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const getData = async () => {
        try {
            await csrf()
            await axios.post('/api/game-settings/show', {id: params.slug})
            .then(res=>{
                setGameSettingsForm(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            setGameSettingsForm({
                ...gameSettingsForm,
                user_id: localStorage.getItem('uid')
            })
            getData()
        }
    }, [])

    return (
        <div>
            <Navigation />
            <div className="absolute w-full h-full flex justify-center items-center pt-24">
                <div className="w-3/5 bg-blue-400 text-white rounded-lg p-6 space-y-2">
                    <div className="flex space-x-2 w-full">
                        <div className="w-1/2 space-y-2">
                            <div className="w-full">
                                <label className="text-xs font-bold">Difficulty</label>
                                <select
                                    className="w-full text-gray-800 rounded-lg p-2 border hover:border-black"
                                    name="category"
                                    onChange={handleGameSettingsChange}
                                    value={gameSettingsForm.category}
                                >
                                    <option></option>
                                    <option value={'easy'}>easy</option>
                                    <option value={'normal'}>normal</option>
                                    <option value={'hard'}>hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold">Answer</label>
                                <input 
                                    type="text"
                                    className="w-full text-gray-800 rounded-lg p-2 border hover:border-black"
                                    name="answer"
                                    onChange={handleGameSettingsChange}
                                    value={gameSettingsForm.answer}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Level</label>
                                <input 
                                    type="text"
                                    className="w-full text-gray-800 rounded-lg p-2 border hover:border-black"
                                    name="level"
                                    onChange={handleGameSettingsChange}
                                    value={gameSettingsForm.level}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 space-y-2">
                            <div>
                                <label className="text-xs font-bold">Description: </label>
                                <textarea 
                                    type="text"
                                    rows={7}
                                    className="w-full resize-none text-gray-800 rounded-lg p-2 border hover:border-black"
                                    name="description"
                                    onChange={handleGameSettingsChange}
                                    value={gameSettingsForm.description}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <Image
                                src={`data:image/jpeg;image/jpg;image/png;image/gif;image/webp;base64,${gameSettingsForm.image}`}
                                width={200}
                                height={150}
                                alt="image"
                            />
                        </div>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full rounded-lg p-2 border hover:border-black"
                            onChange={handleImage}
                        />
                    </div>
                    <div className="w-full flex gap-2">
                        <button
                            className="p-2 rounded-lg w-1/2 bg-slate-900 hover:bg-slate-900/80 hover:font-bold text-white"
                            onClick={updateGameSettings}
                        >
                            save
                        </button>
                        <Link 
                            className="block rounded-lg w-1/2 bg-slate-900 hover:bg-slate-900/80 hover:font-bold text-white p-2 text-center"
                            href={`/game-settings`}
                        >
                            back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}