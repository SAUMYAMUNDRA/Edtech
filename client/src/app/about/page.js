"use client"

import Image from "next/image"
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation"

// Inline scroll progress bar
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
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40])

  const testimonials = [
    {
      id: 'amit',
      text: "The mentorship program was a game-changer. I cracked my dream job interview thanks to the LearnComet mentors.",
      name: "Amit Kumar",
      role: "Software Engineer, Google",
      avatar: "👨‍💻"
    },
    {
      id: 'sneha', 
      text: "Hands-on projects gave me real confidence in coding. The mentors are very supportive!",
      name: "Sneha Verma",
      role: "Backend Developer, Amazon",
      avatar: "👩‍💻"
    },
    {
      id: 'ravi',
      text: "LearnComet bridges the gap between theory and practice. Truly a career accelerator!",
      name: "Ravi Singh", 
      role: "Full Stack Dev, Microsoft",
      avatar: "👨‍🎓"
    }
  ];

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
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/35 rounded-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                variants={fadeUp(0.05)}
              >
                Helping{" "}
                <span className="text-yellow-500 relative inline-block group transform-gpu transition-transform duration-300 hover:scale-[1.02]">
                  Ambitious Students
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

      {/* FOUNDER SECTION */}
      <section className="py-24 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-16 items-start"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(0.05)}
          >
            {/* LEFT: FOUNDER IMAGE */}
            <div className="relative w-full aspect-[4/4] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/about/founder.jpg"
                alt="Founder of LearnComet"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 via-transparent to-transparent p-6">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg w-fit">
                  <h3 className="text-lg font-bold text-gray-900">Harshit Verma</h3>
                  <p className="text-sm text-gray-600">Founder & CEO, LearnComet</p>
                </div>
              </div>
            </div>

            {/* RIGHT: STORY CONTENT */}
            <div>
              <motion.h2
                className="text-4xl font-bold text-gray-900 mb-6"
                variants={fadeUp(0.1)}
              >
                Our Founder
              </motion.h2>

              <motion.div
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
                variants={fadeUp(0.15)}
              >
                <p>
                  <span className="font-semibold text-gray-900">Harshit Verma</span> is the engine behind
                  our mission to reinvent how India learns technology. With a BCA from IP University and
                  an MCA from JNU, he blends solid tech fundamentals with a passion for building scalable,
                  future-ready learning experiences.
                </p>

                <p>
                  With over <span className="font-semibold text-gray-900">10 years of experience</span> in
                  operations, delivery, and high-impact projects across top MNCs, Harshit has seen
                  firsthand how rapidly the tech landscape evolves—while traditional education often
                  struggles to keep up.
                </p>

                <p>
                  Before starting LearnComet, he led as <span className="font-semibold text-gray-900">
                    Academic Head at SkyTech Academy
                  </span>, shaping industry-aligned programs that trained IT professionals in today’s most
                  in-demand skills:
                </p>

                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-800 list-disc pl-5">
                  <li>Azure & AWS</li>
                  <li>Cyber Security</li>
                  <li>DevOps</li>
                  <li>CCNA & CCNP</li>
                  <li>PMP</li>
                  <li>AI, ML & AIML</li>
                  <li>Agile & Scrum</li>
                  <li>Data Warehousing</li>
                </ul>

                <p className="italic border-l-4 border-yellow-400 pl-4 text-gray-800">
                  “Fast, practical, industry-aligned. No fluff. No outdated curriculum. Just the skills
                  that matter.”
                </p>

                <p>
                  Harshit founded this EdTech venture with one clear goal — to build a learning ecosystem
                  that makes people <span className="font-semibold text-gray-900">career-ready</span>, not
                  someday, but now. And under his leadership, that’s exactly what we’re delivering.
                </p>
              </motion.div>
            </div>
          </motion.div>
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
                From career exploration and portfolio reviews to tech development and peer accountability groups,
                we help students move from learning to doing with confidence.
              </p>
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
                  src="https://media.istockphoto.com/id/533241382/vector/mentoring-chart-with-keywords-and-icons-sketch.jpg?s=612x612&w=0&k=20&c=jrmrfgr8bVFD54ORCkgzt5GpldwHVxvQiwl8g1tOUGA="
                  alt="Mentorship concept illustration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-14">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(0.05)}
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(0.12)}
          >
            Real stories from learners who’ve grown their skills and confidence through LearnComet.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 lg:px-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="p-6 rounded-xl bg-white shadow hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-white transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-xl"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-600 mb-4 italic relative group-hover:text-gray-700 transition-colors duration-300">
                  <span className="text-4xl text-yellow-400 absolute -top-2 -left-2 opacity-50">"</span>
                  {testimonial.text}
                  <span className="text-4xl text-yellow-400 absolute -bottom-2 -right-2 opacity-50">"</span>
                </p>
                <h4 className="font-semibold group-hover:text-yellow-700 transition-colors duration-300">
                  {testimonial.name}
                </h4>
                <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  {testimonial.role}
                </span>
              </div>
            </motion.div>
          ))}
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
            <button
              onClick={() => router.push("/mentorship/apply")}
              className="relative overflow-hidden group px-10 py-4 bg-yellow-400 text-black rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-200 shadow-xl hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
            >
              <span className="relative z-10">Find a Mentor</span>
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-2 ring-yellow-200/70 transition-all duration-300"></span>
            </button>

            <button
              onClick={() => router.push("/mentorship")}
              className="relative overflow-hidden group px-10 py-4 bg-white text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-200 border-2 border-gray-200 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
            >
              <span className="relative z-10">Become a Mentor</span>
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-2 ring-yellow-200/70 transition-all duration-300"></span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
