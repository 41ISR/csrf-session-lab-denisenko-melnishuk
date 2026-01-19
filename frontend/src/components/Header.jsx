import {useNavigate, Link} from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

const Header = ({balance}) => {
    const navigate = useNavigate()
    const {user} = useAuthStore()

    const handleLogout = () => {
        navigate("/logout")
    }

    return (
        <header className="game-header">
            <div className="user-info">
                <span className="username">{user.username}</span>
                <span className="balance">📊 {balance} баллов</span>
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
    )
}

export default Header