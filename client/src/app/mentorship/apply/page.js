"use client";
import React, { useMemo, useState } from "react";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import LinkedInButton from "../../components/buttons/LinkedInButton";
import SpotlightCard from "../../components/card/SpotlightCard";

const MENTORS = [
  {
    id: 1,
    name: "Amit Kumar",
    role: "Senior SWE",
    company: "Google",
    studied: "IIT Bombay",
    skills: ["Cloud computing", "DSA", "Go", "Leadership"],
    topSkills: ["System Design", "Mentorship", "Go"],
    rating: 4.9,
    sessions: 320,
    expYears: 8,
    linkedin: "#",
    photo: "https://ui-avatars.com/api/?name=Amit+Kumar&background=fde68a&color=111827&bold=true&rounded=true&size=256",
    bio: "Ex-ICPC, leads critical systems. Passionate about guiding future engineers through tough interviews and complex projects.",
    experiences: [
      { org: "Google", role: "Senior SWE", year: "2020–now" },
      { org: "Flipkart", role: "Software Engineer", year: "2017–20" },
      { org: "IIT Bombay", role: "Research Intern", year: "2016" }
    ],
    domains: ["Software Engineering", "System Design"],
  },
  {
    id: 2,
    name: "Sneha Verma",
    role: "Backend Engineer",
    company: "Amazon",
    studied: "IIT Delhi",
    skills: ["Go", "Databases", "Design Patterns"],
    topSkills: ["Java", "Microservices", "Mentoring"],
    rating: 4.8,
    sessions: 280,
    expYears: 7,
    linkedin: "#",
    photo: "https://ui-avatars.com/api/?name=Sneha+Verma&background=bbf7d0&color=111827&bold=true&rounded=true&size=256",
    bio: "Specializes in scalable microservices and data modeling. Strong believer in solid fundamentals.",
    experiences: [
      { org: "Amazon", role: "Backend Engineer", year: "2018–now" },
      { org: "Zomato", role: "SDE", year: "2016–18" }
    ],
    domains: ["Backend Engineering", "Software Engineering"],
  },
  {
    id: 3,
    name: "Ravi Singh",
    role: "Full‑Stack Engineer",
    company: "Microsoft",
    studied: "NIT Trichy",
    skills: ["MongoDB", "Next.js", "UI", "UX"],
    topSkills: ["React", "Node", "DevOps"],
    rating: 4.7,
    sessions: 245,
    expYears: 6,
    linkedin: "#",
    photo: "https://ui-avatars.com/api/?name=Ravi+Singh&background=bae6fd&color=111827&bold=true&rounded=true&size=256",
    bio: "Full‑stack craftsman. Offers practical code reviews, mentorship, and project guidance.",
    experiences: [
      { org: "Microsoft", role: "Full-Stack Engineer", year: "2019–now" },
      { org: "Paytm", role: "Frontend Dev", year: "2017–19" }
    ],
    domains: ["Frontend Engineering", "Software Engineering"],
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Data Scientist",
    company: "Meta",
    studied: "BITS Pilani",
    skills: ["DBMS", "GenAI", "Statistics", "AI"],
    topSkills: ["ML", "Python", "Data Analysis"],
    rating: 4.9,
    sessions: 360,
    expYears: 9,
    linkedin: "#",
    photo: "https://ui-avatars.com/api/?name=Priya+Sharma&background=fbcfe8&color=111827&bold=true&rounded=true&size=256",
    bio: "Applied ML expert with a flair for impactful projects and hands-on learning.",
    experiences: [
      { org: "Meta", role: "Data Scientist", year: "2020–now" },
      { org: "Adobe", role: "ML Engineer", year: "2016–20" }
    ],
    domains: ["Data Science"],
  },
];

export default function ApplyMentorshipPage() {
  const mentors = useMemo(() => MENTORS, []);

  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ years: "0", months: "0", goal: "" });
  const [prefErrors, setPrefErrors] = useState({});
  const [pendingMentor, setPendingMentor] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Schedule state
  const [schedule, setSchedule] = useState({
    dateISO: "",
    time: "",
    agendaCategory: "",
    focusDesc: "",
    driveUrl: "",
    resumeFile: null,
    agree: false,
  });
  const [scheduleErrors, setScheduleErrors] = useState({});
  const [scheduleDone, setScheduleDone] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const goalDomains = [
  "Software Engineering",
  "Full‑Stack Development",
  "Data Science / ML",
  "System Design",
  "DevOps / Cloud",
  "Product Management",
  "UI/UX Design",
  "Other"
];
// Step 4: Agenda for session
const agendaOptions = [
  "Mock interviews",
  "Career advice or career related doubts",
  "Help us with career choice",
  "Help with communication skills"
];

  const Stepper = () => (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#fff9f2] border border-yellow-400/30 rounded-xl">
      {[
        { label: "Intro", n: 1 },
        { label: "Preferences", n: 2 },
        { label: "Select Mentor", n: 3 },
        { label: "Schedule", n: 4 },
      ].map((s) => {
        const isActive = step === s.n;
        const isDone = step > s.n;
        return (
          <div key={s.n} className="flex items-center gap-3">
            <div
              className={
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold " +
                (isActive
                  ? "bg-yellow-400 text-gray-900 ring-2 ring-yellow-300"
                  : isDone
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700")
              }
            >
              {s.n}
            </div>
            <div className={"font-medium " + (isActive ? "text-gray-900" : "text-gray-700")}>{s.label}</div>
          </div>
        );
      })}
    </div>
  );

  const validatePrefs = () => {
    const e = {};
    const y = parseInt(prefs.years, 10);
    const m = parseInt(prefs.months, 10);
    if (Number.isNaN(y) || y < 0 || y > 40) e.years = "Enter 0–40 years";
    if (Number.isNaN(m) || m < 0 || m > 11) e.months = "Enter 0–11 months";
    if (!prefs.goal) e.goal = "Select a goal";
    setPrefErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirmPrefs = () => {
    if (!validatePrefs()) return;
    setStep(3);
  };

  const openConfirmMentor = (m) => {
    setPendingMentor(m);
    setShowConfirm(true);
  };

  const confirmMentor = () => {
    setSelectedMentor(pendingMentor);
    setShowConfirm(false);
    setStep(4);
  };

  const cancelMentor = () => {
    setPendingMentor(null);
    setShowConfirm(false);
  };

  const onScheduleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setSchedule((s) => ({ ...s, [name]: checked }));
    } else if (type === "file") {
      setSchedule((s) => ({ ...s, [name]: files && files.length ? files[0] : null }));
    } else {
      setSchedule((s) => ({ ...s, [name]: value }));
    }
  };

  // Time slot (next 7 days, dynamic)
  const today = new Date();
  const next7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      label: d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      raw: d
    };
  });
  const timeSlots = [ "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

  const validateSchedule = () => {
    const e = {};
    if (!schedule.agendaCategory) e.agendaCategory = "Select an agenda";
    if (!schedule.focusDesc.trim()) e.focusDesc = "Describe your focus";
    if (!schedule.dateISO) e.dateISO = "Select a date";
    if (!schedule.time) e.time = "Select a time";
    if (!schedule.agree) e.agree = "You must accept the terms";
    setScheduleErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirmSchedule = () => {
    if (!validateSchedule()) return;
    setScheduleDone(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <Header />
      <main className="bg-[#fcf6f1]">
        <section className="max-w-6xl mx-auto px-6 sm:px-8 pt-10 pb-16">
          <div className="mb-8">
            <a href="/mentorship" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 mr-1" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
              Back to Mentorship
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold">1:1 Mentorship</h1>
              <p className="text-gray-700 mt-2">Follow the guided flow to choose preferences, select a mentor, and schedule your session.</p>
            </div>
            <Stepper />
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold">Select a mentor for your 1:1 session</h2>
                  <p className="text-gray-700 mt-2">Work directly with industry engineers for focused growth. Get clarity on what to learn, how to practice, and how to prepare for interviews with a personalized plan.</p>
                  <ul className="mt-5 space-y-3 text-gray-800">
                    {["Personalized learning roadmap", "Weekly 1:1 sessions with action items", "Mock interviews and detailed feedback", "Resume & LinkedIn review", "Project and code reviews"].map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 w-2.5 h-2.5 bg-yellow-400 rounded-full" /> <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button onClick={() => setStep(2)} className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">Select your mentor</button>
                  </div>
                </div>
                <div className="p-5 bg-[#fcf6f1] border border-yellow-400/30 rounded-xl">
                  <div className="font-semibold">What to expect</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    {[{ k: "Avg Mentor Exp.", v: "7.5 yrs" }, { k: "Mentors", v: "150+" }, { k: "Sessions", v: "25k+" }, { k: "Student Offers", v: "3k+" }].map((x, i) => (
                      <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600">{x.k}</div>
                        <div className="text-xl font-semibold">{x.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-700">You can change mentors anytime before your first session is completed.</div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold">Help us find the best mentor for you</h2>
                  <p className="text-gray-700">Add your experience and what you want to achieve in the next 1–2 years.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">Work experience (Years)</label>
                    <select value={prefs.years} onChange={e => setPrefs(p => ({ ...p, years: e.target.value }))} className={`w-full px-4 py-2 rounded-md border ${prefErrors.years ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`}>
                      {Array.from({ length: 41 }).map((_, i) => (<option key={i} value={String(i)}>{i}</option>))}
                    </select>
                    {prefErrors.years && <p className="text-sm text-red-600 mt-1">{prefErrors.years}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Work experience (Months)</label>
                    <select value={prefs.months} onChange={e => setPrefs(p => ({ ...p, months: e.target.value }))} className={`w-full px-4 py-2 rounded-md border ${prefErrors.months ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`}>
                      {Array.from({ length: 12 }).map((_, i) => (<option key={i} value={String(i)}>{i}</option>))}
                    </select>
                    {prefErrors.months && <p className="text-sm text-red-600 mt-1">{prefErrors.months}</p>}
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Career goal (next 1–2 years)</label>
                    <select value={prefs.goal} onChange={e => setPrefs(p => ({ ...p, goal: e.target.value }))} className={`w-full px-4 py-2 rounded-md border ${prefErrors.goal ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`}>
                      <option value="">Select a goal</option>
                      {goalDomains.map(g => (<option key={g} value={g}>{g}</option>))}
                    </select>
                    {prefErrors.goal && <p className="text-sm text-red-600 mt-1">{prefErrors.goal}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={confirmPrefs} className="px-6 py-3 rounded-md bg-gray-900 text-white font-medium shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">Confirm your preferences</button>
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Back</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Here are recommended mentors for you</h2>
                    <p className="text-gray-700">Choose a mentor to book your first session. You can refine later based on your needs.</p>
                    <div className="text-sm text-gray-600 mt-1">Your preferences: {prefs.years}y {prefs.months}m • {prefs.goal || "-"}</div>
                  </div>
                  <button onClick={() => setStep(2)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Edit Preferences</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors.map(m => (
                    <SpotlightCard key={m.id} spotlightColor="rgba(0, 229, 255, 0.10)" className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden !p-0">
                      <div className="p-5">
                        <div className="flex items-center gap-4">
                          <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{m.name}</div>
                            <div className="text-sm text-gray-600">{m.role}, {m.company}</div>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                              <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> {m.rating}</span>
                              <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg> {m.sessions} sessions</span>
                              <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6 2h12v2H6zM6 20h12v2H6zM4 6h16v12H4z"/></svg> {m.expYears} yrs</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-3 line-clamp-3">{m.bio}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.topSkills.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs bg-yellow-400/30 text-gray-900 rounded">{t}</span>
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <LinkedInButton href={m.linkedin} ariaLabel={`View ${m.name}'s LinkedIn`} />
                          <button onClick={() => openConfirmMentor(m)} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition-all duration-200 transform hover:scale-105">Book Session</button>
                        </div>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
                {showConfirm && pendingMentor && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={cancelMentor}>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <div onClick={e => e.stopPropagation()} className="relative z-10 w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col md:flex-row gap-8">
                      <div className="flex-1 flex flex-col justify-center">
    <img src={pendingMentor.photo} alt={pendingMentor.name} className="h-24 w-24 rounded-lg object-cover "/>
    <div className="text-xl font-semibold mb-1">{pendingMentor.name}</div>
    <div className="text-gray-700 mb-2">{pendingMentor.role}, {pendingMentor.company}</div>
                        <div className="text-gray-800 mb-4">{pendingMentor.bio}</div>
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-gray-600 pr-2">Studied in:</span>
                          <span className="text-sm font-semibold text-gray-900">{pendingMentor.studied}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {pendingMentor.topSkills.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs bg-yellow-500/20 text-gray-900 rounded">{t}</span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {pendingMentor.skills.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs bg-gray-300 text-gray-800 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col border-l border-gray-200 pl-6 relative">
                        <div className="font-medium text-lg mb-2">Recent experiences</div>
                        <ul className="relative space-y-0">
                          {pendingMentor.experiences.map((exp, idx) => (
                            <li key={idx} className="flex items-start gap-4 mb-6 last:mb-0">
                              <div className="flex flex-col items-center justify-start mt-1">
                                <span className="h-3 w-3 rounded-full bg-yellow-500 border-4 border-white shadow-lg"></span>
                                {idx !== pendingMentor.experiences.length - 1 && (
                                  <span className="w-px bg-yellow-400" style={{ height: 38 }}></span>
                                )}
                              </div>
                              <div className="flex-1 bg-[#fcf6f1] rounded-xl p-3 border border-yellow-100 shadow-sm">
                                <div className="font-semibold text-gray-900">{exp.role}</div>
                                <div className="text-gray-700">{exp.org}</div>
                                <div className="text-gray-500 text-sm">{exp.year}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button onClick={cancelMentor} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                      </button>
                      <div className="absolute left-0 right-0 bottom-0 flex justify-end gap-3 px-6 pb-4">
                        <button onClick={cancelMentor} className="px-2 mt-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
                        <button onClick={confirmMentor} className="px-2 mt-4 py-1 rounded-md bg-gray-900 text-white hover:bg-black">Confirm</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {step === 4 && (
              <div className="space-y-6">
                {!scheduleDone ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold">Schedule your session</h2>
                        <p className="text-gray-700">Fill in the details, then continue to select your time slots.</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setStep(3)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Change Mentor</button>
                      </div>
                    </div>
                    <div className="p-4 bg-[#fcf6f1] rounded-xl border border-yellow-400/30">
                      <div className="flex items-center gap-4">
                        <img src={selectedMentor?.photo} alt={selectedMentor?.name || "mentor"} className="h-14 w-14 rounded-lg object-cover" />
                        <div>
                          <div className="font-semibold">{selectedMentor?.name}</div>
                          <div className="text-sm text-gray-600">{selectedMentor?.role}, {selectedMentor?.company} • {selectedMentor?.expYears} yrs</div>
                          <div className="text-xs text-gray-600">Prefs: {prefs.years}y {prefs.months}m • {prefs.goal || "-"}</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Platform</div>
                        <div className="text-lg font-semibold">Your BridgeLabs Dashboard</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="text-lg font-semibold">30 mins</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1">Agenda for the session</label>
                        <select name="agendaCategory" value={schedule.agendaCategory} onChange={onScheduleChange} className={`w-full px-4 py-2 rounded-md border ${scheduleErrors.agendaCategory ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`}>
                          <option value="">Select an agenda</option>
                          {agendaOptions.map(g => (<option key={g} value={g}>{g}</option>))}
                        </select>
                        {scheduleErrors.agendaCategory && <p className="text-sm text-red-600 mt-1">{scheduleErrors.agendaCategory}</p>}
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-1">What you'd like to focus on</label>
                        <textarea name="focusDesc" value={schedule.focusDesc} onChange={onScheduleChange} rows={4} placeholder="Briefly describe the topics or outcomes you want to cover." className={`w-full px-4 py-2 rounded-md border ${scheduleErrors.focusDesc ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`} />
                        {scheduleErrors.focusDesc && <p className="text-sm text-red-600 mt-1">{scheduleErrors.focusDesc}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1">Resume (Drive URL)</label>
                        <input type="url" name="driveUrl" value={schedule.driveUrl} onChange={onScheduleChange} placeholder="https://drive.google.com/..." className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Or upload file</label>
                        <input type="file" name="resumeFile" accept=".pdf,.doc,.docx,.txt" onChange={onScheduleChange} className="w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-900 file:text-white hover:file:bg-black" />
                        {schedule.resumeFile && (<div className="mt-1 text-xs text-gray-600">Selected: {schedule.resumeFile.name}</div>)}
                      </div>
                    </div>
                    {!showTimePicker && (
                      <div className="flex items-center gap-3">
                        <button onClick={() => setShowTimePicker(true)} className="px-6 py-3 rounded-md bg-gray-900 text-white font-medium shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">Continue to select time slots</button>
                        <button onClick={() => setStep(3)} className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Back</button>
                      </div>
                    )}
                    {showTimePicker && (
                      <div className="space-y-5">
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                          <div className="font-medium mb-2">Select a date</div>
                          <div className="flex flex-row gap-2 overflow-x-auto py-2 w-full no-scrollbar">
                            {next7.map(({ label, value }, idx) => {
                              const selected = schedule.dateISO === value;
                              return (
                                <button key={idx} type="button" onClick={() => setSchedule((s) => ({ ...s, dateISO: value }))} className={"flex flex-col items-center px-4 py-2 rounded-xl border transition-all duration-150 font-medium " + (selected ? "bg-gray-900 text-white border-gray-900 scale-105 shadow-lg" : "bg-white text-gray-900 border-gray-300 hover:bg-yellow-50")}>{label}</button>
                              );
                            })}
                          </div>
                          {scheduleErrors.dateISO && <p className="text-sm text-red-600 mt-2">{scheduleErrors.dateISO}</p>}
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                          <div className="font-medium mb-2">Available times</div>
                          <div className="flex flex-wrap gap-2">
                            {timeSlots.map((t) => {
                              const active = schedule.time === t;
                              return (
                                <button key={t} type="button" onClick={() => setSchedule((s) => ({ ...s, time: t }))} className={"px-3 py-1.5 rounded-md border text-sm " + (active ? "bg-gray-900 text-white border-gray-900 scale-110" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:scale-105")}>{t}</button>
                              );
                            })}
                          </div>
                          {scheduleErrors.time && <p className="text-sm text-red-600 mt-2">{scheduleErrors.time}</p>}
                        </div>
                        <label className="inline-flex items-start gap-3">
                          <input type="checkbox" name="agree" checked={schedule.agree} onChange={onScheduleChange} className="mt-1 h-4 w-4" />
                          <span className="text-sm text-gray-700">I agree to the terms and conditions.</span>
                        </label>
                        {scheduleErrors.agree && <p className="text-sm text-red-600 -mt-1">{scheduleErrors.agree}</p>}
                        <div className="flex items-center gap-3">
                          <button onClick={confirmSchedule} className="px-6 py-3 rounded-md bg-gray-900 text-white font-medium shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">Schedule session</button>
                          <a href="/mentorship" className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</a>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                    <div className="font-semibold text-green-800">Your request has been received!</div>
                    <p className="text-green-700 mt-1">Our team will contact you soon and you will receive an email with the session details.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href="/mentorship" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Go to Mentorship</a>
                      <button onClick={() => { setScheduleDone(false); setShowTimePicker(false); setSchedule(s => ({ ...s, dateISO: "", time: "", agendaCategory: "", focusDesc: "", driveUrl: "", resumeFile: null, agree: false })); setStep(3); }} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">Book another mentor</button>
                      <a href="/" className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">Go Home</a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
