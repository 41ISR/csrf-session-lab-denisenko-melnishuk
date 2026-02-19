import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import SlotMachine from "./SlotMachine"
import Header from "./Header"
import PayoutTable from "./PayoutTable"


const GameScreen = () => {
    const [currentBet, setCurrentBet] = useState(10)
    const [isSpinning, setIsSpinning] = useState(false)
    const [reelResults, setReelResults] = useState(['📚', '✏️', '🧠']) // начальное состояние
    const [winMessage, setWinMessage] = useState('')
    const {user, csrfToken} = useAuthStore()
    const [balance, setBalance] = useState(user.balance)

    const bets = [10, 50, 100]

    // Отправка запроса на сервер для спина
    const spin = async () => {
        if(balance < currentBet){setWinMessage('Недостаточно средств'); return}
        // ... проверьте, что у юзера достаточно кредов

        setIsSpinning(true)
        setWinMessage('')

        try {
            const res = await fetch(`${import.meta.env.BACK_SECRET}/spin`, {
                method: "POST",
                body: JSON.stringify({bet: currentBet, csrfToken}),
                headers:{
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': useAuthStore.getState().csrfToken,
                },
                credentials: "include"
            })

            

            const data = await res.json()

            if(!res.ok) throw new Error(data.error)

            // Запускаем анимацию, затем устанавливаем результат от сервера
            setBalance((prev) => prev - currentBet + (data.winAmount || 0))

            animateAndSetResult(data.symbols, data.winAmount, data.isWin)
        } catch (err) {
            console.error(err)
            // setWinMessage('❌ Ошибка соединения с сервером')
            setWinMessage(err.message)
            setIsSpinning(false)
        }
    }

    // Анимация + установка результата
    const animateAndSetResult = (symbols, winAmount, isWin) => {
        // Анимация длится 1 секунду после ответа сервера
        setTimeout(() => {
            setReelResults(symbols)

            if (isWin) {
                setWinMessage(
                    `🎉 ПОЗДРАВЛЯЕМ! Вы получили ${winAmount} баллов! 🎉`,
                )
            } else {
                setWinMessage('Не повезло, попробуйте еще 😋')
            }

            setIsSpinning(false)
        }, 1000)
    }

    const onSelectBet = (amount) => {
        // Проверка, что не меняем бет во время спина
        if (!isSpinning) setCurrentBet(amount)
    }

    return (
        <div className="game-container">
            <Header balance={balance} />

            <div className="slot-machine">
                <div className="slot-machine-header">
                    <h2>Бингонатор 🎫</h2>
                </div>
                <SlotMachine symbols={reelResults} isSpinning={isSpinning} />
                <div className={`win-message ${winMessage ? 'active' : ''}`}>{winMessage}</div>
                <div className="bet-section">
                    <h3>Выберите ставку</h3>
                    <div className="bet-buttons">
                        {bets.map((amount) => (
                            <button
                                key={amount}
                                className={`bet-btn ${currentBet === amount ? 'active' : ''}`}
                                onClick={() => onSelectBet(amount)}
                                disabled={isSpinning}>
                                <span className="bet-amount">{amount}</span>
                                <span className="bet-label">баллов</span>
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className="spin-btn"
                    onClick={spin}
                    disabled={isSpinning || balance < currentBet}>
                    <span className="spin-text">КРУТИТЬ</span>
                    <span className="spin-cost">
                        Стоимость: {currentBet} баллов
                    </span>
                </button>
            </div>

            <PayoutTable />
        </div>
    )
}

export default GameScreen