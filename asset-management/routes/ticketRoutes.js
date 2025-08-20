const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.ticket_id, t.title, t.description, t.status, t.priority,
             e.name AS raised_by, a.asset_name, t.created_at, t.updated_at
      FROM tickets t
      LEFT JOIN employees e ON t.raised_by = e.employee_id
      LEFT JOIN assets a ON t.assigned_asset = a.asset_id
      ORDER BY t.created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tickets:", err.message);
    res.status(500).json({ error: "Server error while fetching tickets" });
  }
});



router.post("/", async (req, res) => {
  try {
    const { title, description, priority, raised_by, assigned_asset } = req.body;

    // Basic validation
    if (!title || !raised_by || !assigned_asset) {
      return res.status(400).json({ error: "Title, raised_by, and assigned_asset are required" });
    }

    // ✅ Check if asset exists
    const assetCheck = await pool.query("SELECT * FROM assets WHERE asset_id = $1", [assigned_asset]);
    if (assetCheck.rows.length === 0) {
      return res.status(400).json({ error: "Invalid asset_id. Asset does not exist." });
    }

    // ✅ Check if employee exists
    const employeeCheck = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [raised_by]);
    if (employeeCheck.rows.length === 0) {
      return res.status(400).json({ error: "Invalid raised_by. Employee does not exist." });
    }

    // Insert ticket
    const result = await pool.query(
      `INSERT INTO tickets (title, description, priority, raised_by, assigned_asset)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [title, description, priority || "MEDIUM", raised_by, assigned_asset]
    );

    // Log creation
    await pool.query(
      `INSERT INTO ticket_logs (ticket_id, action, new_status, changed_by)
       VALUES ($1, 'CREATED', 'OPEN', $2);`,
      [result.rows[0].ticket_id, raised_by]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Error creating ticket:", err.message);
    res.status(500).json({ error: "Server error while creating ticket" });
  }
});


module.exports = router;