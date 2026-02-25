import { create } from "zustand"

const useAppStore = create((set,get) => ({
    currentBalance: 0,
    leaderboard: [],
    setCurrentBalance: (amount) => set((state) => ({...state, currentBalance: amount})),
    setLeaderboard: (board) => set((state) => ({...state, leaderboard: board})),
}))

export default useAppStore
