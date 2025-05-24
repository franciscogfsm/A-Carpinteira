import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Wifi,
  Coffee,
  Tv,
  Snowflake,
  Utensils,
  Bath,
  Car,
  Trees,
  Waves,
  Mountain,
  Sun,
  Moon,
  Users,
  Home,
} from "lucide-react";
import Container from "../ui/Container";

const amenities = [
  {
    icon: <Waves size={28} />,
    title: "Private Lake Access",
    description:
      "Direct and private access to Castelo de Bode lake for swimming and relaxation.",
  },
  {
    icon: <Sun size={28} />,
    title: "Nature & Peace",
    description:
      "Surrounded by nature and silence for a truly peaceful retreat.",
  },
  {
    icon: <Car size={28} />,
    title: "Free Parking",
    description: "Secure parking space available for your vehicle.",
  },
  {
    icon: <Tv size={28} />,
    title: "Smart TV",
    description: "Stream your favorite shows and movies during your stay.",
  },
  {
    icon: <Wifi size={28} />,
    title: "Free WiFi",
    description:
      "High-speed internet throughout the house for your convenience.",
  },
  {
    icon: <Utensils size={28} />,
    title: "Full Kitchen",
    description:
      "Everything you need to prepare delicious meals with local ingredients.",
  },
  {
    icon: <Bath size={28} />,
    title: "Hot Water",
    description: "Enjoy the pleasure of taking an outside hot shower.",
  },
  {
    icon: <Coffee size={28} />,
    title: "Coffee Maker",
    description:
      "Start your day with a fresh cup of coffee from our fully equipped kitchen.",
  },
  {
    icon: <Users size={28} />,
    title: "Up to 7 Guests",
    description:
      "Comfortably accommodates families or groups of up to 7 guests.",
  },
  {
    icon: <Home size={28} />,
    title: "3 Bedrooms",
    description: "Two double rooms and a children's room with bunk beds.",
  },
  {
    icon: <Waves size={28} />,
    title: "SUP Canoe & Swimming",
    description:
      "Enjoy a canoe ride, a refreshing dip in the lake, or a peaceful stand-up paddle session anytime. Life vests provided for your safety.",
  },
];

const Amenities: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="amenities"
      className="section-padding bg-brown-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-wood-pattern opacity-5"></div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display mb-6">Amenities</h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-brown-700">
            A Carpinteira offers all the amenities you need for a perfect stay,
            combining modern comfort with rustic charm.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                },
              }}
              className="bg-cream-100 border border-brown-100 shadow-sm md:shadow-lg text-center flex flex-col justify-center items-center p-4 md:p-8 rounded-xl md:rounded-2xl min-h-[160px] md:min-h-[200px] transition-transform duration-200 hover:scale-105 hover:shadow-xl group"
            >
              <div className="flex items-center justify-center mb-2 md:mb-4">
                <span className="flex items-center justify-center w-9 h-9 md:w-16 md:h-16 rounded-full bg-green-100 text-green-800 text-xl md:text-3xl shadow group-hover:bg-green-200 transition-colors">
                  {amenity.icon}
                </span>
              </div>
              <h3 className="font-semibold text-base md:text-xl mb-1 md:mb-2 text-brown-900">
                {amenity.title}
              </h3>
              <p className="text-brown-700 text-xs md:text-base max-w-[90%] mx-auto">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Amenities;
