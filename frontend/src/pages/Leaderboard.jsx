const Leaderboard = () => {


    return (
        <div id="leaderboard-screen" className="screen">
        <div className="leaderboard-container">
            <button className="back-btn" onclick="backToGame()">
                ← Назад к игре
            </button>
            <h1>🏆 Рейтинг лучших 🏆</h1>
            <div className="leaderboard-table">
                <div className="leaderboard-header">
                    <span>Место</span>
                    <span>Студент</span>
                    <span>Баллы</span>
                </div>
                <div className="leaderboard-row rank-1">
                    <span className="rank">🥇 1</span>
                    <span className="player">Юзер</span>
                    <span className="score">15 750</span>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default Leaderboard