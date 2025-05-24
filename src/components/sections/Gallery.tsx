import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: "/Exterior1.avif",
    alt: "House exterior front view",
    category: "exterior",
  },
  {
    id: 2,
    src: "/Exterior2.avif",
    alt: "House exterior side view",
    category: "exterior",
  },
  {
    id: 3,
    src: "/Exterior3.avif",
    alt: "House exterior garden",
    category: "exterior",
  },
  {
    id: 4,
    src: "/Exterior4.avif",
    alt: "House exterior patio",
    category: "exterior",
  },
  {
    id: 5,
    src: "/Exterior5.avif",
    alt: "House exterior entrance",
    category: "exterior",
  },
  {
    id: 6,
    src: "/ExteriorRio.avif",
    alt: "River view from property",
    category: "exterior",
  },
  {
    id: 7,
    src: "/casa fora.avif",
    alt: "House outside view",
    category: "exterior",
  },
  {
    id: 8,
    src: "/casa fora 2 .avif",
    alt: "House outside alternate view",
    category: "exterior",
  },
  { id: 9, src: "/barraca.avif", alt: "Garden shed", category: "lake" },
  {
    id: 10,
    src: "/DucheFora.avif",
    alt: "Outdoor shower",
    category: "exterior",
  },
  {
    id: 11,
    src: "/Sala1.avif",
    alt: "Living room with window",
    category: "interior",
  },
  {
    id: 12,
    src: "/Sala2.avif",
    alt: "Rustic kitchen area",
    category: "kitchen",
  },
  {
    id: 12.1,
    src: "/Sala2.avif",
    alt: "Rustic kitchen area",
    category: "interior",
    key: "Sala2-interior",
  },
  {
    id: 13,
    src: "/Sala3.avif",
    alt: "Living area with sofa",
    category: "interior",
  },
  { id: 14, src: "/Sala4.avif", alt: "Dining area", category: "interior" },
  {
    id: 15,
    src: "/Sala5.avif",
    alt: "Living room alternate view",
    category: "interior",
  },
  {
    id: 17,
    src: "/Quarto 2.avif",
    alt: "Second bedroom",
    category: "bedrooms",
  },
  {
    id: 21.1,
    src: "/Casa de Banho3.avif",
    alt: "Third bathroom",
    category: "bedrooms",
    key: "Casa de Banho3-bedrooms",
  },
  { id: 18, src: "/Quarto3.avif", alt: "Third bedroom", category: "bedrooms" },
  {
    id: 19,
    src: "/Casa de banho1.avif",
    alt: "Bathroom with sink and mirror",
    category: "bathrooms",
  },
  {
    id: 20,
    src: "/Casa de banho2.avif",
    alt: "Second bathroom",
    category: "bathrooms",
  },
  {
    id: 21,
    src: "/Casa de Banho3.avif",
    alt: "Third bathroom",
    category: "bathrooms",
  },
  {
    id: 22,
    src: "/banco.avif",
    alt: "Bench in the garden",
    category: "lake",
  },
  {
    id: 23,
    src: "/Rede.avif",
    alt: "Hammock in the garden",
    category: "exterior",
  },
  { id: 24, src: "/rio1.avif", alt: "River view 1", category: "lake" },
  {
    id: 25,
    src: "/cozinha1.jpeg",
    alt: "Kitchen view 1",
    category: "kitchen",
  },
  {
    id: 29,
    src: "/cozinha2.jpeg",
    alt: "Kitchen view 2",
    category: "kitchen",
  },
  {
    id: 30,
    src: "/rio4.jpeg",
    alt: "River and paddleboard access",
    category: "lake",
  },
  {
    id: 31,
    src: "/exterior5.jpeg",
    alt: "Path to the shed with wildflowers",
    category: "lake",
  },
  {
    id: 32,
    src: "/exterior6.jpeg",
    alt: "Shed with paddleboards and life jackets inside",
    category: "exterior",
  },
  { id: 26, src: "/rio2.avif", alt: "River view 2", category: "lake" },
  { id: 27, src: "/rio3.avif", alt: "River view 3", category: "lake" },
  { id: 28, src: "/quarto4.jpeg", alt: "Fourth bedroom", category: "bedrooms" },
];

// Categories for filtering
const categories = [
  { id: "all", name: "All" },
  { id: "lake", name: "Lake" },
  { id: "exterior", name: "Exterior" },
  { id: "interior", name: "Interior" },
  { id: "bedrooms", name: "Bedrooms" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bathrooms", name: "Bathrooms" },
];

const MAX_INDICATORS = 7;

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  // Reset carousel index and scroll to start when category changes
  useEffect(() => {
    setCurrentIdx(0);
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [activeCategory]);

  // Preload first image
  useEffect(() => {
    if (filteredImages[0]) {
      const img = new window.Image();
      img.src = filteredImages[0].src;
    }
  }, [filteredImages]);

  // Auto-scroll nudge on first load (once per session)
  useEffect(() => {
    if (window.sessionStorage.getItem("galleryNudged")) return;
    const el = scrollContainerRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      const original = el.scrollLeft;
      el.scrollTo({ left: 60, behavior: "smooth" });
      setTimeout(() => {
        el.scrollTo({ left: original, behavior: "smooth" });
        window.sessionStorage.setItem("galleryNudged", "1");
      }, 600);
    }
  }, []);

  // Hide swipe hint on user scroll/touch
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const hide = () => setShowSwipeHint(false);
    el.addEventListener("touchstart", hide, { once: true });
    el.addEventListener("wheel", hide, { once: true });
    el.addEventListener("mousedown", hide, { once: true });
    return () => {
      el.removeEventListener("touchstart", hide);
      el.removeEventListener("wheel", hide);
      el.removeEventListener("mousedown", hide);
    };
  }, []);

  // Carousel navigation
  const goTo = (idx: number) => {
    if (isAnimating || idx < 0 || idx >= filteredImages.length) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
    setCurrentIdx(idx);
    // Only programmatically scroll on desktop (not touch devices)
    if (window.innerWidth >= 768) {
      const el = scrollContainerRef.current;
      if (el) {
        const child = el.children[idx] as HTMLElement;
        if (child) {
          child.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }
    }
  };
  const goNext = () => goTo(currentIdx + 1);
  const goPrev = () => goTo(currentIdx - 1);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) goNext();
      else if (diff < -50) goPrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Indicator logic (max 7 dots, ellipsis if needed)
  const getIndicators = () => {
    const total = filteredImages.length;
    if (total <= MAX_INDICATORS) {
      return filteredImages.map((_, i) => ({ idx: i, ellipsis: false }));
    }
    let start = Math.max(0, currentIdx - Math.floor(MAX_INDICATORS / 2));
    let end = start + MAX_INDICATORS;
    if (end > total) {
      end = total;
      start = end - MAX_INDICATORS;
    }
    const indicators = [];
    for (let i = start; i < end; i++) {
      indicators.push({ idx: i, ellipsis: false });
    }
    if (start > 0) indicators[0] = { idx: 0, ellipsis: true };
    if (end < total)
      indicators[MAX_INDICATORS - 1] = { idx: total - 1, ellipsis: true };
    return indicators;
  };

  return (
    <section
      id="gallery"
      className="section-padding bg-brown-50 overflow-x-hidden"
    >
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display mb-6">Gallery</h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-brown-700">
            Explore every corner of our house through this gallery of images and
            imagine yourself enjoying unforgettable moments at A Carpinteira.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-green-800 text-cream-50"
                  : "bg-brown-100 text-brown-800 hover:bg-brown-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative w-full flex flex-col items-center">
          <div
            className="w-full flex justify-center items-center"
            style={{ minHeight: "220px", maxWidth: "100vw" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Arrow */}
            {filteredImages.length > 1 && (
              <button
                className="hidden md:flex absolute left-2 z-20 items-center justify-center bg-brown-100 hover:bg-brown-200 text-brown-800 rounded-full w-10 h-10 shadow transition-colors disabled:opacity-40 disabled:pointer-events-none"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                onClick={goPrev}
                disabled={currentIdx === 0}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
            )}
            {/* Carousel Images */}
            <div
              ref={scrollContainerRef}
              className="gallery-scroll flex gap-6 overflow-x-auto w-full max-w-[1000px] snap-x snap-mandatory px-2 relative"
              style={{ scrollBehavior: "smooth" }}
            >
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.key || img.src}
                  className="relative aspect-square w-[90vw] max-w-[520px] sm:max-w-[700px] md:max-w-[900px] rounded-2xl overflow-hidden bg-brown-200 shadow-lg flex items-center justify-center snap-center flex-shrink-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  onClick={() => setSelectedImage(img.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                    draggable={false}
                    style={{ userSelect: "none" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-4 pointer-events-none">
                    <span className="text-cream-50 text-lg font-medium drop-shadow-lg">
                      {img.alt}
                    </span>
                  </div>
                </motion.div>
              ))}
              {/* Swipe hint animation */}
              {showSwipeHint && (
                <div className="pointer-events-none absolute left-1/2 bottom-6 -translate-x-1/2 z-40 select-none">
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], x: [0, 24, 32, 48] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                    className="flex flex-col items-center"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="#222"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-md"
                    >
                      <path d="M16 6v16" />
                      <path d="M16 22l6-6" />
                      <path d="M16 22l-6-6" />
                    </svg>
                    <span className="text-xs text-brown-400 mt-1">Swipe</span>
                  </motion.div>
                </div>
              )}
            </div>
            {/* Right Arrow */}
            {filteredImages.length > 1 && (
              <button
                className="hidden md:flex absolute right-2 z-20 items-center justify-center bg-brown-100 hover:bg-brown-200 text-brown-800 rounded-full w-10 h-10 shadow transition-colors disabled:opacity-40 disabled:pointer-events-none"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                onClick={goNext}
                disabled={currentIdx === filteredImages.length - 1}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            )}
            <style>{`
              .gallery-scroll {
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE 10+ */
              }
              .gallery-scroll::-webkit-scrollbar {
                display: none; /* Chrome/Safari/Webkit */
              }
            `}</style>
          </div>
          {/* Indicator bar */}
          <div className="flex justify-center mt-4 gap-2">
            {getIndicators().map((item, i) =>
              item.ellipsis ? (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-brown-300 opacity-40 flex items-center justify-center relative"
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-brown-400">
                    …
                  </span>
                </span>
              ) : (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    item.idx === currentIdx
                      ? "bg-green-800 scale-125 opacity-100"
                      : "bg-brown-300 opacity-40"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-brown-900/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                className="absolute top-6 right-6 text-cream-50 hover:text-cream-300 transition-colors"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={32} />
              </motion.button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                className="max-w-5xl max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={
                    galleryImages.find((img) => img.id === selectedImage)?.src
                  }
                  alt={
                    galleryImages.find((img) => img.id === selectedImage)?.alt
                  }
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default Gallery;
