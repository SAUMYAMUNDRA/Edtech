"use client";
import React, { useMemo, useState } from "react";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import LinkedInButton from "../../components/buttons/LinkedInButton";
import SpotlightCard from "../../components/card/SpotlightCard";

// CompanyFilter component
function CompanyFilter({mentors, value, onFilterCompany}) {
  // Extract companies from main field and experiences
  // Add extra dummy companies for filter (these will show No results)
  const companies = React.useMemo(() => {
    const set = new Set();
    for (const mentor of mentors) {
      if (mentor.company) set.add(mentor.company);
      if (mentor.experiences && Array.isArray(mentor.experiences)) {
        for (const exp of mentor.experiences) {
          if (exp.org) set.add(exp.org);
        }
      }
    }
    [
      "Globex Corp",
      "Soylent Technologies",
      "Umbrella Inc",
      "Hooli",
      "Acme Widgets",
      "Monarch Solutions",
      "Vandelay Industries",
      "Adobe",
      "Cisco",
      "Apple"
    ].forEach(dummy => set.add(dummy));
    return Array.from(set).sort();
  }, [mentors]);
  return (
    <div className="flex flex-col sm:flex-row gap-3 py-2">
      <label htmlFor="filter-company" className="text-sm font-medium text-gray-700">Filter by Company/Organization:</label>
      <select
        id="filter-company"
        value={value}
        onChange={e => onFilterCompany(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="">All Companies</option>
        {companies.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}

const MENTORS = [
  {
    id: 1,
    name: "Arish Rehman Khan",
    role: "Software Engineer Systems",
    company: "Ciena",
    studied: "Jawaharlal Nehru University",
    skills: ["C and C++", "Android Development", "Web development"],
    topSkills: ["Embedded Systems", "Project Management", "Computer Networking"],
    rating: 4.9,
    sessions: 320,
    expYears: 3,
    linkedin: "https://www.linkedin.com/in/arishrehmankhan/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      photo: "https://res.cloudinary.com/dsfssl5zk/image/upload/v1758082537/eoya4vvog1ilshljsyan.jpg",
    bio: "",
    experiences: [
      { org: "Ciena", role: "Software Engineer Systems", year: "2022–now" },
      { org: "Ciena", role: "Software Engineer Intern", year: "Jan 2022-Jul 2022" },
      { org: "IIT Bombay", role: "Django Developer", year: "Apr 2020-Jun 2020" }
    ],
    domains: ["Software Engineering", "Embedded Systems"],
  },
  {
    id: 2,
    name: "Dheeraj Yadav",
    role: "Software Engineer",
    company: "Cohesity",
    studied: "IIT(BHU), Varanasi",
    skills: ["Swagger API", "Python", "Data Structures","Competetive Programming"],
    topSkills: ["Golang", "Django", "MongoDB"],
    rating: 4.8,
    sessions: 280,
    expYears: 1,
    linkedin: "https://www.linkedin.com/in/dheeraj-yadav-8b6917276/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      photo: "https://media.licdn.com/dms/image/v2/D4D03AQHvg1N8dbPPUg/profile-displayphoto-shrink_400_400/B4DZdA9ODIHkAk-/0/1749141482198?e=1761177600&v=beta&t=QGcuuPxzu6K88uGzBnnf9d6B4xrUuhfORuUH5Rh7D84",
    bio: "",
    experiences: [
      { org: "Cohesity", role: "Software Engineer", year: "Jul 2025-now" },
      { org: "Cohesity", role: "Engineering Intern", year: "May 2024-Jul 2024" }
    ],
    domains: ["Software Engineering"],
  },
  {
    id: 3,
    name: "Ruchira Naskar",
    role: "SWE",
    company: "Microsoft",
    studied: "IIT(BHU), Varanasi",
    skills: ["Java", "JDBC", "Remote Procedure Call", "Guice","Dependency Injection"],
    topSkills: ["Unit Testing", "Generative AI", "Protocol Buffers"],
    rating: 4.7,
    sessions: 245,
    expYears: 1,
    linkedin: "https://www.linkedin.com/in/ruchira-naskar-18b86522a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHvgU3u33Li5g/profile-displayphoto-scale_400_400/B56Zkwqrw9I8Ag-/0/1757458121313?e=1761177600&v=beta&t=MFnEg7FPalyA415D1wRD1HOBOTiAZZTgs3irvz_V7B4",
    bio: "",
    experiences: [
      { org: "Microsoft", role: "SWE", year: "Jun 2025–now" },
      { org: "Google", role: "Software Engineering Intern", year: "May 2024–Aug 2024" }
    ],
    domains: ["Storage Engineering", "Software Engineering"],
  },
  {
    id: 4,
    name: "Sachin Gupta",
    role: "Software Engineer",
    company: "Uber",
    studied: "IIT(BHU), Varanasi",
    skills: ["Data Structures", "Grafana", "M3", "GraphQL","TypeScript"],
    topSkills: ["Software Development", "Go","OOP"],
    rating: 4.9,
    sessions: 360,
    expYears: 1,
    linkedin: "https://www.linkedin.com/in/sachin-k-gupta/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHNdG66BHt4GA/profile-displayphoto-scale_400_400/B56Zh2GhmcHMAk-/0/1754328082991?e=1761177600&v=beta&t=8O-BmqHKw201RNS3lz9HC81eNEqg7IlGophEDL74sF4",
    bio: "",
    experiences: [
      { org: "Uber", role: "Software Engineer", year: "Aug 2025–now" },
      { org: "Uber", role: "Software Engineer Intern", year: "May 2024-Jul 2024" }
    ],
    domains: ["Software Engineer"],
  },
  {
    id: 5,
    name: "Ekta Dhusia",
    role: "Software Architect",
    company: "Amdocs",
    studied: "College of Technology, Pantnagar",
    skills: ["Hadoop", "PySpark", "Apache Spark Streaming", "Apache Pig"],
    topSkills: ["Data Architecture", "Data Engineering","AWS"],
    rating: 4.9,
    sessions: 360,
    expYears: 12,
    linkedin: "https://www.linkedin.com/in/ekta-dhusia/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      photo: "https://media.licdn.com/dms/image/v2/C4E03AQE-LEU3g5F9tg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1609785350202?e=1761177600&v=beta&t=0V1ImoF4S4yGoEIhKXxx-lt66bYIBhOh0THFLjJQ1z8",
    bio: "",
    experiences: [
      { org: "Amdocs", role: "Software Architect", year: "May 2025–now" },
      { org: "Amdocs", role: "Big Data Developer", year: "Feb 2017-now" },
      { org: "TCS", role: "Big Data Developer", year: "Dec 2013-Feb2017"}
    ],
    domains: ["Data Engineering","Data Architecture"],
  },
  {
    id: 6,
    name: "Manmeet Chauhan",
    role: "AVP Software Development",
    company: "SitusAMC",
    studied: "University of Rajasthan",
    skills: ["AngularJS", "C#", "SAS Programming", "Agile and Waterfall Methodologies"],
    topSkills: ["Data Mapping", "Solution Architecture","Model-View-Controller(MVC)"],
    rating: 4.9,
    sessions: 360,
    expYears: 19,
    linkedin: "https://www.linkedin.com/in/manmeetchauhan/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      photo: "https://media.licdn.com/dms/image/v2/C4D03AQGBTSRZb_1BAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516626173865?e=1761177600&v=beta&t=t_cjmDmUXvbtQAfzSNPvhNO0GrAWX5oBMIYbYMxUFwA",
    bio: "",
    experiences: [
      { org: "SitusAMC", role: "AVP Software Development", year: "Apr 2025–now" },
      { org: "SitusAMC", role: "Sr. Project Lead", year: "Jan 2017-Mar 2025" },
      { org: "WNS Global Services", role: "Deputy Manager", year: "Jun 2006-Oct 2016"}
    ],
    domains: ["Data Mapping","Solution Architecture"],
  },
  {
    id: 7,
    name: "Kartar R.",
    role: "Database Services Manager",
    company: "Rackspace Technology",
    studied: "Guru Gobind Singh Indraprastha University",
    skills: ["Microsoft Technologies", "SQL Server Management Studio", "SQL Tuning", "Cluster"],
    topSkills: ["Microsoft SQL Server", "Database Administration","SQL"],
    rating: 4.9,
    sessions: 360,
    expYears: 7,
    linkedin: "https://www.linkedin.com/in/kartar-r-89b50546/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      photo: "https://media.licdn.com/dms/image/v2/C5603AQEj6CmSlJ754Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1517431664746?e=1761177600&v=beta&t=xGVb5p0hTAcOmhYblTc9kcu6CsTHxqK2l6dri4XaBlE",
    bio: "",
    experiences: [
      { org: "Rackspace Technology", role: "Database Services Manager", year: "Apr 2025–now" },
      { org: "Bold", role: "Database Services Manager", year: "May 2024-May 2025"},
      { org: "Bold", role: "Project Lead", year: "Mar 2022-Apr 2024" },
      { org: "Rackspace Technology", role: "SQL DBA", year: "Sep 2019-Mar 2022"},
      { org: "Navisite", role: "Consultant", year: "Sep 2018-Sep 2019"}
    ],
    domains: ["SQL","Database Services"],
  },
  {
    id: 8,
    name: "Lov Vashist",
    role: "Senior Sales Engineer",
    company: "ColorTokens",
    studied: "Punjab Technical University",
    skills: ["Technical Writing","Public Speaking","Cyber Resilience","MEDDIC Sales Methodology"],
    topSkills: ["Sales Engineer", "Keynote Delivery","Network Security"],
    rating: 4.9,
    sessions: 360,
    expYears: 9,
    linkedin: "https://www.linkedin.com/in/lov-vashist-8901811b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQEAKt7f6woxAw/profile-displayphoto-scale_400_400/B56ZhQlgThHUAo-/0/1753698667456?e=1761177600&v=beta&t=p2EQxEk-RVC1NqHwHdf9PuYfOTDpipI5kP8p-aoJtuo",
    bio: "",
    experiences: [
      { org: "ColorTokens", role: "Senior Sales Engineer", year: "Jun 2024–now" },
      { org: "Netskope", role: "Senior Sales Engineer", year: "Apr 2022-May 2024"},
      { org: "Zscalar", role: "Senior Sales Engineer", year: "Nov 2019-Apr 2022" },
      { org: "Array Networks", role: "Senior Systems Engineer", year: "Oct 2017-Nov 2019"},
      { org: "Fortinet", role: "Systems Engineer", year: "Jun 2016-Oct 2017"}
    ],
    domains: ["Systems Engineer","Sales Engineer"],
  },
    {
    id: 9,
    name: "Harmanjot Singh",
    role: "Software Engineer",
    company: "Uber",
    studied: "IIT(BHU), Varanasi",
    skills: ["Software Engineering"],
    topSkills: ["SpringBoot", "Java","JUnit"],
    rating: 4.9,
    sessions: 360,
    expYears: 1,
    linkedin: "https://www.linkedin.com/in/harmanjot-singh-53aa38229/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQFHBbV5hzydLg/profile-displayphoto-scale_400_400/B56ZjCcE_5HcAk-/0/1755608804267?e=1761177600&v=beta&t=d6FsibMZKHE8zgcqChWXEDjMR1hRLZyC5sOIk8_GRcY",
    bio: "",
    experiences: [
      { org: "Uber", role: "Software Engineer", year: "Aug 2025–now" },
      { org: "JPMorganChase", role: "Software Engineer Intern", year: "May 2024-Jul 2024"}
    ],
    domains: ["Software Engineer"],
  },
  {
    id: 10,
    name: "Mohammad Inamul Haq",
    role: "Senior Data Analyst",
    company: "GrowthJockey",
    studied: "Jamia Millia Islamia",
    skills: [ "Decision Making",
        "Soft Skills",
        "Business Analysis"],
    topSkills: ["Business Intelligence", "Analytical Solutions","Web Analytics"],
    rating: 4.9,
    sessions: 360,
    expYears: 4,
    linkedin: "https://www.linkedin.com/in/mohammad-inamul-haq-741901192/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHBSAtxyEi3yw/profile-displayphoto-shrink_400_400/B56ZgnBkweG4As-/0/1753001382636?e=1761177600&v=beta&t=MCU85en6hdAXwaLuWCkCh0eBRQ7ZbOuzo5GD-pcgneY",
    bio: "",
    experiences: [
      { org: "GrowthJockey", role: "Senior Data Analyst", year: "Mar 2023–Now" },
      { org: "GrowthJockey", role: "Data Analyst", year: "Jul 2022-Mar 2023"},
      { org: "WIOAI", role: "Data Scientist Intern", year: "Jan 2022-Jun 2022" },
      { org: "The Sparks Foundation", role: "Data Scientist Intern", year: "Feb 2021-Feb 2021"}
    ],
    domains: ["Data Scientist","Data Analyst"],
  },
  {
    id: 11,
    name: "Jayant Pranjal",
    role: "Program Associate",
    company: "Wells Fargo",
    studied: "IIT(BHU), Varanasi",
    skills: ["Django REST Framework", "Javascript", "Java","Algorithms"],
    topSkills: ["Mern Stack", "Django","Python"],
    rating: 4.9,
    sessions: 320,
    expYears: 1,
    linkedin: "https://www.linkedin.com/in/jayant-pranjal/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      photo: "null",
    bio: "",
    experiences: [
      { org: "Wells Fargo", role: "Program Associate", year: "Aug 2025-now" },
      { org: "Forge Code", role: "Software Engineer Intern", year: "Jul 2025-Aug 2025" },
      { org: "The Linux foundation", role: "Software Engineer Intern", year: "Aug 2024-Oct 2024" },
       { org: "Wells Fargo", role: "Software Engineer Intern", year: "May 2024-Jul 2024" }
    ],
    domains: ["Software Engineering", "Program Associate"],
  },
];

export default function ApplyMentorshipPage() {
  const mentors = useMemo(() => MENTORS, []);

  // Company filter state/logic
  const [filterCompany, setFilterCompany] = useState("");
  // Filter mentors based on the selected company
  const filteredMentors = useMemo(() => {
    if (!filterCompany) return mentors;
    return mentors.filter(mentor =>
      mentor.company === filterCompany ||
      (mentor.experiences && mentor.experiences.some(e => e.org === filterCompany))
    );
  }, [mentors, filterCompany]);

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
  "Frontend Engineer",
  "Backend Engineer",
  "Full‑Stack Development",
  "Data Science / ML",
  "DevOps / Cloud",
  "UI/UX Design",
   "Database Administrator",
   "Network Security",
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
                    {["Personalized learning roadmap", " 1:1 sessions with action items", "Mock interviews and detailed feedback", "Resume & LinkedIn review", "Project and code reviews"].map((t, i) => (
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
                    {[{ k: "Avg Mentor Exp.", v: "7.5 yrs" }, { k: "Mentors", v: "150+" }, { k: "Sessions", v: "1k+" }].map((x, i) => (
                      <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600">{x.k}</div>
                        <div className="text-xl font-semibold">{x.v}</div>
                      </div>
                    ))}
                  </div>
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
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={prefs.years}
                      onChange={e => setPrefs(p => ({ ...p, years: e.target.value }))}
                      placeholder="Enter years"
                      className={`w-full px-4 py-2 rounded-md border ${prefErrors.years ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    />
                    {prefErrors.years && <p className="text-sm text-red-600 mt-1">{prefErrors.years}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Work experience (Months)</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={prefs.months}
                      onChange={e => setPrefs(p => ({ ...p, months: e.target.value }))}
                      placeholder="Enter months"
                      className={`w-full px-4 py-2 rounded-md border ${prefErrors.months ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    />
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

                {/* COMPANY FILTER DROPDOWN */}
                <CompanyFilter mentors={mentors} onFilterCompany={(company) => setFilterCompany(company)} value={filterCompany} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMentors.length === 0 ? (<div className="col-span-full text-center text-gray-500 py-12">No results found</div>) :
                  filteredMentors.map(m => (
                    <SpotlightCard key={m.id} spotlightColor="rgba(0, 229, 255, 0.10)" className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden !p-0 flex flex-col h-full">
                    <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center gap-4">
                          <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{m.name}</div>
                            <div className="text-sm text-gray-600">{m.role}, {m.company}</div>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
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
                        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
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
