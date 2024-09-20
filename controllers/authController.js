const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


const register = async(req, res) =>{
    try{    
        const {username, email , password} = req.body;
        const user = new User({username, email, password});
        await user.save();
        res.status(201).json({message: "user registration successfully"})
    }
    catch(err){
        res.status(400).json({error: "user registration failed"})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
};


module.exports = {register, login};