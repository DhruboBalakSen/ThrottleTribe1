import prisma from "./db";

export const createPost = async (data: {
  userid: number;
  content: string;
  imageUrl: string;
}) => {
  const post = await prisma.post.create({
    data: {
      userId: data.userid,
      content: data.content,
      imageUrl: data.imageUrl,
    },
  });
  return "Post created successfully";
};

export const createUser = async (data: {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profilePicture: string;
}) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      bio: data.bio,
      profilePicture: data.profilePicture,
    },
  });
  return user;
};

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getUserPosts = async (id: number) => {
  const posts = await prisma.post.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getUserDetails = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};
