import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import Container from "../ui/Container";

const Hero: React.FC = () => {
  // Typewriter effect for main heading
  const fullText = `Discover the rustic charm of our house in Castelo de Bode`;
  const highlight = "our house in Castelo de Bode";
  const [displayed, setDisplayed] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (displayed < fullText.length) {
      intervalRef.current = window.setTimeout(
        () => setDisplayed(displayed + 1),
        28
      );
    } else {
      setDone(true);
    }
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [displayed, fullText.length]);

  // Smooth scroll to About section
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const y = aboutSection.getBoundingClientRect().top + window.scrollY - 1; // Offset for earlier appearance
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scroll-triggered animation for subtitle/buttons
  const subtitleRef = useRef(null);
  const subtitleInView = useInView(subtitleRef, {
    margin: "-100px",
    once: false,
  });
  const buttonsRef = useRef(null);
  const buttonsInView = useInView(buttonsRef, {
    margin: "-100px",
    once: false,
  });

  // Scroll-triggered animation for arrow/learn more
  const arrowRef = useRef(null);
  const arrowInView = useInView(arrowRef, { margin: "-100px", once: false });

  // Helper to split and highlight
  const getTypedText = () => {
    const typed = fullText.slice(0, displayed);
    const idx = typed.indexOf(highlight);
    if (idx === -1) return typed;
    return (
      <>
        {typed.slice(0, idx)}
        <span className="text-cream-300">
          {typed.slice(idx, idx + highlight.length)}
        </span>
        {typed.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-cream-50 bg-brown-900 overflow-x-hidden overflow-y-hidden w-full px-2 pt-8 pb-16 sm:pt-16 sm:pb-24"
    >
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full"
        style={{
          backgroundImage: "url('/casa fora 2 .avif')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 sm:bg-opacity-60 backdrop-blur-sm w-full h-full"></div>
      </div>

      <Container className="relative z-10 flex flex-col justify-center items-center w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="mb-6 w-full flex flex-col items-center">
            <h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-cream-50 leading-tight text-center max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
              style={{ lineHeight: 1.15 }}
            >
              <span className="inline-block typewriter-main">
                {getTypedText()}
                <span
                  className={`typewriter-caret ${
                    done ? "opacity-0" : "opacity-100"
                  }`}
                >
                  |
                </span>
              </span>
            </h1>
            <style>{`
              .typewriter-main {
                min-height: 1.2em;
                letter-spacing: 0.01em;
              }
              .typewriter-caret {
                display: inline-block;
                width: 1ch;
                animation: blink-caret 0.7s step-end infinite;
                transition: opacity 0.2s;
              }
              @keyframes blink-caret {
                from, to { opacity: 0 }
                50% { opacity: 1; }
              }
            `}</style>
          </div>

          <motion.div
            ref={subtitleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-lg xs:text-xl md:text-2xl lg:text-3xl font-display font-normal text-cream-50 mb-8 text-center max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl drop-shadow-lg">
              An authentic Portuguese experience in a traditional wooden country
              house, perfect for unforgettable holidays.
            </h2>
          </motion.div>

          <motion.div
            ref={buttonsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              buttonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ delay: 0.4, duration: 0.7 }}
            className="w-full flex flex-col sm:flex-row flex-wrap gap-3 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl justify-center items-center"
          >
            <div className="hero-btn-group hero-btn-single">
              <a href="#contact" className="hero-btn-modern">
                CHECK AVAILABILITY
                <span className="hero-btn-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="9" x2="14" y2="9" />
                    <polyline points="10 5 14 9 10 13" />
                  </svg>
                </span>
              </a>
            </div>
            <motion.button
              className="hero-arrow-btn"
              onClick={handleScrollToAbout}
              aria-label="Scroll to next section"
              animate={{
                y: [0, 10, 0],
                boxShadow: [
                  "0 2px 8px 0 rgba(0,0,0,0.10)",
                  "0 8px 24px 0 rgba(0,0,0,0.13)",
                  "0 2px 8px 0 rgba(0,0,0,0.10)",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hero-arrow-svg"
              >
                <polyline points="10 14 16 20 22 14" stroke="#fff" />
              </svg>
            </motion.button>
            <style>{`
              .hero-btn-group {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.1em;
                justify-content: center;
                margin-bottom: 1.7em;
              }
              .hero-btn-single {
                width: 100%;
                max-width: 420px;
                margin-left: auto;
                margin-right: auto;
              }
              .hero-btn-modern {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 1.05rem;
                font-weight: 500;
                color: #fff;
                background: linear-gradient(120deg, rgba(124,90,45,0.18) 0%, rgba(255,255,255,0.08) 100%);
                border: 1px solid rgba(255,255,255,0.25);
                border-radius: 0.8em;
                padding: 0.7em 1.7em;
                margin: 0;
                box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10), 0 1px 2px 0 rgba(255,255,255,0.10) inset;
                backdrop-filter: blur(6px);
                transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.13s;
                text-decoration: none;
                letter-spacing: 0.04em;
                cursor: pointer;
                white-space: nowrap;
                text-transform: uppercase;
                width: 100%;
                max-width: 420px;
              }
              .hero-btn-modern:hover, .hero-btn-modern:focus {
                background: linear-gradient(120deg, rgba(124,90,45,0.32) 0%, rgba(255,255,255,0.16) 100%);
                color: #fff;
                box-shadow: 0 8px 32px 0 rgba(124,90,45,0.18), 0 1px 2px 0 rgba(255,255,255,0.13) inset;
                transform: translateY(-2px) scale(1.04);
                border-color: rgba(255,255,255,0.38);
              }
              .hero-btn-icon {
                margin-left: 0.7em;
                font-size: 1em;
                display: inline-block;
                transition: transform 0.18s, background 0.18s;
                opacity: 0.8;
                border-radius: 50%;
                padding: 0.15em;
              }
              .hero-btn-modern:hover .hero-btn-icon {
                transform: translateX(5px) scale(1.08);
                background: rgba(255,255,255,0.10);
                opacity: 1;
              }
              .hero-arrow-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 2.5em auto 0 auto;
                background: transparent;
                border: none;
                border-radius: 50%;
                width: 48px;
                height: 48px;
                cursor: pointer;
                transition: background 0.15s, transform 0.15s;
                outline: none;
                padding: 0;
              }
              .hero-arrow-svg {
                display: block;
                stroke: #fff;
                opacity: 0.85;
                transition: transform 0.18s, opacity 0.18s;
                width: 32px;
                height: 32px;
              }
              .hero-arrow-btn:hover .hero-arrow-svg, .hero-arrow-btn:focus .hero-arrow-svg {
                transform: translateY(3px) scale(1.13);
                opacity: 1;
              }
              @media (min-width: 768px) {
                .hero-arrow-btn {
                  margin-top: 3.5em;
                  width: 64px;
                  height: 64px;
                  display: none; /* Hide arrow on desktop */
                }
                .hero-arrow-svg {
                  width: 44px;
                  height: 44px;
                }
              }
              @media (max-width: 639px) {
                .hero-btn-single {
                  max-width: 100%;
                }
                .hero-btn-modern {
                  width: 100%;
                  max-width: 100%;
                  justify-content: center;
                }
              }
            `}</style>
          </motion.div>

          {/* Desktop scroll hint */}
          <div className="hero-scroll-hint">
            <span className="scroll-text">Scroll down to discover more</span>
          </div>
          <style>{`
            .hero-scroll-hint {
              display: none;
              justify-content: center;
              align-items: center;
              width: 100%;
              margin-top: 2.5em;
            }
            .scroll-text {
              font-size: 1.15rem;
              color: #fff;
              opacity: 0.85;
              letter-spacing: 0.03em;
              font-family: 'Raleway', sans-serif;
              animation: scroll-fade-move 2.2s infinite;
              transition: opacity 0.2s;
              text-shadow: 0 2px 8px rgba(0,0,0,0.18);
            }
            @keyframes scroll-fade-move {
              0% { opacity: 0.5; transform: translateY(8px); }
              20% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0.5; transform: translateY(8px); }
            }
            @media (min-width: 768px) {
              .hero-scroll-hint {
                display: flex;
              }
            }
            @media (max-width: 767px) {
              .hero-scroll-hint {
                display: none;
              }
            }
          `}</style>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
