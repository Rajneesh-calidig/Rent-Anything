import { useContext } from "react";
import { LoaderContext } from "../../providers/Loader/LoaderProvider";
export const Loader = () => {
  const { isLoading, loaderText } = useContext(LoaderContext);
  return (
    <>
      {isLoading ? (
        <div className="h-full w-full fixed top-0 left-0 bg-black/20 z-[99999]">
          <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary" />
            <span className="text text-3xl">{loaderText}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
