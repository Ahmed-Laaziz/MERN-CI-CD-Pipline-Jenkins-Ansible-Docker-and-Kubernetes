// init-mongo.js
db = db.getSiblingDB('test');

db.agents.insertMany([
  {
    nom: 'admin',
    prenom: 'admin',
    email: 'admin@admin.com',
    tel: '123456789',
    cin: 'AB111111',
    password: '123',
    genre: 'Home',
    fonction: 'Agent administratif',
    dep_label: '__',
    __t: 'Admin'
  },
  {
    nom: 'chef',
    prenom: 'chef',
    email: 'chef@chef-tri.com',
    tel: '987654321',
    cin: 'XY222222',
    password: '123',
    genre: 'Home',
    fonction: 'Chef de Département',
    dep_label: 'TRI',
    __t:'Admin'
  },
  {
    nom: 'chef',
    prenom: 'chef',
    email: 'chef@chef-fct.com',
    tel: '987654321',
    cin: 'XY222222',
    password: '123',
    genre: 'Home',
    fonction: 'Chef de Département',
    dep_label: 'FCT',
    __t:'Admin'
  },
  {
    nom: 'chef',
    prenom: 'chef',
    email: 'chef@chef-stin.com',
    tel: '987654321',
    cin: 'XY222222',
    password: '123',
    genre: 'Home',
    fonction: 'Chef de Département',
    dep_label: 'STIN',
    __t:'Admin'
  }
]);
