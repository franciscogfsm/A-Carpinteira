import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin } from "lucide-react";
import Container from "../ui/Container";

const attractions = [
  {
    name: "Tomar Castle",
    distance: "5 km",
    description:
      "Historic Templar castle and convent, a UNESCO World Heritage site.",
  },
  {
    name: "Almourol Castle",
    distance: "15 km",
    description: "Medieval castle on an island in the Tagus River.",
  },
  {
    name: "Fátima Sanctuary",
    distance: "20 km",
    description:
      "One of the most important Catholic pilgrimage sites in the world.",
  },
  {
    name: "Batalha Monastery",
    distance: "35 km",
    description: "Gothic masterpiece and UNESCO World Heritage site.",
  },
];

const Location: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="location" className="section-padding bg-cream-50">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display mb-6">Location</h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-brown-700">
            Strategically located in the outskirts of Tomar, A Carpinteira
            offers the tranquility of the countryside with easy access to the
            region's attractions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="flex items-center h-full"
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-green-200 min-h-[320px] lg:min-h-[440px] flex items-center justify-center">
              <iframe
                title="A Carpinteira Location Map"
                src="https://www.google.com/maps?q=A+Carpinteira,+Tomar,+Portugal&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[220px] rounded-xl border-0"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-cream-100 rounded-xl shadow-xl p-7 flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-[220px]">
                <h3 className="text-2xl font-display mb-6">
                  Nearby Attractions
                </h3>
                <div className="space-y-6">
                  {attractions.map((attraction, index) => (
                    <div
                      key={index}
                      className="bg-cream-50 rounded-lg p-5 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg">
                          {attraction.name}
                        </h4>
                        <span className="text-sm bg-green-800 text-cream-50 px-2 py-1 rounded-full">
                          {attraction.distance}
                        </span>
                      </div>
                      <p className="text-brown-700 text-sm">
                        {attraction.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[180px]">
                <h3 className="text-xl font-display mb-3">Distances</h3>
                <ul className="space-y-2 bg-green-100 p-5 rounded-lg shadow">
                  <li className="flex justify-between">
                    <span>Lisbon:</span>
                    <span>130 km</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Porto:</span>
                    <span>200 km</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fátima:</span>
                    <span>20 km</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Nearest beach:</span>
                    <span>80 km</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lisbon Airport:</span>
                    <span>140 km</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Location;
