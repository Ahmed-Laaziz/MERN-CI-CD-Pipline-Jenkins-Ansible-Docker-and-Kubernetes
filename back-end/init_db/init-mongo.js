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
    email: 'chef@chef-ge.com',
    tel: '987654321',
    cin: 'XY222222',
    password: '123',
    genre: 'Home',
    fonction: 'Chef de Département',
    dep_label: 'GE',
    __t:'Admin'
  },
  {
    nom: 'chef',
    prenom: 'chef',
    email: 'chef@chef-cp.com',
    tel: '987654321',
    cin: 'XY222222',
    password: '123',
    genre: 'Home',
    fonction: 'Chef de Département',
    dep_label: 'CP',
    __t:'Admin'
  }
]);
