import { useState } from "react";
import Academic from "./Academic";
import University from "./University";

export function Universitymodule() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsData = [
    {
      label: "University",
      content: <University />,
    },
    {
      label: "Academic Programs",
      content: <Academic />,
    },
  ];

  return (
    <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
      <div className="my-10 grid grid-cols-1">
        <p className=" mb-2 text-4xl font-semibold text-[#280559]">
          University Module
        </p>
        <p className=" font text-base text-[#9898A3]">
          View all University and programs
        </p>
      </div>
      <div className="mb-7 flex items-center gap-10 overflow-x-auto rounded-[34px] bg-white px-8 xl:px-[64px]">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`whitespace-nowrap border-t-4 py-9 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "border-[#280559]"
                  : "border-transparent hover:border-gray-200 "
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              <p
                className={`text-lg font-semibold xl:text-2xl ${
                  idx === activeTabIndex ? "text-[#280559]" : "text-[#92929D] "
                }`}
              >
                {tab.label}
              </p>
            </button>
          );
        })}
      </div>
      <div className="overflow-x-hidden">
        {tabsData[activeTabIndex].content}
      </div>
    </div>
  );
}

export default Universitymodule;

// import { useState } from "react";
// import { NavLink, Route, Switch } from "react-router-dom";
// import Academic from "./Academic";
// import University from "./University";

// export function Universitymodule() {
//   const [activePath, setActivePath] = useState("/university");
//   const tabsData = [
//     {
//       label: "University",
//       path: "/university",
//       content: <University />,
//     },
//     {
//       label: "Academic Programs",
//       path: "/academic",
//       content: <Academic />,
//     },
//   ];

//   return (
//     <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
//       <div className="my-10 grid grid-cols-1">
//         <p className=" mb-2 text-4xl font-semibold text-[#280559]">
//           University Module
//         </p>
//         <p className=" font text-base text-[#9898A3]">
//           View all University and programs
//         </p>
//       </div>
//       <div className="mb-7 flex items-center gap-10 overflow-x-auto rounded-[34px] bg-white px-8 xl:px-[64px]">
//         {tabsData.map((tab, idx) => {
//           return (
//             <NavLink
//               key={idx}
//               to={tab.path}
//               className={`whitespace-nowrap border-t-4 py-9 transition-colors duration-300 ${
//                 tab.path === activePath
//                   ? "border-[#280559] text-[#280559]"
//                   : "border-transparent text-[#92929D] hover:border-gray-200"
//               }`}
//               onClick={() => setActivePath(tab.path)}
//             >
//               <p
//                 className={`text-lg font-semibold xl:text-2xl ${
//                   tab.path === activePath ? "text-[#280559]" : "text-[#92929D]"
//                 }`}
//               >
//                 {tab.label}
//               </p>
//             </NavLink>
//           );
//         })}
//       </div>
//       <div className="overflow-x-hidden">
//         <Switch>
//           {tabsData.map((tab, idx) => {
//             return (
//               <Route key={idx} path={tab.path}>
//                 {tab.content}
//               </Route>
//             );
//           })}
//         </Switch>
//       </div>
//     </div>
//   );
// }

// export default Universitymodule;
