// import React, { useState, useEffect } from "react";
// import useStomp from "../hooks/useStomp";
// import UserStore from "../services/stores/UserStore";

// function OrderProgressBar(props) {
//   const [activeStep, setActiveStep] = useState(2);
//   const { messagesReceived, initialize } = useStomp();
//   const { getUserId } = UserStore();

//   const steps = [
//     { label: "Order Placed", icon: "1" },
//     { label: "Preparing", icon: "2" },
//     {
//       label: "Quality Checking & Packing",
//       icon: "3",
//     },
//     { label: "On The Way", icon: "4" },
//     { label: "Delivered", icon: "5" },
//   ];

//   useEffect(() => {
//     initialize(getUserId());
//     if (messagesReceived.text !== undefined) {
//       setActiveStep(messagesReceived.text);
//     } else {
//       setActiveStep(props.orderStatusId + 1);
//     }
//   }, [messagesReceived]);

//   return (
//     <ol className="mt-4 flex items-center w-full p-5 space-x-4 text-lg font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-xl dark:bg-gray-800 dark:border-gray-700 sm:p-6 sm:space-x-6 rtl:space-x-reverse">
//       {steps.map((step, index) => {
//         const isCompleted = index < activeStep - 1;
//         const isActive = index === activeStep - 1;
//         return (
//           <li
//             key={index}
//             className={`flex items-center justify-center ${
//               isCompleted
//                 ? "text-blue-600 dark:text-blue-500"
//                 : isActive
//                 ? "text-green-400"
//                 : ""
//             }`}
//           >
//             <span
//               className={`flex items-center justify-center w-8 h-8 me-3 text-base border ${
//                 isCompleted
//                   ? "border-blue-600 text-blue-600"
//                   : "border-gray-500 text-gray-500"
//               } rounded-full shrink-0 dark:border-gray-400 dark:text-gray-400`}
//             >
//               {step.icon}
//             </span>
//             <span className="text-lg sm:text-xl">{step.label}</span>
//             {index < steps.length - 1 && (
//               <svg
//                 className="w-4 h-4 ms-3 sm:ms-5 rtl:rotate-180"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 12 10"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m7 9 4-4-4-4M1 9l4-4-4-4"
//                 />
//               </svg>
//             )}
//           </li>
//         );
//       })}
//     </ol>
//   );
// }

// export default OrderProgressBar;
import React, { useState, useEffect } from "react";
import useStomp from "../hooks/useStomp";
import UserStore from "../services/stores/UserStore";

function OrderProgressBar(props) {
  const [activeStep, setActiveStep] = useState(2);
  const { messagesReceived, initialize } = useStomp();
  const { getUserId } = UserStore();

  const steps = [
    { label: "Order Placed", icon: "1" },
    { label: "Preparing", icon: "2" },
    {
      label: "Quality Checking & Packing",
      icon: "3",
    },
    { label: "On The Way", icon: "4" },
    { label: "Delivered", icon: "5" },
  ];

  useEffect(() => {
    initialize(getUserId());
    if (messagesReceived.text !== undefined) {
      setActiveStep(messagesReceived.text);
    } else {
      setActiveStep(props.orderStatusId + 1);
    }
  }, [messagesReceived]);

  return (
    <ol
      className="mt-4 w-full p-5 text-lg font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-xl dark:bg-gray-800 dark:border-gray-700 sm:p-6 flex flex-wrap gap-4 space-x-0"
      style={{
        "@media (minWidth: 1150px)": {
          display: "flex",
          flexWrap: "nowrap",
          gap: "1.5rem", // Adjust gap for larger screens
        },
      }}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep - 1;
        const isActive = index === activeStep - 1;

        return (
          <li
            key={index}
            className={`flex items-center ${
              isCompleted
                ? "text-blue-600 dark:text-blue-500"
                : isActive
                ? "text-green-400"
                : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8  mr-2 text-base border ${
                isCompleted
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-500 text-gray-500"
              } rounded-full shrink-0 dark:border-gray-400 dark:text-gray-400`}
            >
              {step.icon}
            </span>
            <span className="text-lg sm:text-xl">{step.label}</span>
            {index < steps.length - 1 && (
              <svg
                className="w-4 h-4 mx-3 sm:mx-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default OrderProgressBar;
