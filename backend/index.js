const cookieParser = require("cookie-parser")
const db = require("./db")
const express = require("express")
const cors = require("cors")
const csrf = require('csurf')
const bcrypt = require("bcrypt")
const session = require("express-session")

// ----------
// CONSTANTS

const ERROR_MESSAGE = {
    notAllData: "Не все данные предоставлены",
    authError: "Неверное имя пользователя или пароль",
    regEmailExists: "Пользователь с такой почтой уже существует",
    regUsernameExists: "Пользователь с таким именем уже существует",
    unexcepted: "Произошла ошибка, попробуйте снова",
    unauth: "Вы не вошли в аккаунт",
}

const PAYOUTS = {
    '💯💯💯': 100,
    '🎓🎓🎓': 50,
    '🔥🔥🔥': 25,
    '🧠🧠🧠': 15,
    '📚📚📚': 10,
    '✏️✏️✏️': 8,
    '❌❌❌': 0,
}

const SYMBOLS = ['📚', '✏️', '🧠', '🎓', '🔥', '💯', '❌']

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

const getResult = () => {
    
}

// ----------
// AUTH

app.get('/csrf-token', csrfMiddleware, (req,res) => {
    res.json({token: req.csrfToken()})
})

app.post('/auth/signup', (req, res) => {
    try {
        const {email, username, password} = req.body
        if(!email || !username || !password) throw new Error('lost')
        
        const emailCh = db.prepare(`
            SELECT email FROM users WHERE email = ?`).all(email)
        if(emailCh.length > 0) throw new Error("email")

        const unameCh = db.prepare(`
            SELECT username FROM users WHERE username = ?`).all(username)
        if(unameCh.length > 0) throw new Error("username")

        const hashed = bcrypt.hashSync(password, 10)

        const info = db.prepare(`
            INSERT INTO users (email, username, password) VALUES (?,?,?)`).run(email, username, hashed)
        if(info.changes == 0) throw new Error()

        const newUser = db.prepare(`
            SELECT * FROM users WHERE id = ?`).get(info.lastInsertRowid)

        req.session.userId = newUser.id
        req.session.username = newUser.username
        req.session.email = newUser.email
        req.session.balance = newUser.balance
        
        res.status(201).json({message: "Пользователь успешно создан", user: newUser})
    } catch (error) {
        console.error(error);
        if(error.message == "lost") return res.status(400).json({error: ERROR_MESSAGE.notAllData})
        else if(error.message == "email") return res.status(400).json({error: ERROR_MESSAGE.regEmailExists})
        else if(error.message == "username") return res.status(400).json({error: ERROR_MESSAGE.regUsernameExists})
        else return res.status(400).json({error: ERROR_MESSAGE.unexcepted})
    }
})

app.post('/auth/signin', (req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password) throw new Error('lost')

        const user = db.prepare(`
            SELECT * FROM users WHERE username = ?`).get(username)
        if(!user) throw new Error('wrong')
        if(!bcrypt.compareSync(password, user.password)) throw new Error('wrong')

        req.session.userId = user.id
        req.session.username = user.username
        req.session.email = user.email
        req.session.balance = user.balance

        res.status(200).json({message: 'Успешный вход в систему', user: user})
    } catch (error) {
        console.error(error);
        if(error.message == "lost") return res.status(400).json({error: ERROR_MESSAGE.notAllData})
        else if(error.message == "wrong") return res.status(400).json({error: ERROR_MESSAGE.authError})
        else return res.status(400).json({error: ERROR_MESSAGE.unexcepted})
    }
})

app.post("/auth/logout", (req,res) => {
    req.session.destroy((err) => {
        err && res.status(500).json({error: ERROR_MESSAGE.unexcepted})
        res.clearCookie("sessionId")
        res.status(200).json({message: "Успешно вышли из аккаунта"})
    })
})

// ----------
// OTHER ENDPOINTS

app.get('/profile', (req, res) => {
    try {
        const {userId, username, email} = req.session
        if (!userId) throw new Error('unauth')
        
        const user = db.prepare(`
            SELECT * FROM users WHERE id = ?`).get(userId)

        return res.status(200).json({id: userId, username: username, email: email, balance: user.balance})
        
    } catch (error) {
        console.error(error);
        if(error.message == 'unauth') return res.status(401).json({error: ERROR_MESSAGE.unauth})
        else return res.status(400).json({error: ERROR_MESSAGE.unexcepted})
    }
})

app.get('/leaderboard', (_, res) => {
    try {
        const board = db.prepare(`
            SELECT username, balance FROM users ORDER BY balance DESC LIMIT 10`).all()

        res.status(200).json(board)
    } catch (error) {
        console.error(error);
        res.status(400).json({error: ERROR_MESSAGE.unexcepted})
    }
})

app.post('/spin', (req, res) => {

})

// ----------

app.listen('3000', () => {
    console.log(`Backend is running on 3000
Endpoints:
    /auth/signup    - Регистрация
    /auth/signin    - Авторизация
    /auth/logout    - Выход
    /leaderboard    - Топ пользователей (по убыванию баланса)
    /csrf-token     - Получение токена для запроса
    /profile        - Получение текущего пользователя
    /spin           - Крутите барабан
`);
    
})