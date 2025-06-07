
import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


dotenv.config();


export const createAccount = async (req, res) => {
  const { name, email, authType, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Email address is already used!' });
  } else {
    try {
      const user = new User({ name, email, authType, password: hashedPassword });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create user', error: error.message });

    }
  }

}



// Define the function here
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
  };
}

// Your route can call it directly
export const signupGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const googleData = await verifyGoogleToken(token);
    let user = await User.findOne({ googleId: googleData.googleId });

    if (!user) {
      user = new User({
        name: googleData.name,
        authType: "google",
        email: googleData.email,
        googleId: googleData.googleId
      });

      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(email, password);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




export const getProfile = (req, res) => {
  const { _id, name, email } = req.user;
  res.json({ _id, name, email });
  console.log('Full user:', req.user);
}



