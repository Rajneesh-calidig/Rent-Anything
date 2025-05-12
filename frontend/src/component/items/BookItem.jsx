import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  Shield,
  RefreshCw,
  X,
} from "lucide-react";
import { useItem } from "../../providers/Items/ItemProvider";
import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { toast } from "react-toastify";
import { differenceInMinutes } from "date-fns";
import { formatTime, formatDate } from "../../utils/date-utils";
import RazorpayButton from "../payment/payment";
import { useLoader } from "../../providers/Loader/LoaderProvider";

export default function BookItem() {
  const { getItem, likeItem } = useItem();
  const { id } = useParams();
  const { user } = useAuth();
  // const { navigate } = useNavigate();
  const [product, setProduct] = useState();
  const loader = useLoader();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        loader.start();
        const item = await getItem(id);
        setProduct(item);
      } catch (err) {
        console.error(err);
      } finally {
        loader.stop();
      }
    };
    fetchItem();
  }, [getItem]);

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // State for booking
  const [rentalPeriod, setRentalPeriod] = useState("day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product?.pricePerDay);
  const [isFavorite, setIsFavorite] = useState();
  useEffect(() => {
    setIsFavorite(user?.likedItems?.includes(product?._id));
  }, [user]);
  const [reviewDetails, setReviewDetails] = useState({
    rating: 0,
    comment: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  // Calculate total price based on rental period
  useEffect(() => {
    let basePrice = 0;
    const days = calculateDays(startDate, endDate);

    if (rentalPeriod === "day") {
      basePrice = product?.pricePerDay * (days || 1);
    } else if (rentalPeriod === "week") {
      basePrice = product?.pricePerWeek * (Math.ceil(days / 7) || 1);
    } else if (rentalPeriod === "month") {
      basePrice = product?.pricePerMonth * (Math.ceil(days / 30) || 1);
    }

    setTotalPrice(basePrice * quantity);
  }, [rentalPeriod, startDate, endDate, quantity, product]);

  // Helper function to calculate days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include the start day
  };

  // Image gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomPosition({ x, y });
  };

  //Handle like item
  const handleLikeToggle = async () => {
    try {
      loader.start();
      const response = await likeItem(product?._id, user?._id);
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
        toast.success(
          isFavorite ? "Removed from favorites" : "Added to favorites"
        );
      }
    } catch (err) {
      console.error("Error liking item: ", err);
      toast.error("Failed to like item");
    } finally {
      loader.stop();
    }
  };

  // Custom star rating component
  const StarRating = ({ rating, size = 16 }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={`${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : i < rating
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
        {/* <span className="ml-1 text-sm font-medium">{rating}</span> */}
      </div>
    );
  };

  // Custom date input component
  const DateInput = ({ label, value, onChange, min, max }) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            type="date"
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <Calendar className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    );
  };

  const { createReview, getReviews } = useItem();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviews(product?._id);
      const updatedReviews = reviews.map((review) => {
        const timeDifference = differenceInMinutes(
          new Date(),
          new Date(review.createdAt)
        );
        const formattedTime = formatTime(timeDifference);
        return { ...review, date: formattedTime };
      });
      setReviews(updatedReviews);
    };
    if (product?._id) {
      fetchReviews();
    }
  }, [getReviews, product]);

  const handleReviewSubmit = async () => {
    try {
      const response = await createReview({
        ...reviewDetails,
        itemId: product?._id,
      });
      if (response.status === 200) {
        toast.success("Review submitted successfully!");
        const updatedReview = {
          ...response.data,
          userId: { name: user.name, profileImage: user.profileImage },
          date: "Just now",
        };
        setReviews([...reviews, updatedReview]);
        setReviewDetails({ rating: 0, comment: "" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      {/* Back button */}
      {/* <button className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors cursor-pointer" onClick={navigateBack}>
        <ArrowLeft size={18} className="mr-1" />
        Back to search results
      </button> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Image gallery */}
        <div className="lg:col-span-2 mt-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Main image */}
            <div
              className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-100 cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={
                  `${import.meta.env.VITE_FILE_URL}${
                    product?.images[currentImageIndex]
                  }` || "/placeholder.svg"
                }
                alt={product?.title}
                className={`w-full h-full object-contain transition-transform duration-200 ${
                  isZoomed ? "scale-150" : ""
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x * 100}% ${
                          zoomPosition.y * 100
                        }%`,
                      }
                    : {}
                }
              />

              {/* Image navigation arrows */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product?.images?.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex p-4 space-x-2 overflow-x-auto">
              {product?.images?.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => selectImage(index)}
                >
                  <img
                    src={
                      `${import.meta.env.VITE_FILE_URL}${image}` ||
                      "/placeholder.svg"
                    }
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                    {product?.category}
                  </span>
                  <span>{product?.subcategory}</span>
                  <span className="mx-2">•</span>
                  <span>{product?.brand}</span>
                </div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {product?.title}
                  </h1>
                  <span className="mx-2 text-gray-300">|</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    {product?.location}
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <StarRating rating={product?.avgRating} size={18} />
                  {/* <span className="mx-2 text-gray-300">|</span> */}
                  <span className="text-sm ml-3 text-gray-500">{`${
                    product?.totalReviews
                  } review${product?.totalReviews !== 1 ? "s" : ""}`}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-full ${
                    isFavorite
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-500"
                  } hover:bg-gray-200 transition-colors`}
                  onClick={handleLikeToggle}
                >
                  <Heart
                    size={20}
                    className={isFavorite ? "fill-red-500" : ""}
                  />
                </button>
                {/* <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                  <Share2 size={20} />
                </button> */}
              </div>
            </div>

            <div className="border-t border-gray-100 my-6 pt-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <p className="text-gray-600 mb-6">{product?.description}</p>

              {/* <h3 className="text-md font-semibold mb-3">Features & Specifications</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul> */}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Brand</div>
                  <div className="font-medium">{product?.brand}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Model</div>
                  <div className="font-medium">{product?.model}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Condition</div>
                  <div className="font-medium">{product?.condition}</div>
                </div>
              </div>
            </div>

            {/* Owner information */}
            <div className="border-t border-gray-100 my-6 pt-6">
              <h2 className="text-lg font-semibold mb-4">About the Owner</h2>
              <div className="flex items-start">
                <img
                  src={
                    `${import.meta.env.VITE_FILE_URL}${
                      product?.ownerId?.profileImage
                    }` || "/placeholder.svg"
                  }
                  alt={product?.owner?.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{product?.ownerId?.name}</h3>
                    {product?.owner?.verified && (
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                        <Shield size={12} className="mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <StarRating rating={product?.owner?.rating} />
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">
                      Member since: {formatDate(product?.ownerId?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="border-t border-gray-100 my-6 pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  Reviews ({product?.totalReviews})
                </h2>
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => setShowReviewsModal(true)}
                >
                  See all reviews
                </button>
              </div>

              {/* Add review form */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-md font-semibold mb-3">Add Your Review</h3>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          setReviewDetails({ ...reviewDetails, rating: star })
                        }
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= reviewDetails.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          } cursor-pointer hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows={3}
                    value={reviewDetails.comment}
                    placeholder="Share your experience with this product..."
                    onChange={(e) =>
                      setReviewDetails({
                        ...reviewDetails,
                        comment: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
              </div>

              {/* Review statistics */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl font-bold mr-3">
                      {product?.rating}
                    </div>
                    {/* <div>
                      <StarRating rating={product.rating} size={20} />
                      <div className="text-sm text-gray-500 mt-1">Based on {product?.reviews?.length} reviews</div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-6">
                {reviews?.slice(0, 3).map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-start">
                      <img
                        src={
                          `${import.meta.env.VITE_FILE_URL}${
                            review.userId?.profileImage
                          }` || "/placeholder.svg"
                        }
                        alt={review.userId?.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{review.userId?.name}</h4>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-1">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>

                        {/* Review actions */}
                        <div className="flex items-center mt-3 text-sm">
                          <button className="text-gray-500 hover:text-gray-700 mr-4 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            Helpful (12)
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2"
                              />
                            </svg>
                            Not helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Booking and related items */}
        <div className="lg:col-span-1">
          {/* Booking card */}
          {/* <div className="sticky"> */}

          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-800">
                  ₹{product?.pricePerDay}
                </span>
                <span className="text-gray-500">/day</span>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4 pt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rental Period
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={`py-2 px-4 rounded-lg text-sm font-medium ${
                      rentalPeriod === "day"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    } border transition-colors`}
                    onClick={() => setRentalPeriod("day")}
                  >
                    Daily
                  </button>
                  {/* <button
                    className={`py-2 px-4 rounded-lg text-sm font-medium ${
                      rentalPeriod === "week"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    } border transition-colors`}
                    onClick={() => setRentalPeriod("week")}
                  >
                    Weekly
                  </button>
                  <button
                    className={`py-2 px-4 rounded-lg text-sm font-medium ${
                      rentalPeriod === "month"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    } border transition-colors`}
                    onClick={() => setRentalPeriod("month")}
                  >
                    Monthly
                  </button> */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <DateInput
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    endDate ||
                    new Date(new Date().setMonth(new Date().getMonth() + 4))
                      .toISOString()
                      .split("T")[0]
                  }
                />
                <DateInput
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  max={
                    new Date(new Date().setMonth(new Date().getMonth() + 4))
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Number.parseInt(e.target.value) || 1)
                      )
                    }
                    className="w-full text-center py-2 border-0 focus:ring-0"
                  />
                  <button
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rental fee</span>
                  <span>₹{totalPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service fee</span>
                  <span>₹{Math.round(totalPrice * 0.1).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ₹
                      {(
                        totalPrice + Math.round(totalPrice * 0.1)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                    >
                      terms and conditions
                    </button>{" "}
                    including liability for any damage to the rented item
                  </span>
                </label>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                <RazorpayButton
                  item={product}
                  amount={totalPrice + Math.round(totalPrice * 0.1)}
                />
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-4">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield size={16} className="mr-1 text-gray-400" />
                  Secure payment
                </div>
                <div className="flex items-center">
                  <RefreshCw size={16} className="mr-1 text-gray-400" />
                  Free cancellation
                </div>
              </div>
            </div>
          </div>
          {/* Related items */}
          {/* <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">You might also like</h2>
            <div className="space-y-4">
              {product.relatedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                    <div className="flex items-center mt-1">
                      <StarRating rating={item.rating} size={12} />
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium whitespace-nowrap">₹{item.pricePerDay}/day</div>
                </div>
              ))}
            </div>
          </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* All Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                All Reviews ({reviews?.length || 0})
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowReviewsModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-grow">
              {reviews?.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-start">
                        <img
                          src={
                            `${import.meta.env.VITE_FILE_URL}${
                              review.userId?.profileImage
                            }` || "/placeholder.svg"
                          }
                          alt={review.userId?.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">
                              {review.userId?.name}
                            </h4>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <div className="mt-1">
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Terms and Conditions</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowTermsModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-grow">
              <div className="space-y-4 text-gray-700">
                <h3 className="font-semibold text-lg">Rental Agreement</h3>
                <p>
                  This Rental Agreement ("Agreement") is entered into between
                  the owner ("Owner") and the renter ("Renter") for the
                  temporary use of the item described in this listing.
                </p>

                <h3 className="font-semibold text-lg">Liability for Damage</h3>
                <p>
                  The Renter assumes full responsibility for the item during the
                  rental period. The Renter agrees to return the item in the
                  same condition as received, normal wear and tear excepted. The
                  Renter shall be liable for any damage, loss, or theft of the
                  item during the rental period.
                </p>

                <h3 className="font-semibold text-lg">Damage Assessment</h3>
                <p>
                  In the event of damage, the Owner will assess the extent of
                  damage and the cost of repair or replacement. The Renter
                  agrees to pay for all repairs or replacement costs as
                  determined by the Owner.
                </p>

                <h3 className="font-semibold text-lg">Payment and Fees</h3>
                <p>
                  The Renter agrees to pay the rental fee as specified in the
                  listing. Additional fees may apply for late returns, damage,
                  or other violations of this Agreement.
                </p>

                <h3 className="font-semibold text-lg">Cancellation Policy</h3>
                <p>
                  Cancellations made at least 48 hours before the rental start
                  date will receive a full refund. Cancellations made less than
                  48 hours before the rental start date will be charged 50% of
                  the rental fee.
                </p>

                <h3 className="font-semibold text-lg">Prohibited Uses</h3>
                <p>
                  The Renter shall not use the item for any illegal purpose or
                  in any manner inconsistent with its intended use. The Renter
                  shall not sublease or transfer the item to any other person.
                </p>

                <h3 className="font-semibold text-lg">Governing Law</h3>
                <p>
                  This Agreement shall be governed by and construed in
                  accordance with the laws of the jurisdiction in which the
                  Owner resides.
                </p>
              </div>
            </div>

            <div className="p-6 border-t">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                onClick={() => {
                  setAgreeToTerms(true);
                  setShowTermsModal(false);
                }}
              >
                I Agree to These Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
