import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your NodeJS backend URL
});

// Fetch all tickets
export const getTickets = () => API.get("/tickets");

// Create new ticket
export const createTicket = (ticketData) => API.post("/tickets", ticketData);