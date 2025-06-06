const db = require('../config/db'); // MySQL connection

exports.createWarehouse = async (req, res) => {
  try {
    const {
      name, code, capacity, address_line, landmark,
      city, state, pin_code, manager_name, manager_phone,
      created_by
    } = req.body;

    const sql = `
      INSERT INTO warehouses 
      (name, code, capacity, address_line, landmark, city, state, pin_code, manager_name, manager_phone, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [name, code, capacity, address_line, landmark, city, state, pin_code, manager_name, manager_phone, created_by];

    await db.query(sql, values);
    res.status(201).json({ message: 'Warehouse created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllWarehouses = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM warehouses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM warehouses WHERE warehouse_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const {
      name, code, capacity, address_line, landmark,
      city, state, pin_code, manager_name, manager_phone,
      updated_by
    } = req.body;

    const sql = `
      UPDATE warehouses SET 
      name=?, code=?, capacity=?, address_line=?, landmark=?, city=?, state=?, 
      pin_code=?, manager_name=?, manager_phone=?, updated_by=? 
      WHERE warehouse_id=?`;

    const values = [name, code, capacity, address_line, landmark, city, state, pin_code, manager_name, manager_phone, updated_by, req.params.id];

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Warehouse not found' });

    res.json({ message: 'Warehouse updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM warehouses WHERE warehouse_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Warehouse not found' });
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
