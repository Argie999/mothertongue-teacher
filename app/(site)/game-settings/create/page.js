'use client'

import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import Navigation from "@/app/components/navigation/navigation"
import Image from "next/image"
import Swal from "sweetalert2"

export default function Create () {

    const [gameSettingsForm, setGameSettingsForm] = useState({
        category: '',
        level: '',
        answer: '',
        hint1: '',
        hint2: '',
        hint3: '',
        image: '',
        user_id: '',
        description: ''
    })
    const [previewImage, setPreviewImage] = useState('')

    const handleGameSettingsChange = e => {
        const {name, value} = e.target
        setGameSettingsForm({
            ...gameSettingsForm,
            [name]: value
        })
    }

    const handleImage = e => {
        const image = URL.createObjectURL(e.target.files[0])
        setPreviewImage(image)
        const fr = new FileReader()
        fr.onload = () => {
            setGameSettingsForm({
                ...gameSettingsForm,
                image: fr.result.split(',')[1]
            })
        }
        fr.readAsDataURL(e.target.files[0])
    }

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const setUid = () => {
        setGameSettingsForm({
            ...gameSettingsForm,
            user_id: localStorage.getItem('uid')
        })
    }

    const submitGameSettings = async () => {
        try {
            await csrf()
            await axios.post('/api/game-settings/store', gameSettingsForm)
            .then(res=>{
                setGameSettingsForm({
                    category: '',
                    level: '',
                    answer: '',
                    hint1: '',
                    hint2: '',
                    hint3: '',
                    image: '',
                    user_id: localStorage.getItem('uid'),
                    description: ''
                })
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

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            setUid()
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
                                src={previewImage}
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
                            onClick={submitGameSettings}
                        >
                            add
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