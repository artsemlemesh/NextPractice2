const ImageUser = require('../models/ImageUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.uploadProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = new ImageUser({
      name,
      email,
      profileImage: profileImagePath,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await ImageUser.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password) {
      return res.status(400).send('Name, email and password are required');
    }
    //check whether the user already exists
    const existingUser = await ImageUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new ImageUser({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { name: newUser.name }, //payload for JWT
      process.env.JWT_SECRET, //secret key for JWT
      { expiresIn: '1h' }
    ); //token expires in 1 hour

    res.cookie('token', token, {
      httpOnly: true, //set httpOnly to true to prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', //set secure to true in production, use HTTPS in production
      maxAge: 3600000, //1 hour
    });


    res.status(201).json({
      message: 'user registered successfully',
      user: { id: newUser._id, name: newUser.name },
      token, //send the token in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await ImageUser.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });


    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.checkAuth = (req, res) => {
  try{
    res.status(200).json({
      user: req.user,
      token: req.cookies.token,
    })
  } catch(err){
    res.status(500).json({message: 'Server error', error: err.message})
  }
}