
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
      
    if ( await checkIfUserExists(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
      
    });

    // Save the user to the database
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // Optional expiration
    );

    // Respond with success (omit the password in response)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
  };
  

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await checkIfUserExists(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User retrieved:', user);

    // Check if password is correct
    if (!user.password) {
        return res.status(500).json({ message: 'Password not found in database' });
    }

    console.log("entered password: " + password);
    console.log("database password: " + user.password);
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // Optional expiration
    );

    // Send response with token and user details
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};


const checkIfUserExists = async (email) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser || Object.keys(existingUser).length === 0) {
    console.log('hereh');
    return false;
  }

  return existingUser;
};


const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req._id = decoded.userId; // Attach decoded token (e.g., userId) to the request object

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};


module.exports = {
  createUser,
  loginUser,
  verifyToken
};
