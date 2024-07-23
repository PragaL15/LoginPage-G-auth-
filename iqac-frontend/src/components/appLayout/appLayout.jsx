// appLayout.jsx

import React, { useState } from "react";
import "./appLayout.css";
import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
import VerticalNavbar from "../verticalNavbar/verticalNavbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../../allPages/dashboard/Dashboard";
import Nptel from "../../allPages/NPTEL/Nptel";
import OneCredit from "../../allPages/oneCredit/OneCredit";
import Facultymap from "../../allPages/MarkEntry/SubjectAllocation/facultymap";
import Markentry from "../../allPages/MarkEntry/MarkEntry/markentry";
import Login from "../../allPages/Login/login";
import Logout from "../../Logout/logout";
import MainForm from "../../allPages/form_entry/main_form";

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeVerticalNavbar = () => {
    setIsMenuOpen(false); 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return isLoginPage ? <Login /> : <MainLayout />;
}

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeVerticalNavbar = () => {
    setIsMenuOpen(false); 
  };

  return (
    <div>
      <div className="h-navbar">
        <HorizontalNavbar toggleVerticalNavbar={toggleVerticalNavbar} />
      </div>
      <div className="v-nav-and-content">
        <div className={`v-navbar ${isMenuOpen ? "open" : ""}`}>
          <VerticalNavbar onClose={closeVerticalNavbar} />
        </div>
        <div className="content">
          <div className="content-with-margin">
            <Routes>
              <Route path="/nptel" element={<Nptel />} />
              <Route path="/onecredit" element={<OneCredit />} />
              <Route path="/facultymap" element={<Facultymap />} />
              <Route path="/markentry" element={<Markentry />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/mainform" element={<MainForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
