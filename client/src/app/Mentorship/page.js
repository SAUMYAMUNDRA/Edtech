"use client";
import React from "react";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <Header />

      <main className="bg-[#fcf6f1]">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-8 pt-16 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <p className="text-sm text-gray-600 mb-3">Industry Mentors • 1:1 Guidance • Outcome-Focused</p>
              <h1 className="text-5xl font-bold leading-tight mb-5">
                Mentorship that accelerates<br /> learning and careers
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                Work with handpicked industry experts through structured tracks in DSA,
                Competitive Programming and Full‑Stack Development. Build real projects,
                get interview‑ready, and land opportunities faster.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#apply" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-95">
                  Apply for Mentorship
                </a>
                <a href="#become-mentor" className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-200">
                  Become a Mentor
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-gray-600 text-sm">Industry Mentors</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold">7.5 yrs</div>
                  <div className="text-gray-600 text-sm">Avg Mentor Experience</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold">40+</div>
                  <div className="text-gray-600 text-sm">Partner Universities</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold">3k+</div>
                  <div className="text-gray-600 text-sm">Student Placements</div>
                </div>
              </div>
            </div>

            <div className="md:pl-6">
              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/30 flex items-center justify-center">
                    <span className="text-gray-900 font-bold">B</span>
                  </div>
                  <div>
                    <div className="font-semibold">BridgeLabs Mentorship</div>
                    <div className="text-sm text-gray-600">Personalized Learning Plan</div>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-700">
                  {[
                    "Weekly live mentor sessions",
                    "Curated problem sets and reviews",
                    "Project-based learning with feedback",
                    "Interview prep and mock interviews",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-[#fcf6f1] border border-yellow-400/40 rounded-lg">
                  <p className="text-sm text-gray-700">
                    "This program helped me convert multiple interviews. The feedback loop was
                    incredible." — <span className="font-medium">Sneha V.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          <div className="mb-10">
            <h2 className="text-3xl font-bold">How it works</h2>
            <p className="text-gray-600 mt-2">A simple, effective path from learning to hiring.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Apply",
                desc: "Tell us your goals and current level.",
              },
              {
                title: "Match",
                desc: "We match you with a mentor in your domain.",
              },
              {
                title: "Build",
                desc: "Follow a structured plan with weekly 1:1s.",
              },
              {
                title: "Get Hired",
                desc: "Portfolio, referrals, and interview prep.",
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-md bg-yellow-400/30 flex items-center justify-center font-semibold text-gray-900">
                    {idx + 1}
                  </div>
                  <div className="text-sm text-gray-500">Step {idx + 1}</div>
                </div>
                <div className="font-semibold text-lg mb-1">{step.title}</div>
                <div className="text-gray-600">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section className="max-w-7xl mx-auto px-8 py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Mentor Benefits</h2>
            <p className="text-gray-600 mt-2">What you get with BridgeLabs mentorship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "1:1 Mentorship",
                desc: "Weekly personalized sessions tailored to your goals.",
                points: ["Custom learning plan", "Progress tracking", "Accountability check-ins"],
              },
              {
                title: "Mock Interviews",
                desc: "Simulated interviews with actionable feedback.",
                points: ["DSA & system design", "HR & behavioral rounds", "Scorecards and tips"],
              },
              {
                title: "Code Reviews",
                desc: "Deep reviews on assignments and projects.",
                points: ["Clean code practices", "Optimization guidance", "Best-practice patterns"],
              },
              {
                title: "Career Roadmap",
                desc: "Plan your path from learner to hire-ready.",
                points: ["Skill gap analysis", "Project portfolio plan", "Referral readiness"],
              },
              {
                title: "Resume & LinkedIn",
                desc: "Position yourself for better callbacks.",
                points: ["ATS-friendly resume", "LinkedIn profile polish", "Project storytelling"],
              },
              {
                title: "Live Doubt Solving",
                desc: "Get unstuck faster with mentor office hours.",
                points: ["Live Q&A", "Debugging support", "Contest upsolving guidance"],
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-xl">{card.title}</h3>
                  <span className="px-2 py-1 text-xs rounded bg-yellow-400 text-black font-medium">Included</span>
                </div>
                <p className="text-gray-600 mb-4">{card.desc}</p>
                <ul className="space-y-2 text-gray-700">
                  {card.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* MENTOR SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Mentor Spotlight</h2>
            <p className="text-gray-600 mt-2">Top engineers guiding you at every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Amit Kumar", role: "SWE, Google", tags: ["DSA", "System Design"] },
              { name: "Sneha Verma", role: "Backend, Amazon", tags: ["Java", "Databases"] },
              { name: "Ravi Singh", role: "Full‑Stack, Microsoft", tags: ["React", "Node"] },
            ].map((m, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-sm text-gray-600">{m.role}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-yellow-400/30 text-gray-900 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UNIVERSITY COLLAB */}
        <section className="max-w-7xl mx-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-3">For Universities & Departments</h2>
              <p className="text-gray-700 mb-6">
                Bring industry‑grade curriculum, capstone projects, and mentors to your classrooms.
                We integrate with academic schedules while keeping hiring outcomes front‑and‑center.
              </p>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Curriculum mapping to credits",
                  "Capstone projects with live reviews",
                  "Faculty development & TA support",
                  "Placement prep bootcamps",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="font-semibold text-xl mb-2">Program Outcomes</h3>
                <p className="text-gray-700">
                  Measurable improvement in problem‑solving, project quality, and placement readiness, tracked via weekly reports and assessments.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { k: "+45%", v: "DSA proficiency" },
                  { k: "3x", v: "Contest ratings" },
                  { k: "2 capstones", v: "per student" },
                  { k: "8 weeks", v: "to interview‑ready" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#fcf6f1] rounded-lg p-4 text-center border border-yellow-400/40">
                    <div className="text-2xl font-bold">{s.k}</div>
                    <div className="text-sm text-gray-600">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APPLY / BECOME MENTOR */}
        <section id="apply" className="max-w-7xl mx-auto px-8 py-14">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">Start your mentorship journey</h3>
                <p className="text-gray-700">
                  Tell us about your background and goals. We’ll recommend a track and match you with the right mentor.
                </p>
              </div>
              <div className="flex gap-4 md:justify-end">
                <a href="#" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-95">
                  Apply Now
                </a>
                <a id="become-mentor" href="#" className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium shadow-md hover:bg-yellow-300">
                  Become a Mentor
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-8 pb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <p className="text-gray-600 mt-2">Everything you need to know about the program.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How are mentors selected?",
                a: "Every mentor is vetted for domain depth, teaching ability, and outcomes from previous cohorts.",
              },
              {
                q: "What is the time commitment?",
                a: "Typically 4–6 hours per week including live sessions, assignments, and reviews.",
              },
              {
                q: "Is there a certificate?",
                a: "Yes. You receive a verified certificate along with a portfolio of projects and reviews.",
              },
              {
                q: "Do you help with placements?",
                a: "Yes. We run interview prep, mock interviews, referrals, and hiring challenges with partners.",
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-5 border border-gray-100">
                <div className="font-semibold mb-1">{f.q}</div>
                <div className="text-gray-700">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}