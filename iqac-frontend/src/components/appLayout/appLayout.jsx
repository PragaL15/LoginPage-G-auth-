import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
import VerticalNavbar from "../verticalNavbar/verticalNavbar";
import Dashboard from "../../allPages/dashboard/Dashboard";
import Nptel from "../../allPages/NPTEL/Nptel";
import OneCredit from "../../allPages/oneCredit/OneCredit";
import Facultymap from "../../allPages/MarkEntry/SubjectAllocation/facultymap";
import Markentry from "../../allPages/MarkEntry/MarkEntry/markentry";
import Login from "../../allPages/Login/login";
import Logout from "../../Logout/logout";
import MainForm from "../../allPages/form_entry/main_form";
import "./appLayout.css";

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      window.history.replaceState({}, document.title, "/dashboard");
    } else {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setIsAuthenticated(true);
      }
    }
  }, [location]);

  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeVerticalNavbar = () => {
    setIsMenuOpen(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <div className="total-app-layout">
          <HorizontalNavbar toggleVerticalNavbar={toggleVerticalNavbar} />
          <div className="v-nav-and-content">
            <VerticalNavbar className={`v-navbar ${isMenuOpen ? "open" : ""}`} onClose={closeVerticalNavbar} />
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/nptel" element={<Nptel />} />
                <Route path="/onecredit" element={<OneCredit />} />
                <Route path="/facultymap" element={<Facultymap />} />
                <Route path="/markentry" element={<Markentry />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/mainform" element={<MainForm />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default AppLayout;
