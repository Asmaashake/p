import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Form1 from './component/Form1';
import Form2  from  './component/Form2';
import './AppStyles.css';
import Ai from "./component/Ai";
import AdminPage from "./component/admin";
function PrivateRoute({ children }) {
const token = localStorage.getItem("authToken");
return token ? children : <Navigate to="/" />;
}
export default function App() {
const isLoggedIn = localStorage.getItem("isLoggedIn");
return (
  <Router>
    
    <Routes>
        <Route
        path="/"
        element={ <Login />}
            />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/admin" element={<AdminPage />}/>
            <Route path="/form1" element={<Form1 />} />
        <Route 
          path="/dash" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
      />
    
      </Routes>
        </Router> 
);
}
