Accent Product inventory
====
A product inventory management program in nodejs, angularjs, sqlite3, and polymer. A production used experiment with modern web technologies

Useful Scripts
====
  1. backup database:
    sqlite3 inventory.db .dump > db-backup.bak
  2. Restore database: (delete database first)
    mv inventory.db inventory.db.old && sqlite3 inventory.db < db-backup.bak

(UNTESTED: database stuff may crash the server if anyone is using it at the same time)

based on the openshift nodejs cartrige boilerplate.

The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs
