import React from "react";
import { Heart, Search, Edit, Trash, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useItem } from "../../providers/Items/ItemProvider";

const MyItems = ({
  setEditItemData,
  setEditItemId,
  setNewImages,
  setImagesToDelete,
  setShowEditModal,
}) => {
  const { myItems } = useItem();
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const handleEditItem = (item) => {
    console.log(item);
    setEditItemId(item._id);
    setEditItemData({
      _id: item._id,
      title: item.title,
      category: item.category,
      subCategory: item.subCategory || "",
      pricePerDay: item.pricePerDay,
      condition: item.condition || "",
      brand: item.brand || "",
      model: item.model || "",
      location: item.location || "",
      available: item.available || "",
      description: item.description || "",
      status: item.status || "active",
      images: item.images || [],
    });
    setNewImages([]);
    setImagesToDelete([]);
    setShowEditModal(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="sports">Sports</option>
            <option value="tools">Tools</option>
            <option value="outdoor">Outdoor</option>
          </select>
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listed On
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myItems?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={
                            `${import.meta.env.VITE_FILE_URL}${
                              item.images[0]
                            }` || "/placeholder.svg"
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
                    <div className="text-sm text-gray-900">{item.category}</div>
                    <div className="text-xs text-gray-500">
                      {item?.subcategory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600">
                      ₹{item.pricePerDay}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item?.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item?.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye size={14} className="mr-1" />
                        {item?.views}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Heart size={14} className="mr-1" />
                        {item?.likes}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(item?.createdAt)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => navigate("/item/" + item._id)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyItems;
