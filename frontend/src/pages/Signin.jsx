import {useNavigate, Link} from "react-router-dom"
import {useState} from "react"
import Button from "../components/Button"
import Input from "../components/Input"


const Signin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(undefined)

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        
        try {
            const res = await fetch("https://effective-tribble-v6q4r975rv6vf6gvv-3000.app.github.dev/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            console.log(res)
            navigate("/game")
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

    return (
        <div id="auth-screen" className="screen active">
        <div className="auth-container">
            <h1 className="casino-title">Бингонатор 🎫</h1>
            <div className="auth-tabs">
                <Link to="/signin" className="tab-btn active" >
                    Вход
                </Link>
                <Link to="/signup" className="tab-btn" >
                    Регистрация
                </Link>
            </div>
            <form id="login-form" className="auth-form active" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя пользователя</label>
                    <Input 
                    type="text" 
                    name="username" 
                    placeholder="Введите имя" 
                    required="" 
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        required=""
                    />
                </div>
                <Button type="submit" className="btn btn-primary">
                    Войти
                </Button>
            </form>
            
        </div>
    </div>
    )
}
export default Signin