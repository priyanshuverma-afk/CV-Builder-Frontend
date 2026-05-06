import { createContext, useState, useEffect } from "react"
import { login, register, logout, getMe } from "./services/auth.api.js"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getMe().then(data => {
            if (data?.user) setUser(data.user)
        })
    }, [])

    const handleLogin = async (credentials) => {
        setLoading(true)
        const data = await login(credentials)
        if (data?.user) setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async (credentials) => {
        setLoading(true)
        const data = await register(credentials)
        if (data?.user) setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () => {
        await logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}