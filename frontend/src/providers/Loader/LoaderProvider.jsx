import React, { createContext, useState, useContext } from "react";

export const LoaderContext = React.createContext({
  isLoading: false,
  loaderText: "",
  start: () => {},
  stop: () => {},
});

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  const start = (text = "Loader ...") => {
    setLoaderText(text);
    setIsLoading(true);
  };

  const stop = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, start, stop, loaderText }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const loaderContext = useContext(LoaderContext);

  if (!loaderContext) {
    throw new Error(
      "Please use useLoader inside the context of LoaderProvider"
    );
  }

  return {
    start: loaderContext.start,
    stop: loaderContext.stop,
    isLoading: loaderContext.isLoading,
  };
};
