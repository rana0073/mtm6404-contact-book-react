import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase"; // your Firebase config
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export default function ContactForm() {
  const { id } = useParams(); // Will be undefined for "new" route
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const contactsCollection = collection(db, "contacts");

  // If editing, fetch the contact data
  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContact(docSnap.data());
        }
      };
      fetchContact();
    }
  }, [id]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      // Update existing contact
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, contact);
      navigate(`/contact/${id}`);
    } else {
      // Add new contact
      const docRef = await addDoc(contactsCollection, contact);
      navigate(`/contact/${docRef.id}`);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Contact" : "Add Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? "Update" : "Add"} Contact</button>
      </form>
    </div>
  );
}
