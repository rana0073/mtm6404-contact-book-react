import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    async function fetchContacts() {
      const q = query(collection(db, "contacts"), orderBy("lastName"));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
      setLoading(false);
    }
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "contacts", id));
    setContacts(contacts.filter(contact => contact.id !== id));
    if (selectedContact?.id === id) setSelectedContact(null);
  };

  const startEditing = (contact) => {
    setEditingContactId(contact.id);
    setEditForm(contact);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    const contactRef = doc(db, "contacts", id);
    await updateDoc(contactRef, editForm);
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, ...editForm } : contact
    ));
    setEditingContactId(null);
  };

  const filteredContacts = contacts.filter(({ firstName, lastName }) =>
    `${firstName} ${lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div>
      <h2>Contact List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <ul>

        {filteredContacts.map(contact => (
          <li key={contact.id} style={{ marginBottom: "10px" }}>
            {editingContactId === contact.id ? (
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditChange}
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="Phone"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  placeholder="Address"
                />
                <button onClick={() => saveEdit(contact.id)}>Save</button>
                <button onClick={() => setEditingContactId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <button onClick={() => navigate("/add")}>Add New Contact</button>

                <span
                  onClick={() => setSelectedContact(contact)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {contact.lastName}, {contact.firstName}
                </span>
                {" "}
                <button onClick={() => startEditing(contact)}>Edit</button>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {selectedContact && (
        <div style={{ marginTop: "20px", border: "1px solid gray", padding: "10px" }}>
          <h3>Contact Details</h3>
          <p><strong>First Name:</strong> {selectedContact.firstName}</p>
          <p><strong>Last Name:</strong> {selectedContact.lastName}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Address:</strong> {selectedContact.address}</p>
          <button onClick={() => setSelectedContact(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ContactList;
