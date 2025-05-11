"use client";

import { useState, useEffect } from "react";
import { Heart, Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { useLoader } from "../../providers/Loader/LoaderProvider";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const itemsPerPage = 5;
  const { user } = useAuth();
  const loader = useLoader();
  const navigate = useNavigate();

  // Sample data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        loader.start();
        // Replace with actual API call to fetch favorites
        // const response = await getFavorites(user._id);

        // Sample data
        const sampleFavorites = [
          {
            _id: "1",
            title: "Professional Camera",
            category: "Electronics",
            pricePerDay: 250,
            status: "available",
            views: 120,
            likes: 45,
            owner: { name: "John Doe" },
            createdAt: "2023-10-15T12:00:00Z",
            images: ["camera.jpg"],
          },
          {
            _id: "2",
            title: "Mountain Bike",
            category: "Sports",
            pricePerDay: 150,
            status: "available",
            views: 87,
            likes: 32,
            owner: { name: "Jane Smith" },
            createdAt: "2023-11-05T15:30:00Z",
            images: ["bike.jpg"],
          },
          {
            _id: "3",
            title: "Drone",
            category: "Electronics",
            pricePerDay: 300,
            status: "available",
            views: 210,
            likes: 67,
            owner: { name: "Robert Johnson" },
            createdAt: "2023-09-22T09:15:00Z",
            images: ["drone.jpg"],
          },
          {
            _id: "4",
            title: "Camping Tent",
            category: "Outdoor",
            pricePerDay: 100,
            status: "available",
            views: 65,
            likes: 28,
            owner: { name: "Emily Wilson" },
            createdAt: "2023-12-01T11:45:00Z",
            images: ["tent.jpg"],
          },
          {
            _id: "5",
            title: "Power Drill",
            category: "Tools",
            pricePerDay: 80,
            status: "available",
            views: 42,
            likes: 15,
            owner: { name: "Michael Brown" },
            createdAt: "2023-11-18T14:20:00Z",
            images: ["drill.jpg"],
          },
          {
            _id: "6",
            title: "Projector",
            category: "Electronics",
            pricePerDay: 200,
            status: "available",
            views: 110,
            likes: 38,
            owner: { name: "Sarah Davis" },
            createdAt: "2023-10-30T16:10:00Z",
            images: ["projector.jpg"],
          },
          {
            _id: "7",
            title: "Kayak",
            category: "Sports",
            pricePerDay: 180,
            status: "available",
            views: 95,
            likes: 41,
            owner: { name: "David Lee" },
            createdAt: "2023-09-10T10:30:00Z",
            images: ["kayak.jpg"],
          },
        ];

        setFavorites(sampleFavorites);
        setTotalPages(Math.ceil(sampleFavorites.length / itemsPerPage));
      } catch (err) {
        toast.error("Failed to load favorites");
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
        loader.stop();
      }
    };

    fetchFavorites();
  }, [user._id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const removeFavorite = async (id) => {
    try {
      loader.start();
      // Replace with actual API call
      // const response = await removeFavoriteItem(id);

      // Optimistically remove from UI
      setFavorites(favorites.filter((item) => item._id !== id));
      toast.success("Item removed from favorites!");
    } catch (err) {
      toast.error("Failed to remove from favorites");
      console.error("Error removing favorite:", err);
    } finally {
      loader.stop();
    }
  };

  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(favorites.map((item) => item.category)),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saved On
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    Loading favorites...
                  </td>
                </tr>
              ) : paginatedFavorites.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    {filteredFavorites.length === 0
                      ? "No favorites found. Add some items to your favorites!"
                      : "No favorites match your search criteria."}
                  </td>
                </tr>
              ) : (
                paginatedFavorites.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            src={
                              `${
                                import.meta.env.VITE_FILE_URL ||
                                "/placeholder.svg"
                              }${item.images[0]}` || "/placeholder.svg"
                            }
                            alt={item.title}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {item._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">
                        ₹{item.pricePerDay}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.owner.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => navigate(`/item/${item._id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => removeFavorite(item._id)}
                        >
                          <Heart size={16} fill="#f43f5e" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredFavorites.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredFavorites.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredFavorites.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
