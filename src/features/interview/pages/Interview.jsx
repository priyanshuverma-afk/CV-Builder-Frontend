import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'

const NAV_ITEMS = [
    {
        id: 'technical', label: 'Technical',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>)
    },
    {
        id: 'behavioral', label: 'Behavioral',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
    },
    {
        id: 'roadmap', label: 'Road Map',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>)
    },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-[#1c2230] border border-[#2a3348] rounded-xl overflow-hidden hover:border-[#3a4358] transition-colors">
            <div className="flex items-start gap-3 p-4 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
                <span className="shrink-0 text-[10px] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/20 rounded px-1.5 py-0.5 mt-0.5">
                    Q{index + 1}
                </span>
                <p className="flex-1 text-sm font-medium text-[#e6edf3] leading-relaxed m-0">{item.question}</p>
                <span className={`shrink-0 text-[#7d8590] transition-transform duration-200 mt-0.5 ${open ? 'rotate-180 text-[#ff2d78]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className="px-4 pb-4 border-t border-[#2a3348] pt-3 flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded px-1.5 py-0.5 w-fit">Intention</span>
                        <p className="text-sm text-[#9ca3af] leading-relaxed m-0">{item.intention}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20 rounded px-1.5 py-0.5 w-fit">Model Answer</span>
                        <p className="text-sm text-[#9ca3af] leading-relaxed m-0">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="flex flex-col gap-2 pl-12 pb-6 relative">
        <div className="absolute left-6.75 top-1 w-3 h-3 rounded-full bg-[#161b22] border-2 border-[#ff2d78]" />
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/25 px-2.5 py-0.5 rounded-full shrink-0">Day {day.day}</span>
            <h3 className="text-sm font-semibold text-[#e6edf3] m-0">{day.focus}</h3>
        </div>
        <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#9ca3af] leading-relaxed">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#7d8590] mt-2" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-[#ff2d78] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <h1 className="text-[#e6edf3] text-lg font-semibold">Loading your interview plan...</h1>
                </div>
            </main>
        )
    }

    const scoreColor = report.matchScore >= 80 ? 'border-[#3fb950]' : report.matchScore >= 60 ? 'border-[#f5a623]' : 'border-[#ff4d4d]'
    const scoreTextColor = report.matchScore >= 80 ? 'text-[#3fb950]' : report.matchScore >= 60 ? 'text-[#f5a623]' : 'text-[#ff4d4d]'
    const scoreLabel = report.matchScore >= 80 ? 'Strong match' : report.matchScore >= 60 ? 'Good potential' : 'Needs prep'

    const activeCount = activeNav === 'technical' ? report.technicalQuestions.length
        : activeNav === 'behavioral' ? report.behavioralQuestions.length
        : report.preparationPlan.length

    return (
        <div className="min-h-screen w-full bg-[#0d1117] text-[#e6edf3] flex flex-col"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

            {/* Mobile Top Bar */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#2a3348]">
                <button onClick={() => navigate('/')}
                    className="text-[#7d8590] hover:text-[#e6edf3] transition-colors border-none bg-transparent cursor-pointer p-1"
                    style={{ fontFamily: 'inherit' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <p className="text-sm font-semibold text-[#e6edf3] truncate mx-3 flex-1 text-center">{report.title || 'Interview Plan'}</p>
                <button onClick={() => setSidebarOpen(o => !o)}
                    className="text-[#7d8590] hover:text-[#e6edf3] transition-colors border-none bg-transparent cursor-pointer p-1"
                    style={{ fontFamily: 'inherit' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
            </div>

            {/* Mobile Nav Tabs */}
            <div className="lg:hidden flex border-b border-[#2a3348] bg-[#161b22]">
                {NAV_ITEMS.map(item => (
                    <button key={item.id} onClick={() => setActiveNav(item.id)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors cursor-pointer border-none ${activeNav === item.id ? 'text-[#ff2d78] border-b-2 border-[#ff2d78] bg-[#ff2d78]/5' : 'text-[#7d8590] bg-transparent'}`}
                        style={{ fontFamily: 'inherit' }}>
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Desktop Layout */}
            <div className="flex flex-1 lg:p-6">
                <div className="flex w-full lg:max-w-7xl lg:mx-auto lg:bg-[#161b22] lg:border lg:border-[#2a3348] lg:rounded-2xl overflow-hidden">

                    {/* Left Nav (desktop only) */}
                    <nav className="hidden lg:flex w-50 xl:w-55 shrink-0 p-6 flex-col justify-between gap-1">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7d8590] px-3 mb-2">Sections</p>
                            {NAV_ITEMS.map(item => (
                                <button key={item.id} onClick={() => setActiveNav(item.id)}
                                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-left transition-all cursor-pointer border-none ${activeNav === item.id ? 'bg-[#ff2d78]/10 text-[#ff2d78]' : 'bg-transparent text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]'}`}
                                    style={{ fontFamily: 'inherit' }}>
                                    <span className="flex items-center shrink-0">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => getResumePdf(interviewId)}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#ff2d78] hover:bg-[#e0265f] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer border-none"
                            style={{ fontFamily: 'inherit' }}>
                            <svg height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                            </svg>
                            Download Resume
                        </button>
                    </nav>

                    {/* Divider (desktop) */}
                    <div className="hidden lg:block w-px bg-[#2a3348] shrink-0" />

                    {/* Center Content */}
                    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-7 overflow-y-auto lg:max-h-screen lg:pb-20 min-w-0">

                        {/* Section header */}
                        <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-[#2a3348]">
                            <h2 className="text-base lg:text-lg font-bold text-[#e6edf3] m-0">
                                {activeNav === 'technical' ? 'Technical Questions'
                                    : activeNav === 'behavioral' ? 'Behavioral Questions'
                                    : 'Preparation Road Map'}
                            </h2>
                            <span className="text-xs text-[#7d8590] bg-[#1c2230] border border-[#2a3348] px-2.5 py-0.5 rounded-full shrink-0">
                                {activeNav === 'roadmap' ? `${activeCount}-day plan` : `${activeCount} questions`}
                            </span>
                        </div>

                        {/* Questions */}
                        {(activeNav === 'technical' || activeNav === 'behavioral') && (
                            <div className="flex flex-col gap-3">
                                {(activeNav === 'technical' ? report.technicalQuestions : report.behavioralQuestions)
                                    .map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            </div>
                        )}

                        {/* Roadmap */}
                        {activeNav === 'roadmap' && (
                            <div className="relative">
                                <div className="absolute left-8.25 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#ff2d78] to-[#ff2d78]/10 rounded" />
                                {report.preparationPlan.map(day => <RoadMapDay key={day.day} day={day} />)}
                            </div>
                        )}

                        {/* Mobile: Download Resume button */}
                        <div className="mt-6 lg:hidden">
                            <button onClick={() => getResumePdf(interviewId)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#ff2d78] hover:bg-[#e0265f] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer border-none"
                                style={{ fontFamily: 'inherit' }}>
                                Download AI Resume PDF
                            </button>
                        </div>
                    </main>

                    {/* Divider (desktop) */}
                    <div className="hidden lg:block w-px bg-[#2a3348] shrink-0" />

                    {/* Right Sidebar (desktop) */}
                    <aside className="hidden lg:flex w-50 xl:w-60 shrink-0 p-5 flex-col gap-5">
                        {/* Match Score */}
                        <div className="flex flex-col items-center gap-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7d8590] m-0 self-start">Match Score</p>
                            <div className={`w-20 xl:w-24 h-20 xl:h-24 rounded-full border-4 flex flex-col items-center justify-center ${scoreColor}`}>
                                <span className="text-2xl xl:text-[26px] font-extrabold text-[#e6edf3] leading-none">{report.matchScore}</span>
                                <span className="text-xs text-[#7d8590]">%</span>
                            </div>
                            <p className={`text-xs text-center m-0 ${scoreTextColor}`}>{scoreLabel}</p>
                        </div>
                        <div className="h-px bg-[#2a3348]" />
                        {/* Skill Gaps */}
                        <div className="flex flex-col gap-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7d8590] m-0">Skill Gaps</p>
                            <div className="flex flex-wrap gap-1.5">
                                {report.skillGaps.map((gap, i) => (
                                    <span key={i} className={`text-xs font-medium px-2 py-1 rounded-lg border ${gap.severity === 'high' ? 'text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/25' : gap.severity === 'medium' ? 'text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/25' : 'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/25'}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Mobile Sidebar Sheet (score + skill gaps) */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-72 bg-[#161b22] border-l border-[#2a3348] h-full p-6 flex flex-col gap-5 overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-[#e6edf3]">Overview</p>
                            <button onClick={() => setSidebarOpen(false)}
                                className="text-[#7d8590] hover:text-[#e6edf3] border-none bg-transparent cursor-pointer p-1"
                                style={{ fontFamily: 'inherit' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>
                        {/* Score */}
                        <div className="flex flex-col items-center gap-3">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7d8590] self-start">Match Score</p>
                            <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${scoreColor}`}>
                                <span className="text-3xl font-extrabold text-[#e6edf3] leading-none">{report.matchScore}</span>
                                <span className="text-xs text-[#7d8590]">%</span>
                            </div>
                            <p className={`text-xs ${scoreTextColor}`}>{scoreLabel}</p>
                        </div>
                        <div className="h-px bg-[#2a3348]" />
                        {/* Skill Gaps */}
                        <div className="flex flex-col gap-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7d8590]">Skill Gaps</p>
                            <div className="flex flex-wrap gap-2">
                                {report.skillGaps.map((gap, i) => (
                                    <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${gap.severity === 'high' ? 'text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/25' : gap.severity === 'medium' ? 'text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/25' : 'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/25'}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Interview
