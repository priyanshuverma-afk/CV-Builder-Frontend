import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
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
                    <h1 className="text-3xl font-bold text-[#e6edf3] mb-1">Create account</h1>
                    <p className="text-[#7d8590] text-sm">Start preparing for your dream job</p>
                </div>

                <div className="bg-[#161b22] border border-[#2a3348] rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="username" className="text-sm font-medium text-[#e6edf3]">
                                Username
                            </label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                placeholder="yourname"
                                className="bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#7d8590] outline-none focus:border-[#ff2d78] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-[#e6edf3]">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#7d8590] outline-none focus:border-[#ff2d78] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-[#e6edf3]">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#7d8590] outline-none focus:border-[#ff2d78] transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-1 w-full bg-[#ff2d78] hover:bg-[#e0265f] active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer"
                        >
                            Create account
                        </button>

                    </form>

                    <p className="text-center text-sm text-[#7d8590] mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#ff2d78] hover:text-[#ff6b9d] font-medium transition-colors">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </main>
    )
}

export default Register