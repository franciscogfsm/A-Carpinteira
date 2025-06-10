import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../../config/supabase";
import Notification from "../ui/Notification";

const REVIEWS_PER_PAGE = 6;

interface Review {
  id: number;
  client_name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_approved: boolean;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    client_name: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const reviewsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [userInteracting, setUserInteracting] = useState(false);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null); // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch reviews function
  const fetchReviews = useCallback(
    async (pageNumber: number, reset = false) => {
      if (isLoading || (!hasMore && !reset)) return;

      setIsLoading(true);

      try {
        const from = reset ? 0 : pageNumber * REVIEWS_PER_PAGE;
        const to = from + REVIEWS_PER_PAGE - 1;

        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        if (data) {
          if (reset) {
            setReviews(data);
            setPage(0);
          } else {
            setReviews((prev) => {
              const existingIds = new Set(prev.map((r) => r.id));
              const newReviews = data.filter((r) => !existingIds.has(r.id));
              return [...prev, ...newReviews];
            });
            setPage(pageNumber);
          }

          setHasMore(data.length === REVIEWS_PER_PAGE);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setNotification({
          message: "Erro ao carregar avaliações.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [hasMore, isLoading]
  );

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      if (!userInteracting && reviewsRef.current && reviews.length > 0) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewsRef.current;
        const maxScroll = scrollWidth - clientWidth;

        // Check if we need to load more reviews before reaching the end
        if (
          scrollLeft + clientWidth >= scrollWidth - 300 &&
          hasMore &&
          !isLoading
        ) {
          fetchReviews(page + 1);
        }

        if (scrollLeft >= maxScroll - 10) {
          // At the end, scroll back to start
          reviewsRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          // Scroll to next position
          const scrollAmount = isMobile
            ? 280
            : reviewsRef.current.clientWidth * 0.4;
          reviewsRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds
  }, [
    userInteracting,
    isMobile,
    reviews.length,
    hasMore,
    isLoading,
    fetchReviews,
    page,
  ]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  const handleUserInteraction = useCallback(() => {
    setUserInteracting(true);
    stopAutoScroll();

    // Resume auto-scroll after 5 seconds of no interaction
    setTimeout(() => {
      setUserInteracting(false);
    }, 3000);
  }, [stopAutoScroll]);

  // Memoized scroll check function
  const checkScrollArrows = useCallback(() => {
    if (reviewsRef.current && reviews.length > 0) {
      const { scrollWidth, clientWidth, scrollLeft } = reviewsRef.current;
      const isScrollable = scrollWidth > clientWidth;

      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(
        isScrollable && scrollLeft < scrollWidth - clientWidth - 10
      );
    } else {
      // If no reviews, hide both arrows
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  }, [reviews.length]);

  // Start auto-scroll when reviews are loaded
  useEffect(() => {
    if (reviews.length > 0 && isAutoScrolling) {
      startAutoScroll();
    }

    return () => stopAutoScroll();
  }, [reviews.length, isAutoScrolling, startAutoScroll, stopAutoScroll]);

  // Resume auto-scroll when user stops interacting
  useEffect(() => {
    if (!userInteracting && reviews.length > 0) {
      const timer = setTimeout(() => {
        startAutoScroll();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [userInteracting, reviews.length, startAutoScroll]);

  // Initial load
  useEffect(() => {
    fetchReviews(0, true);
  }, []);

  // Scroll arrows check
  useEffect(() => {
    const timeoutId = setTimeout(checkScrollArrows, 100);

    const handleResize = () => checkScrollArrows();
    const handleScroll = () => checkScrollArrows();

    window.addEventListener("resize", handleResize);
    reviewsRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      reviewsRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [reviews, checkScrollArrows]);

  // Infinite scroll - horizontal for both mobile and desktop
  useEffect(() => {
    const reviewsContainer = reviewsRef.current;
    if (!reviewsContainer) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = reviewsContainer;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 200;

      if (isNearEnd && hasMore && !isLoading) {
        fetchReviews(page + 1);
      }
    };

    reviewsContainer.addEventListener("scroll", handleScroll);
    return () => reviewsContainer.removeEventListener("scroll", handleScroll);
  }, [hasMore, page, isLoading, fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const { error } = await supabase
        .from("reviews")
        .insert([{ ...newReview, is_approved: false }]);

      if (error) throw error;

      setNewReview({
        client_name: "",
        rating: 5,
        comment: "",
      });
      setNotification({
        message:
          "Obrigado pela sua avaliação! Ela será revista antes de ser publicada.",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      setNotification({
        message: "Erro ao enviar sua avaliação.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  const scroll = (direction: "left" | "right") => {
    if (reviewsRef.current) {
      handleUserInteraction(); // Stop auto-scroll when user manually scrolls

      const scrollAmount = isMobile
        ? 280 // Fixed amount - about 1 card width on mobile
        : reviewsRef.current.clientWidth * 0.8; // Scroll 80% on desktop

      reviewsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <h2 className="text-center font-display text-2xl md:text-3xl lg:text-4xl text-brown-900 mb-8 md:mb-12">
          Avaliações dos Nossos Clientes
        </h2>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 bg-white p-4 md:p-8 rounded-lg shadow-lg border border-brown-100">
          <h3 className="font-display text-lg md:text-xl text-brown-800 mb-4 md:mb-6">
            Deixe sua Avaliação
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="client_name"
                className="block text-sm font-body text-brown-700 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="client_name"
                required
                value={newReview.client_name}
                onChange={(e) =>
                  setNewReview({ ...newReview, client_name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-green-800 focus:ring-green-800 bg-cream-50 text-brown-800 text-sm md:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-body text-brown-700 mb-1"
              >
                Avaliação
              </label>
              <select
                id="rating"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-green-800 focus:ring-green-800 bg-cream-50 text-brown-800 text-sm md:text-base"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} {rating === 1 ? "estrela" : "estrelas"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-body text-brown-700 mb-1"
              >
                Comentário
              </label>
              <textarea
                id="comment"
                required
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-green-800 focus:ring-green-800 bg-cream-50 text-brown-800 text-sm md:text-base"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full text-sm md:text-base"
            >
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="relative">
          {(reviews.length > 0 || isLoading) && (
            <div
              ref={reviewsRef}
              className="flex overflow-x-auto space-x-3 md:space-x-6 lg:space-x-8 pb-4 px-2 md:px-4 scroll-smooth"
              style={
                {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  scrollSnapType: isMobile ? "x proximity" : "none",
                  WebkitScrollbar: "none",
                } as React.CSSProperties
              }
              onMouseEnter={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              onScroll={handleUserInteraction}
            >
              {" "}
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`
                    flex-none bg-white p-4 md:p-6 rounded-lg shadow-md border border-brown-100
                    hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out
                    ${isMobile ? "w-72" : "w-80"}
                  `}
                  style={{
                    scrollSnapAlign: isMobile ? "start" : "none",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-brown-900 mb-2 text-sm md:text-base">
                        {review.client_name}
                      </h4>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${
                              i < review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-brown-700 mb-4 text-sm md:text-base leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                    <span className="text-xs md:text-sm text-gray-500 mt-auto">
                      {new Date(review.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))}{" "}
              {isLoading && (
                <div
                  className={`
                    flex-none bg-white p-4 md:p-6 rounded-lg shadow-md border border-brown-100 animate-pulse
                    ${isMobile ? "w-72" : "w-80"}
                  `}
                  style={{
                    scrollSnapAlign: isMobile ? "start" : "none",
                  }}
                >
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-12 md:h-16 bg-gray-200 rounded"></div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Arrows - Desktop Only */}
          {!isMobile && showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-800 z-10 opacity-80 hover:opacity-100"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-brown-800 transition-transform duration-300 hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {!isMobile && showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-800 z-10 opacity-80 hover:opacity-100"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-brown-800 transition-transform duration-300 hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </section>
  );
}
