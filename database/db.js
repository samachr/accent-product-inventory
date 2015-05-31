var sqlite3 = require('sqlite3').verbose();
var dbdir = process.env.OPENSHIFT_DATA_DIR || 'database/';
var db = new sqlite3.Database(dbdir + 'inventory.db');

db.run("CREATE TABLE IF NOT EXISTS productInventory (id INTEGER PRIMARY KEY, price REAL, picture INT, name TEXT, stock INT, brand text)");
db.run("CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY, brand TEXT)");
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, userid INT, count INT, price REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

if(example) {
  db.serialize(function() {
    db = new sqlite3.Database(':memory:');

    db.run("CREATE TABLE IF NOT EXISTS productInventory (id INTEGER PRIMARY KEY, price REAL, picture INT, name TEXT, stock INT, brand text)");
    db.run("CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY, brand TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, userid INT, count INT, price REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

    db.run("INSERT INTO brands (brand) VALUES (?)", "Kevin Murphy");
    db.run("INSERT INTO brands (brand) VALUES (?)", "Scruples");
    db.run("INSERT INTO brands (brand) VALUES (?)", "Lamas");

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
      stmt.run(i*2%30, i%6+1, names[i%2], i*12%5, (i*7%4)%3+1);
    }
    stmt.finalize();

    // var sql = "SELECT id, barcode, description, image, favorite, category FROM productInventory";
    //
    // // Print the initial records as JSON
    // db.all(sql, function(err, rows) {
    //   console.log(rows);
    // });

  });
}

module.exports = db;
