"use client";
import React, { useMemo, useState } from "react";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import LinkedInButton from "../../components/buttons/LinkedInButton";
import SpotlightCard from "../../components/card/SpotlightCard";

export default function ApplyMentorshipPage() {
  // Step state: 1 = Apply, 2 = Match, 3 = Start
  const [step, setStep] = useState(1);

  // Application form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    experience: "Student",
    track: "DSA",
    goals: "",
    domain: "Software Engineering",
    availability: "Weekdays (Evenings)",
    linkedin: "",
    resume: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});

  // Mentor data for Step 2 (Match)
  const mentors = useMemo(
    () => [
      {
        id: 1,
        name: "Amit Kumar",
        role: "Senior SWE",
        company: "Google",
        tags: ["DSA", "System Design", "Code Review"],
        rating: 4.9,
        sessions: 320,
        expYears: 8,
        linkedin: "#",
        photo: "https://ui-avatars.com/api/?name=Amit+Kumar&background=fde68a&color=111827&bold=true&rounded=true&size=256",
        bio: "Ex-ICPC, leads critical systems. Passionate about mentoring and interview prep.",
        domains: ["Software Engineering", "System Design"],
      },
      {
        id: 2,
        name: "Sneha Verma",
        role: "Backend Engineer",
        company: "Amazon",
        tags: ["Java", "Databases", "Design Patterns"],
        rating: 4.8,
        sessions: 280,
        expYears: 7,
        linkedin: "#",
        photo: "https://ui-avatars.com/api/?name=Sneha+Verma&background=bbf7d0&color=111827&bold=true&rounded=true&size=256",
        bio: "Specializes in scalable microservices and data modeling. Strong on fundamentals.",
        domains: ["Backend Engineering", "Software Engineering"],
      },
      {
        id: 3,
        name: "Ravi Singh",
        role: "Full‑Stack Engineer",
        company: "Microsoft",
        tags: ["React", "Node", "System Design"],
        rating: 4.7,
        sessions: 245,
        expYears: 6,
        linkedin: "#",
        photo: "https://ui-avatars.com/api/?name=Ravi+Singh&background=bae6fd&color=111827&bold=true&rounded=true&size=256",
        bio: "Full‑stack craftsman. Practical project guidance and code quality best practices.",
        domains: ["Frontend Engineering", "Software Engineering"],
      },
      {
        id: 4,
        name: "Priya Sharma",
        role: "Data Scientist",
        company: "Meta",
        tags: ["Python", "ML", "Statistics"],
        rating: 4.9,
        sessions: 360,
        expYears: 9,
        linkedin: "#",
        photo: "https://ui-avatars.com/api/?name=Priya+Sharma&background=fbcfe8&color=111827&bold=true&rounded=true&size=256",
        bio: "Applied ML expert. Interview prep for DS/ML roles with hands‑on exercises.",
        domains: ["Data Science"],
      },
    ],
    []
  );

  const [selectedMentor, setSelectedMentor] = useState(null);

  // Start options for Step 3
  const services = [
    {
      key: "one-on-one",
      title: "1:1 Session",
      desc: "Personalized 60‑min session aligned to your goals.",
      points: ["Learning plan", "Live doubt solving", "Action items"],
    },
    {
      key: "mock-interview",
      title: "Mock Interview",
      desc: "Simulated interview with scorecard and feedback.",
      points: ["DSA/System Design", "Behavioral", "Next‑steps plan"],
    },
    {
      key: "resume-prep",
      title: "Resume Preparation",
      desc: "ATS‑friendly resume + LinkedIn review.",
      points: ["Impact bullets", "Project storytelling", "Keyword fit"],
    },
    {
      key: "system-design",
      title: "System Design Review",
      desc: "Architectural review and trade‑offs discussion.",
      points: ["Scalability", "Reliability", "Best practices"],
    },
    {
      key: "dsa-help",
      title: "DSA Doubt Solving",
      desc: "Targeted help on problems and patterns.",
      points: ["Approach", "Optimization", "Practice plan"],
    },
  ];
  const [selectedService, setSelectedService] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.goals.trim()) e.goals = "Please describe your goals";
    if (!form.consent) e.consent = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submitApplication = (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const payload = { ...form, submittedAt: new Date().toISOString() };
      if (typeof window !== "undefined") {
        const prev = JSON.parse(localStorage.getItem("mentorshipApplications") || "[]");
        localStorage.setItem("mentorshipApplications", JSON.stringify([payload, ...prev]));
      }
      setStep(2); // go to Match step
      // Optionally prefilter mentors based on domain/track later
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const bookMentor = (mentor) => {
    setSelectedMentor(mentor);
    setStep(3);
    // reset selection
    setSelectedService(null);
    setBookingComplete(false);
  };

  const confirmBooking = () => {
    if (!selectedMentor || !selectedService) return;
    const booking = {
      applicant: form,
      mentor: selectedMentor,
      service: selectedService,
      bookedAt: new Date().toISOString(),
      reference: Math.random().toString(36).slice(2, 10).toUpperCase(),
    };
    if (typeof window !== "undefined") {
      const prev = JSON.parse(localStorage.getItem("mentorshipBookings") || "[]");
      localStorage.setItem("mentorshipBookings", JSON.stringify([booking, ...prev]));
    }
    setBookingComplete(true);
  };

  const Stepper = () => (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#fff9f2] border border-yellow-400/30 rounded-xl">
      {[
        { label: "Apply", n: 1 },
        { label: "Match", n: 2 },
        { label: "Start", n: 3 },
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
              <h1 className="text-3xl font-bold">Mentorship Application</h1>
              <p className="text-gray-700 mt-2">Follow the 3‑step flow to apply, match with a mentor, and start.</p>
            </div>

            <Stepper />

            {step === 1 && (
              <form onSubmit={submitApplication} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input name="name" value={form.name} onChange={onChange} placeholder="John Doe" className={`w-full px-4 py-2 rounded-md border ${errors.name ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`} />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={`w-full px-4 py-2 rounded-md border ${errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`} />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" className={`w-full px-4 py-2 rounded-md border ${errors.phone ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`} />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Current Education / Job</label>
                  <input name="currentRole" value={form.currentRole} onChange={onChange} placeholder="B.Tech CSE / Backend Engineer" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Experience Level</label>
                  <select name="experience" value={form.experience} onChange={onChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>Student</option>
                    <option>Fresher</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Track</label>
                  <select name="track" value={form.track} onChange={onChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>DSA</option>
                    <option>Competitive Programming</option>
                    <option>Full‑Stack Development</option>
                    <option>Data Science / ML</option>
                    <option>DevOps / Cloud</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Mentor Domain</label>
                  <select name="domain" value={form.domain} onChange={onChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>Software Engineering</option>
                    <option>Backend Engineering</option>
                    <option>Frontend Engineering</option>
                    <option>Data Science</option>
                    <option>System Design</option>
                    <option>Career Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Availability</label>
                  <select name="availability" value={form.availability} onChange={onChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>Weekdays (Evenings)</option>
                    <option>Weekends</option>
                    <option>Flexible</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Your Goals</label>
                  <textarea name="goals" value={form.goals} onChange={onChange} rows={5} placeholder="Tell us about your target roles, timelines, and the biggest challenges you want help with." className={`w-full px-4 py-2 rounded-md border ${errors.goals ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-yellow-400`} />
                  {errors.goals && <p className="text-sm text-red-600 mt-1">{errors.goals}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn (optional)</label>
                  <input name="linkedin" value={form.linkedin} onChange={onChange} placeholder="https://linkedin.com/in/username" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Resume URL (optional)</label>
                  <input name="resume" value={form.resume} onChange={onChange} placeholder="https://drive.google.com/..." className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>

                <div className="md:col-span-2">
                  <label className="inline-flex items-start gap-3">
                    <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} className="mt-1 h-4 w-4" />
                    <span className="text-sm text-gray-700">I agree to be contacted via email/phone regarding this application and acknowledge that my information will be used to match me with a mentor.</span>
                  </label>
                  {errors.consent && <p className="text-sm text-red-600 mt-1">{errors.consent}</p>}
                </div>

                <div className="md:col-span-2 flex items-center gap-3">
                  <button type="submit" className="px-6 py-3 rounded-md bg-gray-900 text-white font-medium shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">Submit Application</button>
                  <a href="/mentorship" className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</a>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Matched Mentors</h2>
                    <p className="text-gray-700">Curated based on your domain and track preferences. Choose a mentor to book a session.</p>
                  </div>
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Edit Application</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors
                    .filter((m) => m.domains.includes(form.domain) || form.domain === "Software Engineering")
                    .map((m) => (
                      <SpotlightCard key={m.id} spotlightColor="rgba(0, 229, 255, 0.10)" className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden !p-0">
                      <div className="p-5">
                        <div className="flex items-center gap-4">
                          <img src={m.photo} alt={`${m.name}`} className="h-16 w-16 rounded-lg object-cover" />
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
                          {m.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs bg-yellow-400/30 text-gray-900 rounded">{t}</span>
                          ))}
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <LinkedInButton href={m.linkedin} ariaLabel={`View ${m.name}'s LinkedIn`} />
                          <button onClick={() => bookMentor(m)} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition-all duration-200 transform hover:scale-105">Book Session</button>
                        </div>
                      </div>
                    </SpotlightCard>
                    ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {!bookingComplete ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold">Start with {selectedMentor?.name}</h2>
                        <p className="text-gray-700">Choose how you want to begin. You can always explore other formats later.</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setStep(2)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Back to Mentors</button>
                      </div>
                    </div>

                    <div className="p-4 bg-[#fcf6f1] rounded-xl border border-yellow-400/30">
                      <div className="flex items-center gap-4">
                        <img src={selectedMentor?.photo} alt={selectedMentor?.name || "mentor"} className="h-14 w-14 rounded-lg object-cover" />
                        <div>
                          <div className="font-semibold">{selectedMentor?.name}</div>
                          <div className="text-sm text-gray-600">{selectedMentor?.role}, {selectedMentor?.company} • {selectedMentor?.expYears} yrs</div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {selectedMentor?.tags?.slice(0, 3).map((t, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs bg-yellow-400/30 text-gray-900 rounded">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {services.map((s) => {
                        const active = selectedService?.key === s.key;
                        return (
                          <SpotlightCard key={s.key} spotlightColor="rgba(0,229,255,0.10)" className="bg-white border rounded-xl p-0 shadow-sm hover:shadow-md transition">
                            <button
                              type="button"
                              onClick={() => setSelectedService(s)}
                              className={
                                "w-full text-left rounded-3xl bg-transparent p-5 focus:outline-none " +
                                (active ? "border-gray-900 ring-2 ring-gray-900/10" : "border-none")
                              }
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-semibold text-lg">{s.title}</div>
                                  <div className="text-sm text-gray-700 mt-1">{s.desc}</div>
                                </div>
                                <div className={"h-6 w-6 rounded-full border flex items-center justify-center " + (active ? "bg-gray-900 border-gray-900" : "border-gray-300") }>
                                  {active && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                                </div>
                              </div>
                              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                                {s.points.map((p, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            </button>
                          </SpotlightCard>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={confirmBooking}
                        disabled={!selectedService}
                        className={
                          "px-6 py-3 rounded-md text-white font-medium shadow-md transition-transform duration-200 " +
                          (selectedService ? "bg-gray-900 hover:scale-[1.02] hover:shadow-lg" : "bg-gray-400 cursor-not-allowed")
                        }
                      >
                        Confirm & Start
                      </button>
                      <a href="/mentorship" className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</a>
                    </div>
                  </>
                ) : (
                  <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                    <div className="font-semibold text-green-800">You're all set!</div>
                    <p className="text-green-700 mt-1">
                      Your <span className="font-medium">{selectedService?.title}</span> with <span className="font-medium">{selectedMentor?.name}</span> has been booked.
                    </p>
                    <p className="text-green-700">We will reach out to <span className="font-medium">{form.email}</span> with the next steps shortly.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href="/mentorship" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Go to Mentorship</a>
                      <button onClick={() => setStep(2)} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">Book another mentor</button>
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
