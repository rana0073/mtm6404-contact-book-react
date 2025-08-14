import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../db";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const getContact = async () => {
      const ref = doc(db, "contacts", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setContact(snap.data());
    };
    getContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Email: {contact.email}</p>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
