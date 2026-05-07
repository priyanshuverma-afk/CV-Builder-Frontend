import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
                <p className="text-[#e6edf3] text-lg animate-pulse">Loading...</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[#0d1117] px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#e6edf3] mb-1">Welcome back</h1>
                    <p className="text-[#7d8590] text-sm">Sign in to your account</p>
                </div>
                <div className="bg-[#161b22] border border-[#2a3348] rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-[#e6edf3]">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" id="email" name="email" placeholder="you@example.com"
                                className="bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#7d8590] outline-none focus:border-[#ff2d78] transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-[#e6edf3]">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" id="password" name="password" placeholder="••••••••"
                                className="bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#7d8590] outline-none focus:border-[#ff2d78] transition-colors"
                            />
                        </div>
                        <button type="submit"
                            className="mt-1 w-full bg-[#ff2d78] hover:bg-[#e0265f] active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer">
                            Sign in
                        </button>
                    </form>
                    <p className="text-center text-sm text-[#7d8590] mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#ff2d78] hover:text-[#ff6b9d] font-medium transition-colors">Register</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login
