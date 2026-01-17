import {useNavigate, Link} from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import Button from "../components/Button"
import GameScreen from "../components/GameScreen"
import { useState } from "react"

const Index = () => {
    const navigate = useNavigate()
    const {user} = useAuthStore()
    const [bet, setBet] = useState(10)

    const handleLogout = () => {
        navigate("/logout")
    }

    return (
        <div id="game-screen" className="screen">
            <div className="game-container">
                <header className="game-header">
                    <div className="user-info">
                        <span className="username">{user.username}</span>
                        <span className="balance">📊 {user.balance} баллов</span>
                    </div>
                    <nav className="game-nav">
                        <Link to="/leaderboard" className="nav-btn" >
                            🏆 Рейтинг
                        </Link>
                        <Link to="/logout" onClick={handleLogout} className="nav-btn" >
                            Выход
                        </Link>
                    </nav>
                </header>
                
                <GameScreen />

                <div className="payout-table">
                    <h3>Таблица выигрышей</h3>
                    <div className="payout-grid">
                        <div className="payout-item">
                            <span>💯 💯 💯</span>
                            <span className="multiplier">x100</span>
                        </div>
                        <div className="payout-item">
                            <span>🎓 🎓 🎓</span>
                            <span className="multiplier">x50</span>
                        </div>
                        <div className="payout-item">
                            <span>🔥 🔥 🔥</span>
                            <span className="multiplier">x25</span>
                        </div>
                        <div className="payout-item">
                            <span>🧠 🧠 🧠</span>
                            <span className="multiplier">x15</span>
                        </div>
                        <div className="payout-item">
                            <span>📚 📚 📚</span>
                            <span className="multiplier">x10</span>
                        </div>
                        <div className="payout-item">
                            <span>✏️ ✏️ ✏️</span>
                            <span className="multiplier">x8</span>
                        </div>
                        <div className="payout-item">
                            <span>❌ ❌ ❌</span>
                            <span className="multiplier">x0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index