const Agent = require("../../models/agent");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "RandomJWTSecretKey123"



exports.login =  async (req, res) => {
    const { email, password } = req.body;
  
    try {

      const user = await Agent.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (password != user.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };