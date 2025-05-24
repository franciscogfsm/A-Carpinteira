import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Home, Utensils, Users, TreePine } from "lucide-react";
import Container from "../ui/Container";

const features = [
  {
    icon: <Home size={24} />,
    title: "Traditional House",
    description:
      "Built with traditional techniques and local woods, preserving the charm of the region.",
  },
  {
    icon: <Users size={24} />,
    title: "Up to 8 People",
    description:
      "Spacious and comfortable accommodations for the whole family or groups of friends.",
  },
  {
    icon: <Utensils size={24} />,
    title: "Full Kitchen",
    description:
      "Equipped with everything you need to prepare meals with local products.",
  },
  {
    icon: <TreePine size={24} />,
    title: "Nature",
    description:
      "Surrounded by stunning landscapes and fresh air, perfect for disconnecting.",
  },
];

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      className="section-padding bg-cream-50 scroll-mt-16 md:scroll-mt-24"
    >
      <Container>
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative mb-8 lg:mb-0">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="/Exterior3.avif"
                alt="Interior of A Carpinteira"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute left-0 right-0 -bottom-6 mx-auto w-11/12 sm:w-2/3 h-28 sm:h-32 bg-green-800 rounded-lg p-2 sm:p-4 text-cream-50 flex items-center justify-center shadow-lg">
              <p
                className="font-display italic text-center text-base sm:text-lg md:text-xl leading-relaxed text-cream-200 px-2 sm:px-4"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                  color: "#f8fafc",
                }}
              >
                "A perfect retreat to disconnect and appreciate the true essence
                essence of the purest Portuguese waters, Zêzere river"
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display mb-6">
                About
              </h2>
              <div className="w-20 h-1 bg-green-800 mb-8"></div>
              <p className="text-brown-700 mb-4 text-sm sm:text-base md:text-lg">
                A Carpinteira Lake House is an{" "}
                <span className="about-highlight">exclusive retreat</span> by
                the Castelo de Bode reservoir, with direct and{" "}
                <span className="about-highlight">private access</span> to the
                lake. Surrounded by nature and silence, the house offers a
                unique experience of{" "}
                <span className="about-highlight">peace and connection</span>{" "}
                with the water. Here, you can wake up to a view of the lake,
                take a sunrise swim, or simply relax by the water's edge — far
                from everything, yet close to what truly matters.
              </p>
              <p className="text-brown-700 mb-6 text-sm sm:text-base md:text-lg">
                The house is a cozy{" "}
                <span className="about-highlight">three-bedroom home</span>,
                featuring{" "}
                <span className="about-highlight">two double rooms</span> and a
                dedicated{" "}
                <span className="about-highlight">
                  children's room with bunk beds
                </span>
                , comfortably accommodating{" "}
                <span className="about-highlight">up to 7 guests</span>. It's
                ideal for families or groups of friends seeking comfort,
                privacy, and nature in perfect harmony.
              </p>
              <p className="text-brown-700 mb-8 text-sm sm:text-base md:text-lg">
                Perfect for those in search of{" "}
                <span className="about-highlight">absolute calm</span> — and for
                those who can't resist a{" "}
                <span className="about-highlight">canoe ride</span> or a{" "}
                <span className="about-highlight">
                  refreshing dip in the lake
                </span>
                .
              </p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-center"
              >
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={
                    inView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.7, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mb-2 text-2xl shadow">
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="6" y="10" width="16" height="10" rx="2" />
                      <path d="M6 10V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
                    </svg>
                  </span>
                  <span className="text-brown-900 font-semibold text-xs sm:text-sm text-center">
                    3 Bedrooms
                  </span>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={
                    inView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.7, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mb-2 text-2xl shadow">
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="14" cy="14" r="10" />
                      <text
                        x="14"
                        y="18"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#22543d"
                      >
                        7
                      </text>
                    </svg>
                  </span>
                  <span className="text-brown-900 font-semibold text-xs sm:text-sm text-center">
                    Up to 7 Guests
                  </span>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={
                    inView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.7, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mb-2 text-2xl shadow">
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 22V6a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v16" />
                      <path d="M7 22V10h10v12" />
                      <path d="M17 22V14h4v8" />
                    </svg>
                  </span>
                  <span className="text-brown-900 font-semibold text-xs sm:text-sm text-center">
                    Lake Access
                  </span>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={
                    inView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.7, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mb-2 text-2xl shadow">
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 20c2-2 6-2 8 0s6 2 8 0 6-2 8 0" />
                      <circle cx="14" cy="8" r="4" />
                    </svg>
                  </span>
                  <span className="text-brown-900 font-semibold text-xs sm:text-sm text-center">
                    SUP/Canoe/Swim
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <style>{`
          .about-feature-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            border-radius: 9999px;
            background: #DFEADF;
            color: #274027;
            font-size: 1.5rem;
            box-shadow: 0 2px 8px 0 rgba(39,64,39,0.08);
          }
          .about-highlight {
            color: #7c5a2d;
            font-weight: 600;
            background: linear-gradient(90deg,rgba(124,90,45,0.08),rgba(255,255,255,0));
            border-radius: 0.25em;
            padding: 0 0.1em;
          }
        `}</style>
      </Container>
    </section>
  );
};

export default About;
