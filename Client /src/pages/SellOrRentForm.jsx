import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCloudUploadAlt, FaCheckCircle, FaTrash, FaUserTie } from "react-icons/fa";
import API_URL from "../Services/Api";

function SellOrRentForm() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      if (!token || !user || (user.role !== "agent" && user.role !== "admin")) {
        navigate("/LogIn?role=agent&redirect=/SellOrRentForm", { replace: true });
        return;
      }
      setCurrentUser(user);
      setAuthorized(true);
    } catch {
      navigate("/LogIn?role=agent&redirect=/SellOrRentForm", { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "villa",
    listingType: "sale",
    address: "",
    city: "",
    state: "",
    country: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setMessage({ type: "error", text: "You can upload a maximum of 5 images." });
      return;
    }
    setImages(files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    setImages(updatedFiles);

    const updatedPreviews = [...previews];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!formData.title || !formData.price || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: "success",
          text: "Property listed successfully! Redirecting to marketplace...",
        });
        setTimeout(() => {
          navigate("/marketplace");
        }, 1500);
      } else {
        if (response.status === 401 || response.status === 403) {
          setMessage({
            type: "error",
            text: result.message || "Admin/Agent authentication required. Redirecting to agent login...",
          });
          setTimeout(() => {
            navigate("/LogIn?role=agent&redirect=/SellOrRentForm");
          }, 1500);
          return;
        }
        setMessage({
          type: "error",
          text: result.message || "Failed to publish listing. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding property:", error);
      setMessage({
        type: "error",
        text: "Network error occurred. Please ensure server is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center text-white px-4">
        <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-4" />
        <p className="text-gray-300 font-serif text-lg">Verifying Admin / Agent Access...</p>
        <p className="text-xs text-gray-500 mt-2">Only authorized administrators or agents may access this portal.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition text-sm font-medium"
          >
            <FaArrowLeft /> Back
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold">
            <FaUserTie />
            <span>Agent Portal: {currentUser?.fullName || "Verified Agent"}</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            List a Prestige Property
          </h1>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Submit your luxury estate or investment asset to the global Luxe Realty collection.
          </p>
        </div>

        {/* Feedback message */}
        {message.text && (
          <div
            className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-950/70 border border-emerald-500/40 text-emerald-200"
                : "bg-red-950/70 border border-red-500/40 text-red-200"
            }`}
          >
            {message.type === "success" && <FaCheckCircle className="text-emerald-400 shrink-0 text-lg" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#111111]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Section: Overview */}
          <div>
            <h2 className="text-lg font-semibold text-[#d4af37] mb-4 pb-2 border-b border-white/10">
              1. Property Overview
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Sovereign Sky Villa & Penthouse"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide an architectural and lifestyle narrative for the property..."
                  rows="4"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Price (INR / ₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 15000000"
                    className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37] text-sm cursor-pointer"
                  >
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="land">Estate Land</option>
                    <option value="commercial">Commercial Trophy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Listing Type *
                  </label>
                  <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37] text-sm cursor-pointer"
                  >
                    <option value="sale">Direct Sale</option>
                    <option value="rent">Luxury Rental</option>
                    <option value="auction">Elite Auction</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div>
            <h2 className="text-lg font-semibold text-[#d4af37] mb-4 pb-2 border-b border-white/10">
              2. Location Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 742 Evergreen Palm Way"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, Bangalore, Miami"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Maharashtra, California"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. India, United States, UAE"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Specifications */}
          <div>
            <h2 className="text-lg font-semibold text-[#d4af37] mb-4 pb-2 border-b border-white/10">
              3. Architectural Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Total Area (Sq Ft)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 4500"
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Photos */}
          <div>
            <h2 className="text-lg font-semibold text-[#d4af37] mb-4 pb-2 border-b border-white/10">
              4. Photography (Max 5)
            </h2>

            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-[#d4af37] transition bg-black/30">
              <input
                type="file"
                id="file-upload"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <FaCloudUploadAlt className="text-4xl text-[#d4af37]" />
                <span className="text-sm font-semibold text-white">
                  Click to choose photographs or drag & drop
                </span>
                <span className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, WEBP (Up to 5MB each)
                </span>
              </label>
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                {previews.map((src, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden h-24 border border-white/20 group">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/75 text-red-400 hover:text-red-300 transition"
                      aria-label="Remove image"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#d4af37] text-black font-bold tracking-wide hover:bg-[#b8952b] transition shadow-xl disabled:opacity-50 text-sm uppercase"
            >
              {loading ? "Publishing Listing..." : "Publish Prestige Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellOrRentForm;