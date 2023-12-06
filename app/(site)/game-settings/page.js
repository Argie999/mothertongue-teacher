'use client';

import ImagePreview from "@/app/components/imagePreview";
import Navigation from "@/app/components/navigation/navigation";
import axios from "@/app/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function GameSettings () {

    const [answers,setAnswers] = useState([])
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    
    const getData = async () => {
        try {
            await csrf()
            await axios.get('/api/game-settings/index')
            .then(res=>{
                // setAnswers(res.data.easy.concat(res.data.normal,res.data.hard))
                setAnswers(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const confirmDelete = id => {
        Swal.fire({
            title: 'Delete',
            text: 'Are you sure you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                deleteAnswer(id)
            }
        })
    }

    const deleteAnswer = async (id) => {
        try {
            await csrf()
            await axios.post('/api/game-settings/delete', {id: id})
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

    return (
        <div>
            <Navigation />
            <div className="pt-20 w-full p-6 space-y-2 text-white">
                <div className="w-full rounded-lg bg-blue-400 p-6 shadow-md">
                    <div className="w-full h-96 overflow-y-scroll">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr>
                                    <th>Level</th>
                                    <th>Difficulty</th>
                                    <th>Answer</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    answers.map((item,id)=>{
                                        return (
                                            <tr className="border border-slate-900" key={id}>
                                                <td className="border border-slate-900 p-2">{item.level}</td>
                                                <td className="border border-slate-900 p-2">{item.category}</td>
                                                <td className="border border-slate-900 p-2">{item.answer}</td>
                                                <td className="border border-slate-900 p-2"><ImagePreview base64Image={item.image} alt="image" width={230} height={100} /></td>
                                                <td className="border border-slate-900 p-2 space-y-2">
                                                    <Link
                                                        href={'/game-settings/edit/'+item.id}
                                                        className="block text-center w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg"
                                                    >
                                                        edit
                                                    </Link>
                                                    <button
                                                        onClick={()=>confirmDelete(item.id)}
                                                        className="w-full bg-pink-600 hover:bg-pink-900 rounded-lg p-2"
                                                    >
                                                        delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-full rounded-lg bg-blue-400 p-6 shadow-md">
                    <Link
                        href={`/game-settings/create`}
                        className="block p-2 w-1/3 rounded-lg bg-slate-900 hover:bg-slate-900/80 hover:font-bold text-white text-center"
                    >
                        create
                    </Link>
                </div>
            </div>
        </div>
    )
}