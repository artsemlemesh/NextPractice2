const People = require('../models/People');

const getAllPeople = async (req, res) => {
  try {
    const people = await People.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const creataeNewPerson = async (req, res) => {
  try {
    const { username, profileImage } = req.body;
    const newPerson = new People({
      username,
      profileImage,
    });
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const uploadProfile = async (req, res) => {
    try {
      const { username } = req.body;
      const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
      const newPerson = new People({
        username,
        profileImage: profileImagePath,
        createdAt: Date.now(),
      });
  
      await newPerson.save();
      res
        .status(201)
        .json({ message: 'User created successfully', username: newPerson });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = {
  getAllPeople,
  creataeNewPerson,
  uploadProfile
};
