const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({message: 'Username and password are required'})

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({username, password: hashedPassword})
    await newUser.save()
    res.status(201).json({message: 'User created successfully'})
    }

    const login = async (req, res) => {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user) return res.status(401).json({message: 'Invalid credentials'})
        
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(401).json({message: 'Invalid credentials'})
        
        const token = jwt.sign({username: user.username, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
    }

    module.exports = {register, login}