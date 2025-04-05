const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../events.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL,
            location TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const all = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Service methods
exports.getAllEvents = async () => {
    return await all('SELECT * FROM events ORDER BY date');
};

exports.getEventById = async (id) => {
    return await get('SELECT * FROM events WHERE id = ?', [id]);
};

exports.createEvent = async (eventData) => {
    const { title, description, date, location } = eventData;
    const result = await run(
        'INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)',
        [title, description, date, location]
    );
    return result.lastID;
};

exports.updateEvent = async (id, eventData) => {
    const { title, description, date, location } = eventData;
    await run(
        'UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?',
        [title, description, date, location, id]
    );
};

exports.deleteEvent = async (id) => {
    await run('DELETE FROM events WHERE id = ?', [id]);
}; 