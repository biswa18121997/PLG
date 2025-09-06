import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import SummaryPage from "./components/SummaryPage";
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/:id" element={<SummaryPage />} />
                    <Route
                        path="/"
                        element={<div>Welcome! Go to /admin or /:id</div>}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
