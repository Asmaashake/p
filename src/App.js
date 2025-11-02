import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Form1 from "./component/Form1";
import Form2 from "./component/Form2";
import "./AppStyles.css";
import ProtectedRoute from "./component/ProtectedRoute";
import Ai from "./component/Ai";
import AdminPage from "./component/admin";
import QuestionManager from "./component/QuestionManager";
import SurveyDashboard from "./component/SurveyDashboard";
import SurveyForm from "./component/SurveyForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute>
              <QuestionManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys"
          element={
            <ProtectedRoute>
              <SurveyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/survey/:type"
          element={
            <ProtectedRoute>
              <SurveyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
