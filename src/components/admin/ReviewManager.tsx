import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import Notification from "../ui/Notification";

interface Review {
  id: number;
  client_name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_approved: boolean;
}

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      setNotification({
        message: "Erro ao carregar avaliações.",
        type: "error",
      });
      return;
    }

    setReviews(data || []);
    setIsLoading(false);
  };

  const handleApprove = async (reviewId: number) => {
    setNotification(null); // Clear previous notifications
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: true })
      .eq("id", reviewId);

    if (error) {
      console.error("Error approving review:", error);
      setNotification({ message: "Erro ao aprovar avaliação.", type: "error" });
      return;
    }

    setNotification({
      message: "Avaliação aprovada com sucesso!",
      type: "success",
    });
    fetchReviews();
  };

  const handleDelete = async (reviewId: number) => {
    setNotification(null); // Clear previous notifications
    if (!confirm("Tem certeza que deseja excluir esta avaliação?")) {
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      console.error("Error deleting review:", error);
      setNotification({ message: "Erro ao excluir avaliação.", type: "error" });
      return;
    }

    setNotification({
      message: "Avaliação excluída com sucesso!",
      type: "success",
    });
    fetchReviews();
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    if (filter === "approved") return review.is_approved;
    if (filter === "pending") return !review.is_approved;
    return true;
  });

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="p-6 bg-cream-50 rounded-lg shadow-lg border border-brown-100">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-brown-900 mb-4">
          Gerenciar Avaliações
        </h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`btn ${
              filter === "all" ? "btn-primary" : "btn-secondary"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`btn ${
              filter === "approved" ? "btn-primary" : "btn-secondary"
            }`}
          >
            Aprovadas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`btn ${
              filter === "pending" ? "btn-primary" : "btn-secondary"
            }`}
          >
            Pendentes
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-brown-700">
          Carregando avaliações...
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center text-brown-700">
          Nenhuma avaliação encontrada para este filtro.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md border border-brown-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-brown-900 mb-1">
                    {review.client_name}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
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
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p className="text-brown-700 mb-4">{review.comment}</p>
              <div className="flex gap-2">
                {!review.is_approved && (
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="btn btn-primary"
                  >
                    Aprovar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  className="btn bg-red-600 text-white hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
}
