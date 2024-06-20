const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(()=> {
  db.run(`CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    artist TEXT NOT NULL, 
    genre TEXT,
    release_year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
    )`);

  const stmt = db.prepare("INSERT INTO songs (title, artist, genre, release_year) VALUES (?, ?, ?, ?)");
  stmt.run("killer","HYBS","R&B",2022);
  stmt.run("끝났다는 것은 다시 시작된다는 것을","Warak","Game", 2023);
  stmt.finalize();

  db.each("SELECT id, title, artist, genre, release_year FROM songs", (err, row) => {
    if(err){
      console.error(err.message);
    }
    console.log(row.id + " : " + row.title + " | " + row.artist + " | " + row.genre + " | " + row.release_year);
  });

  db.close((err) => {
    if(err) {
      console.error(err.message);
    }
    console.log('close the database connection.');
  })
})