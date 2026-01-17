import { useState } from "react"


const GameScreen = () => {
    const [currentBet, setCurrentBet] = useState(10)
    const [isSpinning, setIsSpinning] = useState(false)
    const [reelResults, setReelResults] = useState(['📚', '✏️', '🧠']) // начальное состояние

    // Отправка запроса на сервер для спина
    const spin = async () => {
        // ... проверьте, что у юзера достаточно кредов

        setIsSpinning(true)
        setWinMessage('')

        try {
            // ... напишите запрос на бэк и обработайте его
            // Запускаем анимацию, затем устанавливаем результат от сервера
            animateAndSetResult(data.symbols, data.winAmount, data.isWin)
            setBalance((prev) => prev - currentBet + (data.winAmount || 0))
        } catch (err) {
            console.error(err)
            setWinMessage('❌ Ошибка соединения с сервером')
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
                setWinMessage('[ПРИДУМАЙТЕ ФРАЗУ ПРОИГРЫША]')
            }

            setIsSpinning(false)
        }, 1000)
    }

    const selectBet = (amount) => {
        // Проверка, что не меняем бет во время спина
        if (!isSpinning) setCurrentBet(amount)
    }

    return (
        <div className="game-container">
            {/* <Header /> */}

            <div className="slot-machine">
                <div className="slot-machine-header">
                    <h2>🎲 [ПРИДУМАЙТЕ НАЗВАНИЕ ИГРЫ] 🎲</h2>
                </div>
                <SlotMachine symbols={reelResults} isSpinning={isSpinning} />
                <div className="win-message">{message}</div>;
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

            {/* <PayoutTable /> */}
        </div>
    )
}

export default GameScreen