import React from 'react'

const ProgressBar = ({percentage}:any) => {

    const color = percentage < 50 ? 'bg-red-600' : 'bg-green-600';


  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700 relative">
    <div
      className={"h-full bg-red-600 rounded-full transition duration-500" + color}
      style={{ width: `${percentage}%` }} // Dynamic width based on the percentage
    >
      {/* Progress bar content */}
    </div>
    {/* White dot at the end of progress */}
    <div
      className="absolute top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] bg-white rounded-full shadow-md"
      style={{
        right: `calc(100% - ${percentage}% - (-5px))`, // Position at the end of progress
      }}
    />
  </div>
  )
}

export default ProgressBar
