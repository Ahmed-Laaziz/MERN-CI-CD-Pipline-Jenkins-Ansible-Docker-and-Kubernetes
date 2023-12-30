const mongoose = require('mongoose');
const Agent = require('./agent');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
        
        fonction: {
            type: String,
            required: true
        },
        dep_label:{
            type: String,
            default: '__' 
        }
    }
)

const Admin = Agent.discriminator('Admin', adminSchema);
module.exports = Admin;