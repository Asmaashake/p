import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dash";
import './AppStyles.css';

export default function App() {
const isLoggedIn = localStorage.getItem("isLoggedIn");
return (
    <Router>
    <Routes>
        <Route
        path="/"
        element={ <Login />}
            />
    
        <Route
        path="/dash"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
    </Routes>
    </Router>
);
}
