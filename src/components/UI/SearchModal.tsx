import React from "react";

const SearchModal = ({ isOpen, results, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-[#1e293b] via-[#273849] to-[#1f2937] rounded-2xl p-6 max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-bold">Search Results</h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl transition"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {results.length === 0 ? (
            <p className="text-gray-400 text-center">No results found</p>
          ) : (
            results.map((entry: any) => (
              <div
                key={entry._id}
                className="rounded-2xl overflow-hidden p-[1px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white min-w-[300px]"
              >
                <div className="bg-black/80 rounded-2xl">
                  <div className="h-full py-4 rounded-2xl px-5 bg-gray-800">
                    <div className="flex items-center justify-between">
                      {/* Position */}
                      <h1 className="text-3xl text-center font-bold flex items-baseline justify-center">
                        {entry.rank || "N/A"}
                        <span className="text-sm self-center bg-[#1919194D] rounded-full px-4 py-1 ml-4 font-normal">
                          position
                        </span>
                      </h1>

                      {/* User Details */}
                      <div className="flex items-center my-4 space-x-4">
                        <img
                          src={entry.profile_url || "/avatar.jpeg"}
                          alt={entry.user_name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-white"
                          onError={(e) =>
                            (e.currentTarget.src = "/avatar.jpeg")
                          }
                        />
                      </div>
                    </div>

                    {/* Points */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-md">@{entry.user_name}</span>

                      <p className="text-sm ml-1 font-normal">
                        <span className="text-xl font-bold mr-1">
                          {entry.points || 0}
                        </span>{" "}
                        pts
                      </p>
                    </div>

                    {/* League and Competition */}
                    <div className="mt-4">
                      <p className="flex text-sm justify-between">
                        <span className="text-gray-300">League</span>
                        {entry.league || "N/A"}
                      </p>
                      <p className="flex justify-between text-sm mt-2">
                        <span className="text-gray-300">Competition</span>
                        {entry.competition || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
