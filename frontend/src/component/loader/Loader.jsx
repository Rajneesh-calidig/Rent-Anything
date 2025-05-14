// import { useContext } from "react";
// import { LoaderContext } from "../../providers/Loader/LoaderProvider";
// export const Loader = () => {
//   const { isLoading, loaderText } = useContext(LoaderContext);
//   return (
//     <>
//       {isLoading ? (
//         <div className="h-full w-full fixed top-0 left-0 bg-black/20 z-[99999]">
//           <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
//             <span className="loading loading-spinner loading-lg text-primary" />
//             <span className="text text-3xl">{loaderText}</span>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };
"use client";

import { useContext } from "react";
import { LoaderContext } from "../../providers/Loader/LoaderProvider";

export const Loader = () => {
  const { isLoading, loaderText } = useContext(LoaderContext);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[99999] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-xs w-full mx-4">
        {/* Custom spinner with gradient */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600 animate-spin"></div>
        </div>

        {/* Loading text with gradient */}
        {loaderText && (
          <div className="text-center">
            <span className="text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {loaderText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
