
import useAuthStore from "../store/useAuthStore"

const Player = ({index, username, balance}) => {
    const {user} = useAuthStore()

    return (
        <div key={index} className={`leaderboard-row rank-${index+1} ${user.username == username ? 'highlight' : undefined}`}>
            <span className="rank">#{index+1}</span>
            <span className="player">{username}</span>
            <span className="score">{balance}</span>
            

        </div>
    )
}

export default Player