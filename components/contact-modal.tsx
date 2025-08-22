"use client";
import { useState } from "react";
import { X, Mail, MessageSquare, Send, Phone, ChevronDown } from "lucide-react";
import { countries, Country } from "./countries";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlagIcon = ({ countryCode }: { countryCode: string }) => {
  return (
    <img
      src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
      alt={`${countryCode} flag`}
      className="w-5 h-4 object-cover rounded-sm"
      onError={(e) => {
        // Fallback jika gambar tidak load
        e.currentTarget.style.display = "none";
        (e.currentTarget.nextElementSibling as HTMLElement).style.display =
          "inline";
      }}
    />
  );
};

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries[89]
  );
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    contact: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone number validation (Indonesian format)
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 8 && cleaned.length <= 15;
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Format email tidak valid" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setContact(formatted);

    if (value && !validatePhone(value)) {
      setErrors((prev) => ({
        ...prev,
        contact: "Format nomor telepon tidak valid",
      }));
    } else {
      setErrors((prev) => ({ ...prev, contact: "" }));
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: !validateEmail(email) ? "Format email tidak valid" : "",
      contact: !validatePhone(contact)
        ? "Format nomor telepon tidak valid"
        : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          contact,
          message,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to send message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setEmail("");
        setMessage("");
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);
      // You might want to show an error message to the user here
      alert("Failed to send message. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#0047D9] rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
              <p className="text-sm text-slate-500">
                Get in touch with our team
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0047D9] focus:border-transparent transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Contact Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Contact
                </label>
                <div className="flex">
                  {/* Country Code Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsCountryDropdownOpen(!isCountryDropdownOpen)
                      }
                      className={`flex items-center px-3 py-3 border border-r-0 rounded-l-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-[#0047D9] focus:border-transparent transition-all duration-200 ${
                        errors.contact ? "border-red-500" : "border-slate-300"
                      }`}
                    >
                      <div className="flex items-center mr-2">
                        <FlagIcon countryCode={selectedCountry.code} />
                        <span
                          className="text-lg ml-1 hidden"
                          style={{ display: "none" }}
                        >
                          {selectedCountry.flag}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-700 mr-1">
                        {selectedCountry.dialCode}
                      </span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50 text-left"
                          >
                            <div className="flex items-center">
                              <div className="flex items-center mr-2">
                                <FlagIcon countryCode={country.code} />
                                <span
                                  className="text-lg ml-1 hidden"
                                  style={{ display: "none" }}
                                >
                                  {country.flag}
                                </span>
                              </div>
                              <span className="text-sm text-slate-700">
                                {country.name}
                              </span>
                            </div>
                            <span className="text-sm text-slate-500">
                              {country.dialCode}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    id="phone"
                    value={contact}
                    onChange={handleContactChange}
                    className={`flex-1 px-3 py-2 border rounded-r-lg focus:ring-2 focus:ring-[#0047D9] focus:border-transparent transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 ${
                      errors.contact ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="87876567888"
                    required
                  />
                </div>
                {errors.contact && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0047D9] focus:border-transparent transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 resize-none"
                    placeholder="Tell us about your automation needs..."
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0047D9] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#003BB8] focus:ring-2 focus:ring-[#0047D9] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-slate-600">
                Thank you for your interest. We'll get back to you within 24
                hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
