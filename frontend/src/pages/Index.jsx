const Index = () => {


    return (
        <div id="game-screen" className="screen">
        <div className="game-container">
            <header className="game-header">
                <div className="user-info">
                    <span className="username">Студент123</span>
                    <span className="balance">📊 [БАЛЛЫ] баллов</span>
                </div>
                <nav className="game-nav">
                    <button className="nav-btn" onclick="showLeaderboard()">
                        🏆 Рейтинг
                    </button>
                    <button className="nav-btn" onclick="logout()">
                        Выход
                    </button>
                </nav>
            </header>
            <div className="slot-machine">
                <div className="slot-machine-header">
                    <h2>🎲 [ПРИДУМАЙТЕ НАЗВАНИЕ ИГРЫ] 🎲</h2>
                </div>
                <div className="slots-container">
                    <div className="slot-wrapper">
                        <div className="slot" id="slot1">
                            <div className="reel">
                                <div className="symbol">📚</div>
                                <div className="symbol">✏️</div>
                                <div className="symbol">🧠</div>
                                <div className="symbol">🎓</div>
                                <div className="symbol">🔥</div>
                                <div className="symbol">💯</div>
                                <div className="symbol">❌</div>
                            </div>
                        </div>
                    </div>
                    <div className="slot-wrapper">
                        <div className="slot" id="slot2">
                            <div className="reel">
                                <div className="symbol">✏️</div>
                                <div className="symbol">🧠</div>
                                <div className="symbol">🎓</div>
                                <div className="symbol">🔥</div>
                                <div className="symbol">💯</div>
                                <div className="symbol">❌</div>
                                <div className="symbol">📚</div>
                            </div>
                        </div>
                    </div>
                    <div className="slot-wrapper">
                        <div className="slot" id="slot3">
                            <div className="reel">
                                <div className="symbol">🧠</div>
                                <div className="symbol">🎓</div>
                                <div className="symbol">🔥</div>
                                <div className="symbol">💯</div>
                                <div className="symbol">❌</div>
                                <div className="symbol">📚</div>
                                <div className="symbol">✏️</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="win-message" id="win-message" />
                <div className="bet-section">
                    <h3>Выберите ставку</h3>
                    <div className="bet-buttons">
                        <button
                            className="bet-btn active"
                            data-bet={10}
                            onclick="selectBet(10)">
                            <span className="bet-amount">10</span>
                            <span className="bet-label">баллов</span>
                        </button>
                        <button
                            className="bet-btn"
                            data-bet={50}
                            onclick="selectBet(50)">
                            <span className="bet-amount">50</span>
                            <span className="bet-label">баллов</span>
                        </button>
                        <button
                            className="bet-btn"
                            data-bet={100}
                            onclick="selectBet(100)">
                            <span className="bet-amount">100</span>
                            <span className="bet-label">баллов</span>
                        </button>
                    </div>
                </div>
                <button className="spin-btn" id="spin-btn" onclick="spin()">
                    <span className="spin-text">КРУТИТЬ</span>
                    <span className="spin-cost">Стоимость: 10 баллов</span>
                </button>
            </div>
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