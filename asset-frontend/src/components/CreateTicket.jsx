import { useState } from "react";
import { createTicket } from "../services/api";

const CreateTicket = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    raised_by: "",
    assigned_asset: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(form);
      alert("Ticket created successfully!");
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <select name="priority" onChange={handleChange}>
        <option value="low">Low</option>
        <option value="HIGH">High</option>
      </select>
      <input name="raised_by" placeholder="Raised By (user ID)" onChange={handleChange} />
      <input name="assigned_asset" placeholder="Asset ID" onChange={handleChange} />
      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default CreateTicket;
