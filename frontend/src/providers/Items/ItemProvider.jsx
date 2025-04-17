import React, { useCallback, useContext, useEffect, useState } from "react";
import { useInterceptor } from "../Interceptor/InterceptorProvider.jsx";
import { searchItems } from "../../../../server/src/controllers/items.controller.js";

const defaultItems = [];

const ItemContext = React.createContext({
  items: defaultItems,
  selectedItem: null,
  fetchItems: async () => {},
  fetchReviews: async () => {},
  getItem: async () => {},
  addItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
  setSelectedItem: () => {},
  searchItems: async () => {},
});

export const ItemProvider = ({ children }) => {
  const { api } = useInterceptor();
  const [items, setItems] = useState(defaultItems);
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
      return response;
    } catch (err) {
      console.error("Failed to search items:", err);
      return Promise.reject(err);
    }
  }, [api]);

  // useEffect(() => {
  //   fetchItems();
  // }, [fetchItems]);

  return (
    <ItemContext.Provider
      value={{
        items,
        selectedItem,
        fetchItems,
        fetchReviews,
        getItem,
        addItem,
        updateItem,
        deleteItem,
        setSelectedItem,
        searchItems
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export function useItem() {
  return useContext(ItemContext);
}
