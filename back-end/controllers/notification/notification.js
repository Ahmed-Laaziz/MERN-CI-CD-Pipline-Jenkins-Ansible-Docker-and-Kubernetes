const Notification = require("../../models/notification");
const mongoose = require('mongoose');


exports.addNotif =  async (req, res, next) => {
    console.log(req);
    try {
      const newNotification = new Notification({
        professeur: req.body.prof, // Replace with the actual ObjectId of the related Professeur
        title: req.body.title, // Replace with the actual grade
        message: req.body.message,
        date: req.body.date
         // Replace with the actual year
      });
  
      const saveNotif = await newNotification.save();
  
      res.status(200).json(saveNotif);
    } catch (error) {
      console.error('Error adding Notification:', error);
      res.status(500).json({ error: 'Failed to add Notification' });
    }
  };

  exports.getNotification =  async (req, res, next) => {
    try {
      const profId = req.body.prof;
  
      // Find the agent by ID in your Agent collection
      const notif = await Notification.find({"professeur": profId, "statut": "Unviewed"});
  
      if (!notif) {
        return res.status(404).json({ error: 'Notif not found' });
      }
  
      
      res.status(200).json(notif);
    } catch (error) {
      console.error('Error fetching notif by prof ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  exports.getAllNotifs = async (req, res, next) => {
    try {
      const allNotifs = await Notification.find({});
      res.status(200).json(allNotifs);
    } catch (error) {
      console.error('Error retrieving notifs:', error);
      res.status(500).json({ error: 'Failed to retrieve notifs' });
    }
};

exports.updateNotifs = async (req, res, next) => {
  try {
    // Update all notifications for the professor with the given ID to "Viewed"
    console.log('prof', req.body);
const result = await Notification.updateMany({ professeur: req.body.prof, statut: "Unviewed" }, { statut: "Viewed" });
console.log('Result:', result);

    if (result) {
      // Notifications updated successfully
      res.status(200).json({ message: 'Notifications updated to "Viewed" for the professor' });
    } else {
      // Handle any potential errors during the update
      res.status(500).json({ error: 'Failed to update notifications' });
    }
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};







