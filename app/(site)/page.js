'use client'

import { useEffect, useState } from "react";
import Navigation from "../components/navigation/navigation";
import axios from "../lib/axios";
import DateFrame from "../components/dateFrame";
import DateTimeFrame from "../components/dateTimeFrame";

export default function Page () {

  const [lastPlayed, setLastPlayed] = useState([])

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  useEffect(()=>{
    const getData = async () => {
      try {
        await csrf()
        await axios.get('/api/teacher')
        .then(res=>{
          console.log(res)
          setLastPlayed(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Navigation />
      <div className="pt-20 w-full px-10 py-6">
        <div className="bg-blue-400 text-white rounded-lg p-6 shadow-md w-full">
          <p className="text-2xl text-center font-bold">Game Logs</p>
          <div className="w-full h-96 overflow-y-scroll">
            <table className="w-full table-fixed">
              <thead className="bg-blue-600">
                <tr>
                  <th>Level</th>
                  <th>Difficulty</th>
                  <th>Player Name</th>
                  <th>Date Played</th>
                </tr>
              </thead>
              <tbody>
                {
                  lastPlayed.map((item,id)=>{
                    return(
                      <tr key={id} className="border-b border-white hover:bg-blue-500">
                        <td className="p-2">{item?.answers?.level}</td>
                        <td className="p-2">{item?.answers?.category}</td>
                        <td className="p-2">{item?.student?.student_name}</td>
                        <td className="p-2"><DateTimeFrame dateStr={item?.created_at} /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}