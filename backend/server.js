const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, '../dist')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

// Database Setup
const dbPath = path.join(__dirname, 'atlas.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      condition TEXT NOT NULL,
      price TEXT NOT NULL,
      old_price TEXT,
      category TEXT,
      fits TEXT NOT NULL,
      location TEXT NOT NULL,
      image TEXT NOT NULL,
      images TEXT,
      description TEXT,
      pinned INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
            if (!err) {
                // Migrations
                db.run("ALTER TABLE listings ADD COLUMN images TEXT", (err) => { });
                db.run("ALTER TABLE listings ADD COLUMN pinned INTEGER DEFAULT 0", (err) => { });
                db.run("ALTER TABLE listings ADD COLUMN old_price TEXT", (err) => { });
                db.run("ALTER TABLE listings ADD COLUMN category TEXT", (err) => { });
            }
        });
    }
});

app.get('/api/listings', (req, res) => {
    const sql = "SELECT * FROM listings ORDER BY pinned DESC, created_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        const parsedRows = rows.map(row => ({
            ...row,
            images: row.images ? JSON.parse(row.images) : [row.image]
        }));
        res.json(parsedRows);
    });
});

app.get('/api/listings/:id', (req, res) => {
    const sql = "SELECT * FROM listings WHERE id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            row.images = row.images ? JSON.parse(row.images) : [row.image];
        }
        res.json(row);
    });
});

app.post('/api/listings', upload.any(), (req, res) => {
    const { title, condition, price, old_price, category, fits, location, description, pinned } = req.body;
    console.log('--- NEW LISTING ---');
    console.log('Title:', title);
    console.log('Price:', price);
    console.log('Old Price:', old_price);
    console.log('Category:', category);

    const files = req.files || [];
    const imagePaths = files.map(file => `/uploads/${file.filename}`);
    const mainImage = imagePaths[0] || '';
    const imagesJson = JSON.stringify(imagePaths);
    const isPinned = pinned === 'true' || pinned === '1' || pinned === 1 ? 1 : 0;

    const sql = `INSERT INTO listings (title, condition, price, old_price, category, fits, location, image, images, description, pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [title, condition, price, old_price, category, fits, location, mainImage, imagesJson, description, isPinned];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Insert error:', err.message);
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

app.put('/api/listings/:id', upload.any(), (req, res) => {
    const { title, condition, price, old_price, category, fits, location, description, pinned } = req.body;
    const id = req.params.id;
    console.log('--- UPDATE LISTING ---', id);
    console.log('Price:', price);
    console.log('Old Price:', old_price);
    console.log('Category:', category);

    const isPinned = pinned === 'true' || pinned === '1' || pinned === 1 ? 1 : 0;

    let sql, params;
    if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        const mainImage = imagePaths[0];
        const imagesJson = JSON.stringify(imagePaths);
        sql = `UPDATE listings SET title = ?, condition = ?, price = ?, old_price = ?, category = ?, fits = ?, location = ?, image = ?, images = ?, description = ?, pinned = ? WHERE id = ?`;
        params = [title, condition, price, old_price, category, fits, location, mainImage, imagesJson, description, isPinned, id];
    } else {
        sql = `UPDATE listings SET title = ?, condition = ?, price = ?, old_price = ?, category = ?, fits = ?, location = ?, description = ?, pinned = ? WHERE id = ?`;
        params = [title, condition, price, old_price, category, fits, location, description, isPinned, id];
    }

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Update error:', err.message);
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "changes": this.changes
        });
    });
});

app.patch('/api/listings/:id/toggle-pin', (req, res) => {
    const id = req.params.id;
    db.get("SELECT pinned FROM listings WHERE id = ?", [id], (err, row) => {
        if (err || !row) {
            res.status(404).json({ error: "Listing not found" });
            return;
        }
        const newPinned = row.pinned ? 0 : 1;
        db.run("UPDATE listings SET pinned = ? WHERE id = ?", [newPinned, id], function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: "success", pinned: newPinned });
        });
    });
});

app.delete('/api/listings/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM listings WHERE id = ?";
    db.run(sql, id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

// Admin Authentication
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'atlas2026') {
        res.json({ message: "Login successful", token: "fake-jwt-token-for-demo" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// Catch-all route to serve the frontend's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
