// import React from "react";
// import { Heart, Search, Edit, Trash, Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useItem } from "../../providers/Items/ItemProvider";
// import { toast } from "react-toastify";
// import { useAuth } from "../../providers/Auth/AuthProvider";
// import { useLoader } from "../../providers/Loader/LoaderProvider";

// const MyItems = ({
//   setEditItemData,
//   setEditItemId,
//   setNewImages,
//   setImagesToDelete,
//   setShowEditModal,
// }) => {
//   const { myItems, deleteItem, getMyItems } = useItem();
//   const { user } = useAuth();
//   const loader = useLoader();
//   const navigate = useNavigate();
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };
//   const handleEditItem = (item) => {
//     console.log(item);
//     setEditItemId(item._id);
//     setEditItemData({
//       _id: item._id,
//       title: item.title,
//       category: item.category,
//       subCategory: item.subCategory || "",
//       pricePerDay: item.pricePerDay,
//       condition: item.condition || "",
//       brand: item.brand || "",
//       model: item.model || "",
//       location: item.location || "",
//       available: item.available || "",
//       description: item.description || "",
//       status: item.status || "active",
//       images: item.images || [],
//     });
//     setNewImages([]);
//     setImagesToDelete([]);
//     setShowEditModal(true);
//   };

//   const handleDeleteItem = async (id) => {
//     try {
//       loader.start();
//       const response = await deleteItem(id);
//       if (response.status === 200) {
//         toast.success("Item deleted successfully!");
//         getMyItems(user._id);
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.error("error while deleting image", err);
//     } finally {
//       loader.stop();
//     }
//   };
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search items..."
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//           <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
//             <option value="all">All Categories</option>
//             <option value="electronics">Electronics</option>
//             <option value="sports">Sports</option>
//             <option value="tools">Tools</option>
//             <option value="outdoor">Outdoor</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Item
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price/Day
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stats
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Listed On
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {myItems?.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img
//                           src={
//                             `${import.meta.env.VITE_FILE_URL}${
//                               item.images[0]
//                             }` || "/placeholder.svg"
//                           }
//                           alt={item.title}
//                           className="h-10 w-10 rounded-md object-cover"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900 line-clamp-1">
//                           {item.title}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           ID: {item._id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{item.category}</div>
//                     <div className="text-xs text-gray-500">
//                       {item?.subcategory}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-indigo-600">
//                       ₹{item.pricePerDay}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         item?.status === "active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {item?.status === "active" ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center text-xs text-gray-500">
//                         <Eye size={14} className="mr-1" />
//                         {item?.views}
//                       </div>
//                       <div className="flex items-center text-xs text-gray-500">
//                         <Heart size={14} className="mr-1" />
//                         {item?.likes}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(item?.createdAt)}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         className="text-indigo-600 hover:text-indigo-900"
//                         onClick={() => navigate("/item/" + item._id)}
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         className="text-gray-600 hover:text-gray-900"
//                         onClick={() => handleEditItem(item)}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         className="text-red-600 hover:text-red-900"
//                         onClick={() => handleDeleteItem(item._id)}
//                       >
//                         <Trash size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyItems;
// "use client";

// import { useState } from "react";
// import { Heart, Search, Edit, Trash, Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useItem } from "../../providers/Items/ItemProvider";
// import { toast } from "react-toastify";
// import { useAuth } from "../../providers/Auth/AuthProvider";
// import { useLoader } from "../../providers/Loader/LoaderProvider";

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemTitle }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>

//         {/* Modal panel */}
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                 <Trash className="h-6 w-6 text-red-600" aria-hidden="true" />
//               </div>
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <h3
//                   className="text-lg leading-6 font-medium text-gray-900"
//                   id="modal-title"
//                 >
//                   Delete Item
//                 </h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">
//                     Are you sure you want to delete{" "}
//                     <span className="font-semibold">{itemTitle}</span>? This
//                     action cannot be undone.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               onClick={onConfirm}
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
//             >
//               Delete
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MyItems = ({
//   setEditItemData,
//   setEditItemId,
//   setNewImages,
//   setImagesToDelete,
//   setShowEditModal,
// }) => {
//   const { myItems, deleteItem, getMyItems } = useItem();
//   const { user } = useAuth();
//   const loader = useLoader();
//   const navigate = useNavigate();
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   const handleEditItem = (item) => {
//     console.log(item);
//     setEditItemId(item._id);
//     setEditItemData({
//       _id: item._id,
//       title: item.title,
//       category: item.category,
//       subCategory: item.subCategory || "",
//       pricePerDay: item.pricePerDay,
//       condition: item.condition || "",
//       brand: item.brand || "",
//       model: item.model || "",
//       location: item.location || "",
//       available: item.available || "",
//       description: item.description || "",
//       status: item.status || "active",
//       images: item.images || [],
//     });
//     setNewImages([]);
//     setImagesToDelete([]);
//     setShowEditModal(true);
//   };

//   const openDeleteModal = (item) => {
//     setItemToDelete(item);
//     setDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setDeleteModalOpen(false);
//     setItemToDelete(null);
//   };

//   const confirmDelete = async () => {
//     if (!itemToDelete) return;

//     try {
//       loader.start();
//       const response = await deleteItem(itemToDelete._id);
//       if (response.status === 200) {
//         toast.success("Item deleted successfully!");
//         getMyItems(user._id);
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.error("error while deleting image", err);
//     } finally {
//       loader.stop();
//       closeDeleteModal();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search items..."
//               className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Item
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price/Day
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stats
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Listed On
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {myItems?.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img
//                           src={
//                             `${
//                               import.meta.env.VITE_FILE_URL ||
//                               "/placeholder.svg"
//                             }${item.images[0]}` || "/placeholder.svg"
//                           }
//                           alt={item.title}
//                           className="h-10 w-10 rounded-md object-cover"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900 line-clamp-1">
//                           {item.title}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           ID: {item._id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{item.category}</div>
//                     <div className="text-xs text-gray-500">
//                       {item?.subcategory}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-indigo-600">
//                       ₹{item.pricePerDay}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         item?.status === "active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {item?.status === "active" ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center text-xs text-gray-500">
//                         <Eye size={14} className="mr-1" />
//                         {item?.views}
//                       </div>
//                       <div className="flex items-center text-xs text-gray-500">
//                         <Heart size={14} className="mr-1" />
//                         {item?.likes}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(item?.createdAt)}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         className="text-indigo-600 hover:text-indigo-900"
//                         onClick={() => navigate("/item/" + item._id)}
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         className="text-gray-600 hover:text-gray-900"
//                         onClick={() => handleEditItem(item)}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         className="text-red-600 hover:text-red-900"
//                         onClick={() => openDeleteModal(item)}
//                       >
//                         <Trash size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={deleteModalOpen}
//         onClose={closeDeleteModal}
//         onConfirm={confirmDelete}
//         itemTitle={itemToDelete?.title}
//       />
//     </div>
//   );
// };

// export default MyItems;
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Heart,
  Search,
  Edit,
  Trash,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useItem } from "../../providers/Items/ItemProvider";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { useLoader } from "../../providers/Loader/LoaderProvider";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <Trash className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Delete Item
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{itemTitle}</span>? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyItems = ({
  setEditItemData,
  setEditItemId,
  setNewImages,
  setImagesToDelete,
  setShowEditModal,
}) => {
  const { myItems, deleteItem, getMyItems } = useItem();
  const { user } = useAuth();
  const loader = useLoader();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 5;

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(myItems?.map((item) => item.category) || []),
    ];
    return ["all", ...uniqueCategories];
  }, [myItems]);

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

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      loader.start();
      const response = await deleteItem(itemToDelete._id);
      if (response.status === 200) {
        toast.success("Item deleted successfully!");
        getMyItems(user._id);
      }
    } catch (err) {
      toast.error(err.message);
      console.error("error while deleting image", err);
    } finally {
      loader.stop();
      closeDeleteModal();
    }
  };

  // Filter items based on search term and category
  const filteredItems = useMemo(() => {
    if (!myItems) return [];

    return myItems.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [myItems, searchTerm, selectedCategory]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current page items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Reset to first page when search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {!myItems || myItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    No items found. Add some items to get started!
                  </td>
                </tr>
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    No items match your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            src={item.images[0]}
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
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => openDeleteModal(item)}
                        >
                          <Trash size={16} />
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
        {filteredItems.length > 0 && (
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
                    {Math.min(currentPage * itemsPerPage, filteredItems.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredItems.length}</span>{" "}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemTitle={itemToDelete?.title}
      />
    </div>
  );
};

export default MyItems;
