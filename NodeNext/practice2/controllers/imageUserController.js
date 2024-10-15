const ImageUser = require('../models/ImageUser');


exports.uploadProfile = async (req, res) => {
    try {
        const {name, email} = req.body;
        const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null

        const newUser = new ImageUser({
            name, 
            email,
            profileImage: profileImagePath
        })

        await newUser.save()
        res.status(201).json({message: 'User created successfully', user: newUser})

    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server error', error: err.message})

    }
}


exports.getAllUsers = async (req, res) => {
    try {
      const users = await ImageUser.find(); // Retrieve all users
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };