'use client'

import DateFrame from "@/app/components/dateFrame";
import Navigation from "@/app/components/navigation/navigation";
import axios from "@/app/lib/axios";
import { useEffect, useState } from "react";

export default function LeaderBoard () {

    const [leaderboard, setLeaderboard] = useState([])
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getData = async () => {
        try {
            await csrf()
            await axios.get('/api/leaderboard/index')
            .then(res=>{
                setLeaderboard(res.data.data)
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
    }, [])

    return (
        <div>
            <Navigation />
            <div className="pt-20 w-full px-10 pb-6">
                <div className="bg-blue-400 text-white rounded-lg p-6 shadow-md w-full">
                    <p className="text-2xl text-center font-bold">Leaderboard</p>
                    <div className="w-full h-96 overflow-y-scroll">
                        <table className="w-full table-fixed">
                        <thead className="bg-blue-600">
                            <tr>
                                <th>Rank</th>
                                <th>Player Name</th>
                                <th>Stars</th>
                                <th>Last Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboard.map((item,id)=>{
                                    return (
                                        <tr key={id} className="text-center">
                                            <td className="p-2">{id+1}</td>
                                            <td className="p-2">{item?.student?.student_name}</td>
                                            <td className="p-2">{item?.total_stars}</td>
                                            <td className="p-2"><DateFrame dateStr={item?.last_played} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}