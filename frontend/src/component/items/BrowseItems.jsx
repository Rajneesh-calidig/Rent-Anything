import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Star, X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useItem } from "../../providers/Items/ItemProvider";
import { MapPin, Tag, Calendar } from "lucide-react";
import { useLoader } from "../../providers/Loader/LoaderProvider";

export default function BrowseItems() {
  const { items, searchItems } = useItem();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [filters, setFilters] = useState(searchParams);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeSort, setActiveSort] = useState("");
  const [includeUnavailableItems, setIncludeUnavailableItems] = useState(false);
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    distance: true,
    deliveryType: true,
    totalPrice: true,
    category: true,
    dates: true,
  });

  const categories = [
    "All",
    "Electronics",
    "Furniture",
    "Clothing",
    "Sports",
    "Tools",
    "Vehicles",
  ];

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const params = { ...Object.fromEntries(searchParams) };
    if (value) {
      params[name] = value;
    } else {
      delete params[name];
    }
    setSearchParams(params);
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number.parseInt(value);
    const newFilters = { ...filters, [name]: numValue };
    setFilters(newFilters);

    const params = { ...Object.fromEntries(searchParams) };
    if (
      (name === "minPrice" && numValue > 0) ||
      (name === "maxPrice" && numValue !== 5000)
    ) {
      params[name] = numValue;
    } else {
      delete params[name];
    }
    setSearchParams(params);
  };

  const handleCategoryToggle = (category) => {
    let newCategories = [];

    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter((c) => c !== category);
    } else {
      newCategories = [...selectedCategories, category];
    }

    setSelectedCategories(newCategories);
    setFilters({ ...filters, category: newCategories });

    const params = { ...Object.fromEntries(searchParams) };

    delete params.category;

    if (newCategories.length > 0) {
      params.category = newCategories;
    }

    setSearchParams(params);
  };

  const handleSortChange = (sortOption) => {
    setActiveSort(sortOption);
    setFilters({ ...filters, sortBy: sortOption });

    const params = { ...Object.fromEntries(searchParams) };

    if (sortOption) {
      params.sortBy = sortOption;
    } else {
      delete params.sortBy;
    }

    setSearchParams(params);
  };
  const loader = useLoader();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        loader.start();
        const newFilters = {
          keyword: searchParams.get("keyword") || "",
          location: searchParams.get("location") || "",
          rating: Number(searchParams.get("rating")) || 0,
          minPrice: Number(searchParams.get("minPrice")) || 0,
          maxPrice: Number(searchParams.get("maxPrice")) || 5000,
          sortBy: searchParams.get("sortBy") || "",
          startDate: searchParams.get("startDate") || "",
          endDate: searchParams.get("endDate") || "",
          category: searchParams.getAll("category") || [],
          includeUnavailableItems:
            searchParams.get("includeUnavailableItems") || false,
          page: searchParams.get("page") || 1,
        };

        setFilters(newFilters);
        setSelectedCategories(newFilters.category);
        await searchItems(newFilters);
      } catch (err) {
        console.log(err);
      } finally {
        loader.stop();
      }
    };
    fetchItems();
  }, [searchParams]);

  const clearFilters = () => {
    setFilters({
      category: [],
      location: "",
      rating: 0,
      minPrice: 0,
      maxPrice: 5000,
      keyword: "",
      sortBy: "",
      startDate: "",
      endDate: "",
      distance: 50,
      includeUnavailableItems: false,
      page: 1,
    });
    setSelectedCategories([]);
    setActiveSort("");
    setSearchParams({});
  };

  const CustomDatePicker = ({ label, name, value, onChange, min, max }) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            name={name}
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e)}
            className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            min={min}
            max={max}
          />
          <Calendar className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    );
  };

  // Custom slider component
  const CustomSlider = ({ min, max, value, onChange, label, name }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}: ₹{value}
        </label>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          name={name}
          onChange={onChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{min}</span>
          <span>₹{max}</span>
        </div>
      </div>
    );
  };

  // Custom rating component
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  // Filter section component
  const FilterSection = useCallback(
    ({ title, isExpanded, onToggle, children }) => {
      return (
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={onToggle}
          >
            <h3 className="font-semibold text-gray-800">{title}</h3>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {isExpanded && children}
        </div>
      );
    },
    [expandedSections]
  );

  const handleUnavailbilityToggle = (checked) => {
    const newValue = !checked;
    setIncludeUnavailableItems(newValue);

    const params = { ...Object.fromEntries(searchParams) };

    // Only add parameter if true
    if (newValue) {
      params.includeUnavailableItems = newValue;
    } else {
      delete params.includeUnavailableItems;
    }

    setSearchParams(params);
  };

  //infinite scroll intersection observer
  // const [page, setPage] = useState(1);
  // let options = {
  //   root: document.querySelector("#scrollarea"),
  //   rootMargin: "0px",
  //   threshold: 0.9,
  // };
  // const callback = (entries) => {
  //   entries.forEach((entry) => {
  //     let elem = entry.target;

  //     if (entry.intersectionRatio >= 0.9) {
  //       setPage(parseInt(searchParams.get("page")) + 1);
  //       let params = { ...Object.fromEntries(searchParams) };
  //       if (page) {
  //         params.page = page;
  //       }
  //       setSearchParams(params);
  //       // fetchNextItems();
  //       // alert("intersected");
  //     }
  //   });
  // };
  // const containerRef = useRef(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(callback, options);

  //   if (containerRef.current) observer.observe(containerRef.current);

  //   return () => {
  //     if (containerRef.current) observer.unobserve(containerRef.current);
  //   };
  // }, [containerRef, options]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen pt-24">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with filters */}
        <div className="md:w-1/4">
          <div className="max-h-screen top-20 overflow-y-auto no-scrollbar">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg mb-6 flex justify-center">
                <h2 className="text-xl font-bold">Filter Rental Items!</h2>
              </div>

              <FilterSection
                title="Location"
                isExpanded={expandedSections.location}
                onToggle={() => toggleSection("location")}
              >
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Any location"
                    className="w-full p-2 pl-9 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                  <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </FilterSection>

              <FilterSection
                title="Price Range"
                isExpanded={expandedSections.totalPrice}
                onToggle={() => toggleSection("totalPrice")}
              >
                <div className="space-y-4">
                  <CustomSlider
                    min={0}
                    max={5000}
                    value={
                      filters.minPrice || searchParams.get("minPrice") || 0
                    }
                    onChange={handleSliderChange}
                    label="Min Price"
                    name="minPrice"
                    showLabels={false}
                  />
                  <CustomSlider
                    min={0}
                    max={10000}
                    value={
                      filters.maxPrice || searchParams.get("maxPrice") || 20000
                    }
                    onChange={handleSliderChange}
                    label="Max Price"
                    name="maxPrice"
                    showLabels={false}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="checkbox"
                    id="includeSecurity"
                    className=" mr-2"
                  />
                  <label htmlFor="includeSecurity" className="text-sm">
                    Include security deposit in the price range.
                  </label>
                </div>
              </FilterSection>

              <FilterSection
                title="Category"
                isExpanded={expandedSections.category}
                onToggle={() => toggleSection("category")}
              >
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Dates"
                isExpanded={expandedSections.dates}
                onToggle={() => toggleSection("dates")}
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate || ""}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate || ""}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="checkbox"
                    id="includeUnavailable"
                    className=" mr-2"
                    name="includeUnavailableItems"
                    checked={includeUnavailableItems}
                    onChange={() =>
                      handleUnavailbilityToggle(includeUnavailableItems)
                    }
                  />
                  <label htmlFor="includeUnavailable" className="text-sm">
                    Show unavailable items in the selected date range.
                  </label>
                </div>
              </FilterSection>

              <button
                onClick={clearFilters}
                className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center"
              >
                <X size={16} className="mr-2" />
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Right side with products */}
        <div className="md:w-3/4">
          {/* Header with count and sort */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-700">
              Showing {items.length} {items.length === 1 ? "item" : "items"}
            </h2>
            <div className="flex items-center">
              <span className="mr-2 text-gray-700">Sort By</span>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={activeSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results grid */}
          <div
            id="scrollarea"
            className="max-h-screen overflow-y-auto no-scrollbar space-y-4"
          >
            {items.length ? (
              <div
                id="itemlist"
                // ref={containerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((item, index) => (
                  <div
                    key={item._id}
                    // ref={index === items.length - 1 ? containerRef : null}
                    // id={index === items.length - 1 ? "itemlist" : ""}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/item/${item._id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          `${import.meta.env.VITE_FILE_URL}${item.images[0]}` ||
                          "/placeholder.svg"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                          {item.title}
                        </h3>
                        {item.avgRating ? (
                          <RatingStars rating={item.avgRating} />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No ratings yet
                          </span>
                        )}
                      </div>
                      <div className="text-blue-600 font-semibold mb-2">
                        ₹{item.pricePerDay}/day
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin size={14} className="mr-1" />
                        {item.location}
                        <span className="mx-2">•</span>
                        <Tag size={14} className="mr-1" />
                        {item.category}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-10 text-center">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <p className="text-gray-500 text-xl">
                  No items match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
