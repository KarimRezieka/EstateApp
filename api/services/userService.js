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
  const { password, avatar, ...userData } = req.body;

  // Check if the user is authenticated
  if (String(id) !== String(tokenUserId)) {
    return res.status(403).json({ message: "Not Authenticated" });
  }

  try {
    // Prepare data for update
    const dataToUpdate = {
      ...userData,
      ...(password && { password: await bcrypt.hash(password, 10) }),
      ...(avatar && { avatar }),
    };

    // Update user in the database
    const user = await prisma.User.update({
      where: { id: id },
      data: dataToUpdate,
    });

    // Exclude password from response
    const { password: userPassword, ...rest } = user;
    res.status(200).json({ data: rest });
  } catch (err) {
    console.error("Error updating user:", err); // Debugging
    res.status(500).json({ message: "Failed to update user" });
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
export const savePost = async (req, res, next) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId; 

  // Check if the authenticated user is allowed to modify the data
 
  try {
    // Check if the post is already saved
    const existingSave = await prisma.SavedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId: postId,
        },
      },
    });

    if (existingSave) {
      // If the post is already saved, delete it
      await prisma.SavedPost.delete({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId: postId,
          },
        },
      });
      return res.status(200).json({ message: "Post removed from saved list" });
    } else {
      // If the post is not saved, create a new saved post entry
      await prisma.SavedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId,
        },
      });
      return res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.error("Error in savePost:", err);
    return res.status(500).json({ message: "Failed to save post" });
  }
};
