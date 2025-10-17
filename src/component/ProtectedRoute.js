// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");

  // 🔒 لو ما في توكن => يرجع لصفحة الدخول
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ لو في توكن => يعرض الصفحة المطلوبة
  return children;
}
