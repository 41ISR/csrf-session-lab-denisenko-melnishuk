import { create } from "zustand"

const useAuthStore = create((set, get) => ({
    user: undefined,
    csrfToken: undefined,
    checkAuth: async () => {
        try {
            const res = await fetch("https://effective-tribble-v6q4r975rv6vf6gvv-3000.app.github.dev/profile", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            // console.log(res)

            if (!res.ok) throw new Error(res.error)

            const data = await res.json()

            if (!data) return

            set((state) => ({ ...state, user: data }))
        } catch (error) {
            console.error(error)
        }
    },
    clearUser: () => {
        set((state) => ({...state, user: undefined}))
    },
    getToken: async () => {
        try {
            const data = await fetch("https://effective-tribble-v6q4r975rv6vf6gvv-3000.app.github.dev/csrf-token", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const res = await data.json()

            if(!data.ok) throw new Error(data.error)

            set((state) => ({...state, csrfToken: res.token}))
        } catch (error) {
            console.error(error);
            
        }
    }
}))

export default useAuthStore