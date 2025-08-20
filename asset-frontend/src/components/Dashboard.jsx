import { useEffect, useState } from "react";
import { getTickets } from "../services/api";

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  return (
    <div>
      <h1>Tickets Dashboard</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Raised By</th>
            <th>Asset</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.raised_by}</td>
              <td>{ticket.asset_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
