import prisma from "../lib/prisma.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.User.findMany();
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ message: "Faild to get users " });
  }
};

export const getSpecificUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await prisma.User.findUnique({
      where: { id: id },
    });
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: "Faild to get user " });
  }
};

export const createUser = (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "Faild to get users " });
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const userData = req.body;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authenticated" });
  }
  try {
    const user = await prisma.User.update({
      where: { id: id },
      data: userData,
    });
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: "Faild to update user" });
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authenticated" });
  }
  try {
    const user = await prisma.User.delete({
      where: { id },
    });
    res.status(200).json({ message: "User Deleted Successful" });
  } catch (err) {
    res.status(500).json({ message: "Faild to get users " });
  }
};
