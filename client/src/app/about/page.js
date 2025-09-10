"use client"

import Image from "next/image"
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import { motion, useScroll, useTransform } from "framer-motion"

// Inline scroll progress bar (no extra file)
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 h-1 bg-yellow-500 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Animation helpers
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
})

const fade = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, delay } },
})

export default function AboutPage() {
  // Subtle hero parallax
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40])

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="bg-[#fcf6f1] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            className="text-center relative"
            style={{ y: heroY }}
            initial="hidden"
            animate="show"
            variants={fade()}
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/35 rounded-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                variants={fadeUp(0.05)}
              >
                Helping{" "}
                <span className="text-yellow-500 relative inline-block group transform-gpu transition-transform duration-300 hover:scale-[1.02]">
                  Ambitious Students
                  <span
                    aria-hidden="true"
                    className="absolute left-0 bottom-2 w-full h-3  group-hover:scale-x-[1.08]"
                  />
                </span>{" "}
                Thrive Beyond the Classroom
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
                variants={fadeUp(0.15)}
              >
                We connect education with the professional world by linking learners to mentors,
                practical experiences, and career-defining advice through guided mentorship and genuine dialogues.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY CARDS */}
      <section className="py-16 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mentorship Journey",
                description:
                  "We began with a single vision: make structured, empathetic mentorship accessible and impactful for every student—regardless of background or starting point.",
                image: "/about/mentorshipjourney.jpg",
                tag: "Collaboration",
              },
              {
                title: "Growth & Guidance",
                description:
                  "We curate mentors who inspire, challenge, and guide—turning uncertainty into clarity with practical advice, curated resources, and goal tracking.",
                image: "/about/growthguidance.jpg",
                tag: "Growth",
              },
              {
                title: "Unsaid Talks",
                description:
                  "Real conversations and shared experiences: a safe space for questions that often go unasked—building confidence, resilience, and community.",
                image: "/about/unsaidtalks.jpg",
                tag: "Dialogue",
              },
            ].map((card, idx) => (
              <motion.article
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform-gpu hover:-translate-y-2 hover:ring-1 hover:ring-yellow-200/70"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp(idx * 0.08)}
              >
                <figure className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <figcaption className="absolute top-3 left-3 bg-black/55 group-hover:bg-black/70 text-white px-3 py-1 rounded-lg text-xs uppercase font-semibold tracking-wider backdrop-blur-sm transition-colors duration-200">
                    {card.tag}
                  </figcaption>
                </figure>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-2xl"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0.05)}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Better Ways</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We focus on meaningful progress over perfection. Our approach blends mentor insight,
                student feedback, and data-driven iteration to create sustained academic and career impact.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                From career exploration and portfolio reviews to soft‑skill development and peer accountability groups,
                we help students move from learning to doing with confidence.
              </p>
              <a
                href="/impact"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold text-lg group transition-colors duration-200"
              >
                Learn more about our mentorship impact
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Go to impact page</span>
              </a>
            </motion.div>
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0.15)}
            >
              <div className="aspect-[16/11] rounded-2xl overflow-hidden shadow-xl group relative">
                <Image
                  src="/about/BetterWays.jpg"
                  alt="Mentor guiding student"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="pointer-events-none absolute inset-0 ring-0 group-hover:ring-1 ring-yellow-200/60 rounded-2xl transition-all duration-300"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORIES SECTION */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0.05)}
            >
              Mentorship Moments & Stories
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0.12)}
            >
              Discover how guidance, peer support, and honest conversations are reshaping student journeys
              and unlocking long‑term success.
            </motion.p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Peer Mentorship Is Redefining Student Success",
                description:
                  "Collaborative learning accelerates confidence. Students retain more when they teach, share, and challenge ideas together.",
                date: "June 09, 2025",
                image: "/about/peermentorship.jpg",
                link: "/stories/peer-mentorship",
              },
              {
                title: "Turning Feedback Into Real Career Momentum",
                description:
                  "Structured review cycles translate theory into portfolio‑ready outcomes while building professional communication skills.",
                date: "June 24, 2025",
                image: "/about/feedbackmomentum.jpg",
                link: "/stories/feedback-momentum",
              },
              {
                title: "Workshops That Bridge Education and Industry",
                description:
                  "Interactive sessions demystify tools, roles, and expectations—helping students build industry fluency early.",
                date: "June 06, 2025",
                image: "/about/workshps.jpg",
                link: "/stories/workshops",
              },
            ].map((story, idx) => (
              <motion.article
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform-gpu hover:-translate-y-2 ring-1 ring-transparent hover:ring-yellow-200/70"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp(idx * 0.08)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <time className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                    {story.date}
                  </time>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-yellow-600 transition-colors duration-200">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{story.description}</p>
                  <a
                    href={story.link}
                    className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-semibold text-sm uppercase tracking-wider relative group/link"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-600 group-hover/link:w-full transition-all duration-300"></span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp(0.05)}
            >
              Our Impact
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Students Mentored", icon: "👥" },
              { number: "50+", label: "Industry Experts", icon: "🎯" },
              { number: "30+", label: "University Partners", icon: "🏫" },
              { number: "92%", label: "Placement Success", icon: "📈" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-1 hover:bg-gradient-to-br from-white to-yellow-50/60"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp(idx * 0.08)}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-white to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(0.05)}
          >
            Join Our Mentorship Community
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(0.12)}
          >
            Whether you're seeking guidance or ready to mentor others, become part of a community
            that's transforming education through meaningful connections.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(0.18)}
          >
            <button className="relative overflow-hidden group px-10 py-4 bg-yellow-400 text-black rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-200 shadow-xl hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2">
              <span className="relative z-10">Find a Mentor</span>
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-2 ring-yellow-200/70 transition-all duration-300"></span>
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/40 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700"></span>
            </button>
            <button className="relative overflow-hidden group px-10 py-4 bg-white text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-200 border-2 border-gray-200 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2">
              <span className="relative z-10">Become a Mentor</span>
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-2 ring-yellow-200/70 transition-all duration-300"></span>
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-yellow-200/30 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700"></span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}