import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Instagram } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Container from "../ui/Container";

// Register Portuguese locale
registerLocale("pt-BR", ptBR);

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    guests: "",
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    try {
      const payload = {
        to: "acarpinteiralakehouse@gmail.com",
        subject: `New Booking Inquiry from ${formState.name} - A Carpinteira`,
        text: `New Booking Inquiry\n\nHello,\n\nYou have received a new booking inquiry from your website:\n\nName: ${
          formState.name
        }\nEmail: ${formState.email}\nGuests: ${formState.guests}\nCheck-in: ${
          startDate ? startDate.toLocaleDateString() : ""
        }\nCheck-out: ${
          endDate ? endDate.toLocaleDateString() : ""
        }\nMessage: ${
          formState.message
        }\n\nBest regards,\nA Carpinteira Website`,
        html: `<h2>New Booking Inquiry</h2>
<p>Hello,</p>
<p>You have received a new booking inquiry from your website:</p>
<ul>
  <li><strong>Name:</strong> ${formState.name}</li>
  <li><strong>Email:</strong> ${formState.email}</li>
  <li><strong>Guests:</strong> ${formState.guests}</li>
  <li><strong>Check-in:</strong> ${
    startDate ? startDate.toLocaleDateString() : ""
  }</li>
  <li><strong>Check-out:</strong> ${
    endDate ? endDate.toLocaleDateString() : ""
  }</li>
  <li><strong>Message:</strong> ${formState.message}</li>
</ul>
<p>Best regards,<br/>A Carpinteira Website</p>`,
      };
      const response = await fetch(
        "https://qaucsydrplnclnsauwwn.supabase.co/functions/v1/send-email3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "", guests: "" });
      } else {
        alert("There was an error sending your message: " + result.message);
      }
    } catch (error: any) {
      alert("There was an error sending your message: " + error.message);
    }
  };

  return (
    <section id="contact" className="section-padding bg-cream-50">
      <Container className="pt-8 pb-12 md:pt-12 md:pb-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-2">
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-3"></div>
          <p className="max-w-2xl mx-auto text-green-900 text-lg md:text-xl font-semibold mb-1 animate-fade-in">
            Ready to experience A Carpinteira? Send us your booking request!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-cream-100 text-brown-900 p-5 md:p-6 rounded-2xl shadow-xl h-full flex flex-col justify-between border border-brown-100 animate-fade-in">
              <h3 className="text-2xl md:text-3xl font-display mb-4 md:mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full p-2 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="16" height="12" rx="2" />
                      <polyline points="2,6 10,13 18,6" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold mb-1">Address</div>
                    <div>
                      Bairro Cineiro, Aldeia do Mato
                      <br />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full p-2 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div>+351 919 174 515</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full p-2 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="16" height="12" rx="2" />
                      <polyline points="2,6 10,13 18,6" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div>acarpinteiralakehouse@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full p-2 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="12" height="12" rx="2" />
                      <path d="M8 10h8M8 14h6" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold mb-1">Check-in/Check-out</div>
                    <div>
                      Check-in: 15:00 - 20:00
                      <br />
                      Check-out: until 11:00
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="https://instagram.com/acarpinteiralakehouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-800 text-cream-50 px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <Instagram size={18} />
                  Follow us on Instagram
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 text-green-800 p-8 rounded-lg text-center h-full flex flex-col items-center justify-center"
              >
                <CheckCircle size={48} className="mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for contacting us. We'll get back to you as soon as
                  possible.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-cream-50 p-5 md:p-6 rounded-2xl shadow-xl border border-brown-100 animate-fade-in"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-brown-700 mb-2 font-medium text-lg"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-800">
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 border border-brown-200 rounded-md focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-cream-100 transition-all duration-150 placeholder-brown-300 text-lg"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-brown-700 mb-2 font-medium text-lg"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-800">
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="16" height="12" rx="2" />
                          <polyline points="2,6 10,13 18,6" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 border border-brown-200 rounded-md focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-cream-100 transition-all duration-150 placeholder-brown-300 text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="dates"
                      className="block text-brown-700 mb-2 font-medium text-lg"
                    >
                      Check-in Date
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-800">
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="16" height="12" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="19" y2="10" />
                        </svg>
                      </span>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        className="w-full p-4 pl-12 border border-brown-200 rounded-md focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-cream-100 transition-all duration-150 placeholder-brown-300 text-lg"
                        placeholderText="Select check-in date"
                        dateFormat="MMM d, yyyy"
                        locale="pt-BR"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="dates"
                      className="block text-brown-700 mb-2 font-medium text-lg"
                    >
                      Check-out Date
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-800">
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="16" height="12" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="19" y2="10" />
                        </svg>
                      </span>
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate || undefined}
                        className="w-full p-4 pl-12 border border-brown-200 rounded-md focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-cream-100 transition-all duration-150 placeholder-brown-300 text-lg"
                        placeholderText="Select check-out date"
                        dateFormat="MMM d, yyyy"
                        locale="pt-BR"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-brown-700 mb-2 font-medium text-lg"
                    >
                      Guests
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-800">
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formState.guests}
                        onChange={handleChange}
                        min={1}
                        max={7}
                        className="w-full p-4 pl-12 border border-brown-200 rounded-md focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-cream-100 transition-all duration-150 placeholder-brown-300 text-lg"
                        placeholder="Number of guests"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-brown-700 mb-2 font-medium text-lg"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 border border-brown-200 rounded-md focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-cream-100 transition-all duration-150 placeholder-brown-300 text-lg"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-900 text-cream-50 py-3 px-6 rounded-md hover:scale-[1.03] hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 text-lg"
                  style={{ boxShadow: "0 4px 24px 0 rgba(34, 85, 51, 0.10)" }}
                >
                  Send Message
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="11" x2="18" y2="11" />
                    <polyline points="12 5 18 11 12 17" />
                  </svg>
                </button>
                <div className="text-center text-green-900 text-sm mt-3 font-medium animate-fade-in">
                  We usually reply within a few hours!
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.1s cubic-bezier(.22,1,.36,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
