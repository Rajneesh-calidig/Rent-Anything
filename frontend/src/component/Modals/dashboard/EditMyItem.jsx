import React, { useState } from 'react'
import {Upload,Trash,X} from "lucide-react"

const EditMyItem = ({setShowEditModal,editItemData,setEditItemData,newImages,setEditItemId,setNewImages,setImagesToDelete,imagesToDelete}) => {

    const [activeImageTab, setActiveImageTab] = useState(0)

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const fileObjects = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          isNew: true,
        }))
        setNewImages([...newImages, ...fileObjects])
      }

      const handleRemoveImage = (index, isNew = false) => {
        if (isNew) {
          const updatedNewImages = [...newImages]
          updatedNewImages.splice(index, 1)
          setNewImages(updatedNewImages)
        } else {
          const imageToDelete = editItemData.images[index]
          setImagesToDelete([...imagesToDelete, imageToDelete])
    
          const updatedImages = [...editItemData.images]
          updatedImages.splice(index, 1)
          setEditItemData({
            ...editItemData,
            images: updatedImages,
          })
        }
      }

    const handleSaveEdit = async (e) => {
        e.preventDefault()
    
        const formData = new FormData()
    
        Object.keys(editItemData).forEach((key) => {
          if (key !== "images") {
            formData.append(key, editItemData[key])
          }
        })
    
        formData.append("existingImages", JSON.stringify(editItemData.images))
    
        formData.append("imagesToDelete", JSON.stringify(imagesToDelete))
    
        newImages.forEach((image, index) => {
          formData.append(`newImage${index}`, image.file)
        })
    
        console.log("Saving edited item:", editItemId)
        console.log("Form data contains:", {
          ...editItemData,
          newImages: newImages.length,
          imagesToDelete,
        })
    
        setShowEditModal(false)
        setEditItemId(null)
      }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Edit Item</h2>
                  <button onClick={() => setShowEditModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSaveEdit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                        <input
                          type="text"
                          name="title"
                          value={editItemData.title}
                          onChange={(e) => setEditItemData({ ...editItemData, title: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          name="category"
                          value={editItemData.category}
                          onChange={(e) => setEditItemData({ ...editItemData, category: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="sports">Sports</option>
                          <option value="tools">Tools</option>
                          <option value="outdoor">Outdoor</option>
                          <option value="clothing">Clothing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                        <input
                          type="text"
                          name="subcategory"
                          value={editItemData.subcategory}
                          onChange={(e) => setEditItemData({ ...editItemData, subcategory: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day (₹)</label>
                        <input
                          type="number"
                          name="pricePerDay"
                          value={editItemData.pricePerDay}
                          onChange={(e) => setEditItemData({ ...editItemData, pricePerDay: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={editItemData.description}
                          onChange={(e) => setEditItemData({ ...editItemData, description: e.target.value })}
                          rows="4"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={editItemData.status}
                          onChange={(e) => setEditItemData({ ...editItemData, status: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Management Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Manage Images</h3>

                      <div className="flex border-b">
                        <button
                          type="button"
                          className={`px-4 py-2 font-medium ${activeImageTab === 0 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
                          onClick={() => setActiveImageTab(0)}
                        >
                          Current Images
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 font-medium ${activeImageTab === 1 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
                          onClick={() => setActiveImageTab(1)}
                        >
                          Add New Images
                        </button>
                      </div>

                      <div className="mt-4">
                        {activeImageTab === 0 && (
                          <div>
                            {editItemData.images && editItemData.images.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {editItemData.images.map((image, index) => (
                                  <div key={index} className="relative group border rounded-lg overflow-hidden">
                                    <img
                                      src={`${import.meta.env.VITE_FILE_URL}${image}`}
                                      alt={`Item image ${index + 1}`}
                                      className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                      <button
                                        type="button"
                                        // onClick={() => handleMoveImage(index, "up")}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === 0}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        // onClick={() => handleMoveImage(index, "down")}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === editItemData.images.length - 1}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="p-1 bg-white rounded-full text-red-600 hover:text-red-800"
                                      >
                                        <Trash size={16} />
                                      </button>
                                    </div>
                                    {index === 0 && (
                                      <div className="absolute top-0 left-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-br-lg">
                                        Main
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                No images available. Add some new images.
                              </div>
                            )}
                          </div>
                        )}

                        {activeImageTab === 1 && (
                          <div>
                            <div className="mb-4">
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={handleImageUpload}
                                />
                              </label>
                            </div>

                            {newImages.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {newImages.map((image, index) => (
                                  <div key={index} className="relative group border rounded-lg overflow-hidden">
                                    <img
                                      src={image.preview || "/placeholder.svg"}
                                      alt={`New image ${index + 1}`}
                                      className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, "up", true)}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === 0}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, "down", true)}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === newImages.length - 1}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index, true)}
                                        className="p-1 bg-white rounded-full text-red-600 hover:text-red-800"
                                      >
                                        <Trash size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4 border-t">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
  )
}

export default EditMyItem