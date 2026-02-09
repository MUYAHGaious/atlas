const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = './backend/atlas.db';
const db = new sqlite3.Database(dbPath);

console.log('--- DB INSPECTION START ---');
console.log('Path:', path.resolve(dbPath));

db.serialize(() => {
    db.all("PRAGMA table_info(listings)", (err, rows) => {
        if (err) console.error('Error info:', err);
        else {
            console.log('Columns:');
            rows.forEach(r => console.log(`  ${r.name} (${r.type})`));
        }
    });

    db.all("SELECT id, title, price, old_price, pinned FROM listings", (err, rows) => {
        if (err) console.error('Error select:', err);
        else {
            console.log('\nListings:');
            rows.forEach(r => {
                console.log(`ID: ${r.id} | Title: ${r.title} | Price: ${r.price} | Old: ${r.old_price} | Pinned: ${r.pinned}`);
            });
        }
    });
});
db.close();
