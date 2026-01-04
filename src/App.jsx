import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Ajuda from "./pages/Ajuda";

import Home from "./pages/Home";
import Adoption from "./pages/Adoption";
import Cases from "./pages/Cases";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import Cats from "./pages/admin/Cats";
import Posts from "./pages/admin/Posts";
import CatForm from "./pages/admin/CatForm";
import PostForm from "./pages/admin/PostForm";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopcion" element={<Adoption />} />
        <Route path="/casos-dificiles" element={<Cases />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/quienes-somos" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cats" element={<Cats />} />
          <Route path="cats/new" element={<CatForm />} />
          <Route path="cats/:id/edit" element={<CatForm />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/new" element={<PostForm />} />
          <Route path="posts/:id/edit" element={<PostForm />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
