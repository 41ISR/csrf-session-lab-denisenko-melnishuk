const cookieParser = require("cookie-parser")
const db = require("./db")
const express = require("express")
const cors = require("cors")
const csrf = require('csurf')
const bcrypt = require("bcrypt")
const session = require("express-session")

// ----------
// CONSTANTS



// ----------
// SET APP

const app = express()

app.set("trust proxy", 1)                       // CODESPACE ONLY
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,                               // CODESPACE ONLY
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", 'X-CSRF-TOKEN'],
    exposedHeaders: ["set-cookie"]
}))
app.use(session({
    secret: "ehfpiQEGeMGojef94fkrOP3kgp515594fkpqkegoug4gwjrgwfw4gow49dqds3wefk4",
    name: "sessionId",
    resavee: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24*60*60*1000,
        // sameSite: "strict",  
        sameSite: "lax",            // CODESPACE ONLY
        secure: true,                // FALSE for localhost
        domain: undefined           // CODESPACE ONLY
    }
}))

// ----------
// MIDDLEWARE

const csrfMiddleware = csrf({
    cookie: {
        httpOnly: false,
        sameSite: 'none',
        secure: true
    }
})

// ----------
// AUTH

app.post('/auth/signup', (req, res) => {

})


// ----------


// ----------

app.listen('3000', () => {
    console.log(`Backend is running on 3000
Endpoints:
    /auth/signup    - Регистрация
    /auth/signin    - Авторизация
    /leaderboard    - Топ пользователей (по убыванию баланса)
    /csrf-token     - Получение токена для запроса
    /profile        - Получение текущего пользователя
    /spin           - Крутите барабан
`);
    
})