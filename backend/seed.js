const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'atlas.db');
const db = new sqlite3.Database(dbPath);

const listings = [
    {
        title: "Steel Flatbed – 8ft",
        condition: "New",
        price: "$2,450",
        fits: "Ford F-250/F-350 (2017–2025)",
        location: "Houston, TX",
        image: "https://images.unsplash.com/photo-1588620864359-2228c2ddde6d?w=800&auto=format&fit=crop&q=60", // Placeholder for now
        description: "Heavy-duty steel flatbed with headache rack, stake pockets, and LED lights. Ready for work."
    },
    {
        title: "Utility Bed w/ Toolboxes",
        condition: "Used",
        price: "$1,800",
        fits: "Chevy Silverado 2500HD",
        location: "Dallas, TX",
        image: "https://images.unsplash.com/photo-1605218456182-ad57ab9c18bf?w=800&auto=format&fit=crop&q=60",
        description: "Utility body with locking toolboxes, ladder rack, and spacious cargo area. Great condition."
    },
    {
        title: "Aluminum Flatbed – 9ft",
        condition: "New",
        price: "$3,200",
        fits: "Ram 3500 (2019–2025)",
        location: "Phoenix, AZ",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60",
        description: "Lightweight yet durable aluminum flatbed. Rust-resistant and fuel-efficient design."
    }
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      condition TEXT NOT NULL,
      price TEXT NOT NULL,
      fits TEXT NOT NULL,
      location TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const stmt = db.prepare("INSERT INTO listings (title, condition, price, fits, location, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)");

    listings.forEach(listing => {
        stmt.run(listing.title, listing.condition, listing.price, listing.fits, listing.location, listing.image, listing.description);
    });

    stmt.finalize();
    console.log("Database seeded successfully");
});

db.close();
