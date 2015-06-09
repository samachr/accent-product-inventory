var sqlite3 = require('sqlite3').verbose();
var dbdir = process.env.OPENSHIFT_DATA_DIR || 'database/';
// var db = new sqlite3.Database(dbdir + 'inventory.db');
var db = new sqlite3.Database(':memory:');
 var example = true;

db.run("CREATE TABLE IF NOT EXISTS productInventory (id INTEGER PRIMARY KEY, price REAL, picture TEXT, name TEXT, stock INT, brand text)");
db.run("CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY, brand TEXT)");
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, userid INT, count INT, price REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS images (filename TEXT)");

if(example) {
  db.serialize(function() {

    db.run("INSERT INTO brands (brand) VALUES (?)", "Kevin Murphy");
    db.run("INSERT INTO brands (brand) VALUES (?)", "Scruples");
    db.run("INSERT INTO brands (brand) VALUES (?)", "Lamas");

    db.run("INSERT INTO images (filename) VALUES (?)", "1.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "2.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "3.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "4.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "5.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "6.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "7.jpg");
    db.run("INSERT INTO images (filename) VALUES (?)", "8.jpg");

    db.run("INSERT INTO users (name) VALUES (?)", "Cindy");
    db.run("INSERT INTO users (name) VALUES (?)", "Marva");
    db.run("INSERT INTO users (id, name) VALUES (?, ?)", [100, "Jill"]);

    db.run("INSERT INTO transactions (userid, count, price) VALUES (?, ?, ?)", [100,2,39.90]);
    db.run("INSERT INTO transactions (userid, count, price) VALUES (?, ?, ?)", [100,5,5.90]);
    db.run("INSERT INTO transactions (userid, count, price) VALUES (?, ?, ?)", [100,1,34.90]);

    categories = ["shampoo", "nailCare", "fragrance"];
    names = ["kevin murphy shampoo", "scruples hair style volumizer"];
    var stmt = db.prepare("INSERT INTO productInventory (price, picture, name, stock, brand) VALUES (?, ?, ?, ?, ?)");
    for (var i = 0; i < 50; i++) {
      stmt.run(i*2%30, i%6+1 + ".jpg", names[i%2] , i*12%5, (i*7%4)%3+1);
    }
    stmt.finalize();

  });
}

module.exports = db;
