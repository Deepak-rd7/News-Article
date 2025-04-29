// pages/Home.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NewsFeed from "./components/NewsFeed";
import SignupPage from "./pages/SignupPage";
import BookmarksPage from "./pages/BookmarkPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import NewsFeedPage from "./pages/NewsFeedPage";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsfeed/:articleType" element={<NewsFeedPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
