const CheckinCard = () => {
    const percentage = 50
  return (
    //       <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
    <div className=" p-[1px] bg-gradient-to-b from-[#454545] to-[#3c3c3c] text-white rounded-2xl shadow-lg">
    <div className="flex flex-col md:flex-row items-center  justify-between mx-auto p-4 bg-[#121212] text-white rounded-2xl shadow-lg">


      <div className="flex flex-col space-y-1">
        <h2 className="text-lg font-semibold">Today's Checkins</h2>
        <p className="text-sm text-gray-400">
          Total 6, mark them before the end of the day
        </p>
      </div>

      <div className=" flex items-center justify-center space-x-4">
        <div className="text-center">
          <p className="text-green-500 text-xl font-bold">2</p>
          <p className="text-xs">Done</p>
        </div>
        <div className="text-center">
          <p className="text-red-500 text-xl font-bold">4</p>
          <p className="text-xs">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-green-500 text-xl font-bold">34 min</p>
          <p className="text-xs">Time</p>
        </div>
        <div className="flex items-center">
              <div className="h-2 w-[200px] bg-gray-700 rounded-full relative ">
                <div
                  className={"h-full rounded-full bg-green-500" }
                  style={{ width: `${percentage}%` }}
                  ></div>
              </div>
              <span className="ml-2 text-sm">{percentage}%</span>
            </div>
      </div>
                  </div>
                  </div>
         
  
  );
};

export default CheckinCard;
