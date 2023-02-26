import { Routes, Route } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { createContext, useState, useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import ApplicantDashboard from "./layouts/ApplicantDashboard";

export const NavbarCtx = createContext();

function App() {

  const [navbar, setNavbar] = useState({isMobile: false, mobileExpand: false, desktopExpand: false, overlap: false})
  const windowSize = useWindowSize();

  useEffect(() => {
    if(windowSize === 'xl' || windowSize === '2xl'){
      setNavbar({isMobile: false, mobileExpand: false, desktopExpand: true, overlap: false});
    }
    else if(windowSize === 'md' || windowSize === 'lg'){
      setNavbar({isMobile: false, mobileExpand: false, desktopExpand: false, overlap: windowSize === 'md'});
    }
    else if(windowSize === 'xs' || windowSize === 'sm'){
      setNavbar({isMobile: true, mobileExpand: false, desktopExpand: false, overlap: true});
    }
  
}, [windowSize]);


  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/applicant/*" element={<NavbarCtx.Provider value={{navbar, setNavbar}}> <ApplicantDashboard /> </NavbarCtx.Provider>} />
      <Route path="/dashboard/*" element={<NavbarCtx.Provider value={{navbar, setNavbar}}> <Dashboard /> </NavbarCtx.Provider>} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes> 

  );
}

export default App;