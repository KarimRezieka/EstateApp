import prisma from "../lib/prisma.js";

export const getPosts = async (req, res, next) => {
  const query = req.query;
  try {
    const posts = await prisma.Post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getSpecificPost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await prisma.Post.findUnique({
      where: { id: id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.SavedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ data:{...post, isSaved: saved ? true : false} });
        }
      });
    }
    res.status(200).json({data:{ ...post, isSaved: false }});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export const createPost = async (req, res, next) => {
  const body = req.body;
  const tokenUserId = req.userId;
  console.log(tokenUserId);
  try {
    const post = await prisma.Post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(201).json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export const updatePost = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const post = await prisma.Post.update({
      where: { id: id },
      data: body,
    });
    res.status(200).json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.Post.findUnique({
      where: { id: id },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authoreized !" });
    }
    await prisma.Post.delete({
      where: { id: id },
    });
    res.status(200).json({ data: `Post Deleted Sussefully ${post}` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
