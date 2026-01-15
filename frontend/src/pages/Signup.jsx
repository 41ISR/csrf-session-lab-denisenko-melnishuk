import {useNavigate, Link} from "react-router-dom"
import {useState} from "react"

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(undefined)

        if (e.target.password.value !== e.target.password2.value) {
            setError("Пароли не совпадают")
            return
        } 

        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(user)

        try {
            const res = await fetch("https://effective-tribble-v6q4r975rv6vf6gvv-3000.app.github.dev/auth/signup", {
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
            navigate("/")
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
                <Link to="/signin" className="tab-btn" >
                    Вход
                </Link>
                <Link to="/signup" className="tab-btn active" >
                    Регистрация
                </Link>
            </div>
            
            <form id="signup-form" className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Придумайте имя"
                        required=""
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Введите email"
                        required=""
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Придумайте пароль"
                        required=""
                    />
                </div>
                <div className="form-group">
                    <label>Подтвердите пароль</label>
                    <input
                        type="password"
                        name="password2"
                        placeholder="Повторите пароль"
                        required=""
                    />
                </div>
                <div className="form-group error">
                    {error}
                </div>
                <button type="submit" className="btn btn-primary">
                    Создать аккаунт
                </button>
            </form>
        </div>
    </div>
    )
}

export default Signup