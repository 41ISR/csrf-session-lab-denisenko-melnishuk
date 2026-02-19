import useAppStore from "../store/useAppStore"
import useAuthStore from "../store/useAuthStore"
import { useEffect } from "react"
import {Link} from "react-router-dom"
import Player from "../components/Player"

const Leaderboard = () => {
    const {leaderboard, setLeaderboard} = useAppStore()
    const {user} = useAuthStore()

    const updBoard = async () => {
        try {
            const data = await fetch(`${import.meta.env.BACK_SECRET}/leaderboard`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        

        const res = await data.json()
        setLeaderboard(res)
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        updBoard()
        const interval = setInterval(() => {
            updBoard()
        }, 5000);        
        
        return () => clearInterval(interval)
    },[])

    return (
        <div id="leaderboard-screen" className="screen">
        <div className="leaderboard-container">
            <Link to="/game" className="back-btn">
                ← Назад к игре
            </Link>
            <h1>🏆 Рейтинг лучших 🏆</h1>
            <div className="leaderboard-table">
                <div className="leaderboard-header">
                    <span>Место</span>
                    <span>Студент</span>
                    <span>Баллы</span>
                </div>
                {leaderboard.map((el, index) => (
                    // <div key={index} className={`leaderboard-row rank-${index+1} ${user.username == el.username ? 'highlight' : undefined}`}>
                    //     <span className="rank">#{index+1}</span>
                    //     <span className="player">{el.username}</span>
                    //     <span className="score">{el.balance}</span>
                    // </div>
                    <Player {...el} index={index} />
                ))}
                
                
            </div>
        </div>
    </div>
    )
}

export default Leaderboard