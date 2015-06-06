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

"core-header-panel": "Polymer/core-header-panel#^0.5",
"core-toolbar": "Polymer/core-toolbar#~0.5.6",
"paper-tabs": "Polymer/paper-tabs#~0.5.6",
"core-ajax": "polymer/core-ajax#~0.5.6",
"paper-button": "polymer/paper-button#~0.5.6",
"polymer": "^0.5",
"paper-fab": "polymer/paper-fab#~0.5.6",
"paper-toast": "polymer/paper-toast#~0.5.6",
"paper-dialog": "polymer/paper-dialog#~0.5.6",
