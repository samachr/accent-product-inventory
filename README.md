Useful Scripts
====
  1. backup database:
    sqlite3 inventory.db .dump > db-backup.bak
  2. Restore database: (delete database first)
    mv inventory.db inventory.db.old && sqlite3 inventory.db < db-backup.bak

(UNTESTED: database stuff may crash the server if anyone is using it at the same time)

this is the production server code

based on the openshift nodejs cartrige boilerplate.

The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs
