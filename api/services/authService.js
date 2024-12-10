import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import createToken from "../lib/creatToken.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hasedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.User.create({
      data: {
        username,
        email,
        password: hasedPassword,
      },
    });
    res.status(201).json({ data: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user ! " });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is not correct" });
    }
    const age = Number(process.env.COOKIE_AGE);
    // Generate a token and set it as a cookie
    const token = createToken(user.id); // Ensure you are using the correct user ID field
    const { password: userPassword, ...userInfo } = user;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
    });

    // Respond with success
    res.status(200).json({ data: userInfo });
  } catch (err) {
    console.error("Login error:", err); 
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
