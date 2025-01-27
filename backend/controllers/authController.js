
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    if (await checkIfUserExists(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      accessTokens: []
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        lastNameChange: newUser.lastNameChange,
        lastPasswordChange: newUser.lastPasswordChange
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);

    // Handle MongoDB unique constraint violation (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    res.status(500).json({ error: 'Registration failed' });
  }
};


const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await checkIfUserExists(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    if (!user.password) {
      return res.status(500).json({ message: 'Password not found in database' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // Optional expiration
    );

    // Check if user has access tokens
    if (!user.accessTokens || user.accessTokens.length === 0) {
      // Respond with the token and user data, but no accounts
      return res.status(200).json({
        message: 'Login successful (no linked accounts)',
        token,
        user: { id: user._id, name: user.name, email: user.email, accountsData: [], lastNameChange: user.lastNameChange, lastPasswordChange: user.lastPasswordChange },
      });
    }

    // Attach user and token to req for the next middleware
    req.user = user;
    req.token = token;

    next(); // Pass control to the next middleware
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};


const checkIfUserExists = async (email) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser || Object.keys(existingUser).length === 0) {
    return false;
  }

  return existingUser;
};


const verifyToken = (req, res, next) => {
  // Get token from Authorization header

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("TOKEN", token);
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("DECODED ID" , decoded.userId);
    req._id = decoded.userId; // Attach decoded token (e.g., userId) to the request object

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

const changeName = async (req, res) => {

  try {
 
    const _id = req._id; // Assuming the user ID is passed as a URL parameter
    const { newName } = req.body; // Assuming the new name is passed in the request body

    console.log(newName);
    console.log(_id);
    // Validate input
    if (!newName || newName.trim() === '') {
      return res.status(400).json({ message: 'New name is required and cannot be empty.' });
    }

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }


    const currentDate = new Date();

    // Update the user's name and set the lastNameChange field
    user.name = newName.trim();
    user.lastNameChange = currentDate;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Name updated successfully.', lastNameChange: currentDate, name: user.name });
  } catch (error) {
    console.error('Error updating user name:', error);
    return res.status(500).json({ error: 'Failed to update user name.' });
  }
};


const changePassword = async (req, res) => {
  try {
    const _id = req._id // Assume userId is attached to req (from a token, for example)
    const {password, newPassword } = req.body;

    console.log(_id);

    console.log(password, newPassword);

    if (!password || !newPassword) {
      return res.status(400).json({ error: 'Both current and new passwords are required' });
    }

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare current password with the one in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Encrypt the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const currentDate = new Date();

    user.password = hashedPassword;
    user.lastPasswordChange = currentDate;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' , lastPasswordChange: currentDate});
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }

};



module.exports = {
  createUser,
  loginUser,
  verifyToken, 
  changeName,
  changePassword
};
