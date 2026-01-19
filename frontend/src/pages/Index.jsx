import useAuthStore from "../store/useAuthStore"
import GameScreen from "../components/GameScreen"
import { useEffect } from "react"

const Index = () => {
    const {getToken, csrfToken} = useAuthStore()

    useEffect(() => {
        getToken()        
    }, [])

    useEffect(() => {
        console.log(csrfToken);
    }, [csrfToken])

    return (
        <div id="game-screen" className="screen">
            <div className="game-container">
                <GameScreen />
            </div>
        </div>
    )
}

export default Index