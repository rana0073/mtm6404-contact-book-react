import React from "react"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContactList from "./pages/Contactlist";
import ContactDetails from "./pages/ContactDetails";
import ContactForm from "./pages/ContactForm";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ContactList />} />
          <Route path="contact/:id" element={<ContactDetails />} />
          <Route path="new" element={<ContactForm />} />
          <Route path="edit/:id" element={<ContactForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
