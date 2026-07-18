const bcrypt = require("bcryptjs");
const User = require("../../Models/userModel");
const sendToken = require("../../Utils/jwtToken");

const normalizeEmail = (email) => (email || "").trim().toLowerCase();

const signup = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const login = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const syncLocalData = async (req, res) => {
  const { localData } = req.body;

  if (!localData || typeof localData !== "object" || Array.isArray(localData)) {
    return res.status(400).json({ message: "localData must be an object." });
  }

  try {
    req.user.syncedLocalData = localData;
    req.user.lastSyncedAt = new Date();
    await req.user.save();

    res.status(200).json({
      success: true,
      syncedLocalData: req.user.syncedLocalData,
      lastSyncedAt: req.user.lastSyncedAt,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getSyncedLocalData = async (req, res) => {
  res.status(200).json({
    success: true,
    syncedLocalData: req.user.syncedLocalData || {},
    lastSyncedAt: req.user.lastSyncedAt,
  });
};

module.exports = { signup, login, syncLocalData, getSyncedLocalData };
