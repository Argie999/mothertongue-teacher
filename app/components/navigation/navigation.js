'use client'

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation () {

    const currentPath = usePathname()
    const router = useRouter()

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    };


    const logoutUser = async () => {
        try {
            await axios.get('/api/logout')
            .then(res=>{
                deleteCookie('token');
                
                localStorage.removeItem('uid')
                router.push('/login')
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed top-0 w-full bg-gray-900/60 z-50 p-6 flex justify-between text-white">
            <ul className="flex gap-10">
                <li>
                    <Link
                        href={'/'}
                        className={`${currentPath == '/' ? 'border-white font-bold' : 'border-amber-300/10'} border-b`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/game-settings'}
                        className={`${currentPath.startsWith('/game-settings') ? 'border-white font-bold' : 'border-amber-300/10'} border-b`}
                    >
                        Game Settings
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/leaderboard'}
                        className={`${currentPath.startsWith('/leaderboard') ? 'border-white font-bold' : 'border-amber-300/10'} border-b`}
                    >
                        Leaderboard
                    </Link>
                </li>
            </ul>
            <div className="order-last">
                <button
                    onClick={logoutUser}
                    className="text-xs hover:font-bold"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}