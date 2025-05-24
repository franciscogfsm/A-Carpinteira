import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin } from "lucide-react";
import Container from "../ui/Container";

const attractions = [
  {
    name: "Tomar Castle",
    distance: "25 km",
    description:
      "Historic Templar castle and convent, a UNESCO World Heritage site.",
  },
  {
    name: "Almourol Castle",
    distance: "23 km",
    description: "Medieval castle on an island in the Tagus River.",
  },
  {
    name: "Fátima Sanctuary",
    distance: "73 km",
    description:
      "One of the most important Catholic pilgrimage sites in the world.",
  },
  {
    name: "Batalha Monastery",
    distance: "74 km",
    description: "Gothic masterpiece and UNESCO World Heritage site.",
  },
  {
    name: "Aldeia do Mato Fluvial Beach",
    distance: "4 km",
    description:
      "Nearest fluvial beach, perfect for swimming and relaxing by the water.",
  },
  {
    name: "Praia fluvial de Fontes",
    distance: "19 km",
    description: "Beautiful river beach with great facilities.",
  },
  {
    name: "Praia fluvial Penedo Furado (Vila de Rei)",
    distance: "19 km",
    description: "Scenic river beach with unique rock formations.",
  },
  {
    name: "Abrantes",
    distance: "19 km",
    description: "Historic city with a castle and vibrant center.",
  },
  {
    name: "Constância",
    distance: "19 km",
    description:
      "Charming riverside village at the confluence of the Zêzere and Tagus rivers.",
  },
  {
    name: "Castelo Almourol",
    distance: "23 km",
    description: "Medieval castle on an island in the Tagus River.",
  },
  {
    name: "Castelo de Bode Dam Wall",
    distance: "10 km",
    description: "Impressive dam wall of the Castelo de Bode reservoir.",
  },
];

const Location: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openAttraction, setOpenAttraction] = React.useState<number | null>(
    null
  );

  // Show only one item at a time
  const CARD_SIZE = 350; // px
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [direction, setDirection] = React.useState(0); // -1 for left, 1 for right

  // Animation variants for sliding
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  // Auto-scroll (infinite)
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleScroll(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, carouselIndex]);

  const handleScroll = (dir: number) => {
    setDirection(dir);
    setCarouselIndex(
      (prev) => (prev + dir + attractions.length) % attractions.length
    );
  };
  const scrollLeft = () => handleScroll(-1);
  const scrollRight = () => handleScroll(1);

  return (
    <section
      id="location"
      className="section-padding bg-cream-50 flex flex-col items-center px-2 sm:px-4"
    >
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
            Location
          </h2>
          <div className="w-24 h-1 bg-green-800 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-brown-700 text-lg md:text-xl">
            Bairro Cimeiro, Aldeia do Mato.
          </p>
        </motion.div>

        {/* Top box: Attractions and Distances */}
        <div className="w-full max-w-5xl mx-auto bg-cream-100 rounded-xl shadow-xl p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 mb-10">
          {/* Nearby Attractions */}
          <div className="flex-1 min-w-0 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-green-200 mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-display mb-2">
              Nearby Attractions
            </h3>
            <p className="text-brown-700 mb-4 text-sm md:text-base">
              Discover the best spots to visit around Aldeia do Mato.
            </p>
            <div
              id="nearby-attractions-carousel"
              className="relative w-full flex justify-center items-center min-h-[220px] sm:min-h-[300px] mb-8 overflow-hidden"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={carouselIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 2, 0.6, 1] }}
                  className={
                    "flex flex-col items-center justify-center bg-cream-50/80 border border-green-100 rounded-2xl shadow-xl text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 mx-auto backdrop-blur-md px-2 py-4 w-full max-w-[340px] min-w-0 h-auto"
                  }
                  style={{
                    aspectRatio: "1 / 1",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
                    border: "1.5px solid rgba(34, 139, 34, 0.10)",
                    background:
                      "linear-gradient(135deg, #f8faf5cc 60%, #e6f2e0cc 100%)",
                  }}
                >
                  <span className="inline-block mb-2 text-green-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-3.866 0-7 1.343-7 3v2a1 1 0 001 1h12a1 1 0 001-1v-2c0-1.657-3.134-3-7-3z"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-lg sm:text-xl md:text-2xl text-brown-900 mb-2 break-words text-center w-full">
                    {attractions[carouselIndex].name}
                  </span>
                  <span className="block text-brown-700 text-sm sm:text-base md:text-lg mb-4 mt-1 px-2 max-w-xs opacity-80 break-words text-center w-full">
                    {attractions[carouselIndex].description}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg font-semibold bg-green-700 text-cream-50 px-4 py-2 rounded-xl mt-4">
                    {attractions[carouselIndex].distance}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Distances */}
          <div className="flex-1 min-w-0 w-full max-w-[400px] mx-auto pt-2 md:pt-0 md:pl-8">
            <h3 className="text-2xl md:text-3xl font-display mb-4">
              Distances
            </h3>
            <ul className="bg-green-100 border border-green-200 p-4 sm:p-6 rounded-lg shadow-md text-brown-900 w-full overflow-x-auto text-wrap grid gap-y-2">
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Lisbon:</span>
                <span className="text-right whitespace-nowrap">150 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Porto:</span>
                <span className="text-right whitespace-nowrap">156 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Fátima:</span>
                <span className="text-right whitespace-nowrap">73 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Aldeia do Mato Fluvial Beach:</span>
                <span className="text-right whitespace-nowrap">4 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Praia fluvial de Fontes:</span>
                <span className="text-right whitespace-nowrap">19 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Praia fluvial Penedo Furado (Vila de Rei):</span>
                <span className="text-right whitespace-nowrap">19 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Abrantes:</span>
                <span className="text-right whitespace-nowrap">19 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Constância:</span>
                <span className="text-right whitespace-nowrap">19 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Castelo Almourol:</span>
                <span className="text-right whitespace-nowrap">23 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Castelo de Bode Dam Wall:</span>
                <span className="text-right whitespace-nowrap">10 km</span>
              </li>
              <li className="grid grid-cols-[1fr_auto] gap-x-4">
                <span>Lisbon Airport:</span>
                <span className="text-right whitespace-nowrap">144 km</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Map below */}
        <div className="w-full max-w-5xl mx-auto mt-4">
          <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-green-200 w-full min-h-[250px] sm:min-h-[350px] h-[40vw] max-h-[400px] flex items-center justify-center">
            <iframe
              title="A Carpinteira Location Map"
              src="https://www.google.com/maps?q=Aldeia+do+Mato,+Portugal&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[250px] sm:min-h-[350px] rounded-xl border-0"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Location;
