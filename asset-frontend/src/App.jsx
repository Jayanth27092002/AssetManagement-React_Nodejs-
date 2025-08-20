import React from "react";
import Dashboard from "./components/Dashboard";
import CreateTicket from "./components/CreateTicket";

function App() {
  return (
    <div>
      <h1>Asset Management Portal</h1>
      <CreateTicket />
      
      <Dashboard />
    </div>
  );
}

export default App;

