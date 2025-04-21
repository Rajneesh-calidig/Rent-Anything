import React, { useCallback, useContext, useEffect, useState } from "react";
import { useInterceptor } from "../Interceptor/InterceptorProvider.jsx";
import { useAuth } from "../Auth/AuthProvider.jsx";

const defaultItems = [];

const ItemContext = React.createContext({
  items: defaultItems,
  myItems: defaultItems,
  reviews: [],
  selectedItem: null,
  fetchItems: async () => {},
  fetchReviews: async () => {},
  getItem: async () => {},
  addItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
  setSelectedItem: () => {},
  searchItems: async () => {},
  createReview: async () => {},
  getReviews: async () => {},
  getMyItems: async () => {},
});

export const ItemProvider = ({ children }) => {
  const { api } = useInterceptor();
  const {user} = useAuth();
  const [items, setItems] = useState(defaultItems);
  const [myItems, setMyItems] = useState(defaultItems);
  const [reviews,setReviews] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      const response = await api.get("/items");
      setItems(response.data.data);
      return response;
    } catch (err) {
      console.error("Failed to fetch items:", err);
      return Promise.reject(err);
    }
  }, [api]);
  const fetchReviews = useCallback(async (id) => {
    try {
      const response = await api.get(`/review/${id}`);
      setItems(response.data.data);
      return response;
    } catch (err) {
      console.error("Failed to fetch items:", err);
      return Promise.reject(err);
    }
  }, [api]);

  const getItem = useCallback(async (id) => {
    try {
      const response = await api.get(`/items/${id}`);
      setSelectedItem(response.data);
      return response.data;
    } catch (err) {
      console.error(`Failed to get item with id ${id}:`, err);
      return Promise.reject(err);
    }
  }, [api]);

  const getMyItems = useCallback(async (userId) => {
    try {
      const response = await api.get(`/items/my-items/${userId}`);
      if(response.data.message === "success"){
        setMyItems(response.data.data);
      }
      console.log(response.data.data);
      return response;
    } catch (err) {
      console.error(`Failed to get items for user with id ${userId}:`, err);
      return Promise.reject(err);
    }
  }, [api]);

  const addItem = useCallback(async (data) => {
    try {
      const response = await api.post("/items", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setItems((prev) => [...prev, response.data]);
      return response;
    } catch (err) {
      console.error("Failed to create item:", err);
      return Promise.reject(err);
    }
  }, [api]);

  const updateItem = useCallback(async (id, data) => {
    try {
      const response = await api.put(`/items/${id}`, data);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      return response;
    } catch (err) {
      console.error(`Failed to update item with id ${id}:`, err);
      return Promise.reject(err);
    }
  }, [api]);

  const deleteItem = useCallback(async (id) => {
    try {
      const response = await api.delete(`/items/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
      return response;
    } catch (err) {
      console.error(`Failed to delete item with id ${id}:`, err);
      return Promise.reject(err);
    }
  }, [api]);

  const searchItems = useCallback(async (query) => {
    try {
      const response = await api.get(`/items/search`, { params: query });
      setItems(response.data.data);
      console.log(response.data.data);
      return response;
    } catch (err) {
      console.error("Failed to search items:", err);
      return Promise.reject(err);
    }
  }, [api]);
  
  const createReview = useCallback(async (data) => {
    try {
      const response = await api.post(`/review`, data);
      return response;
    } catch (err) {
      console.error("Failed to search items:", err);
      return Promise.reject(err);
    }
  }, [api]);

  const getReviews = useCallback(async (id) => {
    try {
      const response = await api.get(`/review/${id}/reviews`);
      setReviews(response.data);
      return response.data;
    } catch (err) {
      console.error(`Failed to get item with id ${id}:`, err);
      return Promise.reject(err);
    }
  }, [api]);

  useEffect(() => {
    if(user._id){
      getMyItems(user._id);
    }
  }, [getMyItems,user]);

  return (
    <ItemContext.Provider
      value={{
        items,
        myItems,
        reviews,
        selectedItem,
        fetchItems,
        fetchReviews,
        getItem,
        addItem,
        updateItem,
        deleteItem,
        setSelectedItem,
        searchItems,
        createReview,
        getReviews,
        getMyItems
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export function useItem() {
  return useContext(ItemContext);
}
