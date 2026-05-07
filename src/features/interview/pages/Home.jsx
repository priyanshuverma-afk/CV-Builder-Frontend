import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [fileName, setFileName] = useState('')
    const [mobileTab, setMobileTab] = useState('job') // 'job' | 'profile'
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0] || null
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-[#ff2d78] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <h1 className="text-[#e6edf3] text-lg font-semibold">Generating your interview plan...</h1>
                    <p className="text-[#7d8590] text-sm mt-1">This takes about 30 seconds</p>
                </div>
            </main>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[#0d1117] text-[#e6edf3] flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 gap-6 sm:gap-8"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

            {/* Header */}
            <header className="text-center px-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    Create Your Custom{' '}
                    <span className="text-[#ff2d78]">Interview Plan</span>
                </h1>
                <p className="text-[#7d8590] text-sm max-w-md mx-auto leading-relaxed">
                    AI analyzes the job requirements + your profile to build a personalized winning strategy — for <strong className="text-[#e6edf3]">any field or role</strong>.
                </p>
            </header>

            {/* Main Card */}
            <div className="w-full max-w-4xl bg-[#161b22] border border-[#2a3348] rounded-2xl overflow-hidden">

                {/* Mobile Tab Switcher */}
                <div className="flex sm:hidden border-b border-[#2a3348]">
                    <button onClick={() => setMobileTab('job')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer border-none ${mobileTab === 'job' ? 'text-[#ff2d78] border-b-2 border-[#ff2d78] bg-[#ff2d78]/5' : 'text-[#7d8590] bg-transparent'}`}
                        style={{ fontFamily: 'inherit' }}>
                        Job Description
                    </button>
                    <button onClick={() => setMobileTab('profile')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer border-none ${mobileTab === 'profile' ? 'text-[#ff2d78] border-b-2 border-[#ff2d78] bg-[#ff2d78]/5' : 'text-[#7d8590] bg-transparent'}`}
                        style={{ fontFamily: 'inherit' }}>
                        Your Profile
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:min-h-120">

                    {/* Left Panel - Job Description */}
                    <div className={`flex-1 flex flex-col gap-4 p-5 sm:p-6 relative ${mobileTab !== 'job' ? 'hidden sm:flex' : 'flex'}`}>
                        <div className="flex items-center gap-2">
                            <span className="text-[#ff2d78]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </span>
                            <h2 className="text-sm font-semibold text-[#e6edf3] flex-1">Target Job Description</h2>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ff2d78]/15 text-[#ff2d78] border border-[#ff2d78]/30">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            value={jobDescription}
                            className="flex-1 min-h-50 sm:min-h-0 w-full bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-[#e6edf3] text-sm placeholder-[#7d8590] outline-none focus:border-[#ff2d78] resize-none transition-colors leading-relaxed"
                            placeholder={`Paste the full job description here...\n\nWorks for any field:\n• Software Engineer at Google\n• Marketing Manager at a startup\n• Data Scientist at a fintech\n• Product Designer at an agency\n• Doctor / Teacher / Finance Analyst...`}
                            maxLength={5000}
                        />
                        <div className="text-right text-xs text-[#7d8590]">{jobDescription.length} / 5000</div>
                    </div>

                    {/* Vertical Divider (desktop only) */}
                    <div className="hidden sm:block w-px bg-[#2a3348] shrink-0" />

                    {/* Right Panel - Profile */}
                    <div className={`flex-1 flex flex-col gap-3 p-5 sm:p-6 ${mobileTab !== 'profile' ? 'hidden sm:flex' : 'flex'}`}>
                        <div className="flex items-center gap-2">
                            <span className="text-[#ff2d78]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <h2 className="text-sm font-semibold text-[#e6edf3]">Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[#e6edf3]">Upload Resume</span>
                                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30">Best Results</span>
                            </div>
                            <label htmlFor="resume"
                                className="flex flex-col items-center justify-center gap-1.5 py-5 bg-[#1e2535] border-2 border-dashed border-[#2a3348] rounded-xl cursor-pointer hover:border-[#ff2d78] hover:bg-[#ff2d78]/5 transition-all">
                                <span className="text-[#ff2d78]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 16 12 12 8 16" />
                                        <line x1="12" y1="12" x2="12" y2="21" />
                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                    </svg>
                                </span>
                                {fileName
                                    ? <p className="text-sm font-medium text-[#3fb950]">{fileName}</p>
                                    : <>
                                        <p className="text-sm font-medium text-[#e6edf3]">Click to upload or drag & drop</p>
                                        <p className="text-xs text-[#7d8590]">PDF (Max 5MB)</p>
                                    </>
                                }
                                <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf"
                                    onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className="flex items-center gap-3 text-[#7d8590] text-xs">
                            <div className="flex-1 h-px bg-[#2a3348]" />
                            <span>OR describe yourself</span>
                            <div className="flex-1 h-px bg-[#2a3348]" />
                        </div>

                        {/* Self Description */}
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="selfDescription" className="text-sm font-medium text-[#e6edf3]">
                                Quick Self-Description
                            </label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                value={selfDescription}
                                id="selfDescription"
                                className="flex-1 min-h-30 w-full bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#7d8590] outline-none focus:border-[#ff2d78] resize-none transition-colors leading-relaxed"
                                placeholder="e.g. I'm a 3rd year CS student with internship experience in React and Node.js, looking for a frontend role..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="flex items-start gap-2.5 px-3 py-2.5 bg-[#1b2a4a] border border-[#2d4a7a] rounded-xl">
                            <span className="text-[#4a90e2] mt-0.5 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" />
                                </svg>
                            </span>
                            <p className="text-xs text-[#8ab4f8] leading-relaxed">
                                Provide at least a <strong className="text-[#e6edf3]">Resume</strong> or a <strong className="text-[#e6edf3]">Self Description</strong> — or both for best results.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-[#2a3348]">
                    <span className="text-xs text-[#7d8590] text-center sm:text-left">
                        ✦ AI-powered · Works for any job field · ~30s
                    </span>
                    <button
                        onClick={handleGenerateReport}
                        disabled={!jobDescription.trim() || (!selfDescription.trim() && !fileName)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#ff2d78] hover:bg-[#e0265f] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all cursor-pointer border-none"
                        style={{ fontFamily: 'inherit' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                        </svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className="w-full max-w-4xl flex flex-col gap-3">
                    <h2 className="text-sm font-semibold text-[#e6edf3]">My Recent Interview Plans</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0">
                        {reports.map(report => (
                            <li key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                                className="bg-[#161b22] border border-[#2a3348] rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:border-[#ff2d78]/50 transition-colors">
                                <h3 className="text-sm font-semibold text-[#e6edf3] leading-snug">{report.title || 'Untitled Position'}</h3>
                                <p className="text-xs text-[#7d8590]">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-xs font-semibold ${report.matchScore >= 80 ? 'text-[#3fb950]' : report.matchScore >= 60 ? 'text-[#f5a623]' : 'text-[#ff4d4d]'}`}>
                                    Match Score: {report.matchScore}%
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Footer */}
            <footer className="flex gap-6 flex-wrap justify-center">
                {['Privacy Policy', 'Terms of Service', 'Help Center'].map(link => (
                    <a key={link} href="#" className="text-xs text-[#7d8590] hover:text-[#e6edf3] transition-colors no-underline">
                        {link}
                    </a>
                ))}
            </footer>
        </div>
    )
}

export default Home
