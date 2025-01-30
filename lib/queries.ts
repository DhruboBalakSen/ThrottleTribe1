import prisma from "./db";

export const createPost = async (data: {
  userid: string;
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
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    // console.log(error)
    return [];
  }
};

export const getUserPosts = async (username: string) => {
  const posts = await prisma.post.findMany({
    where: {
      userId: username,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getUserDetails = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

export const updatePost = async (id: number, content: string) => {
  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
  } catch (error) {
    console.log(error);
    return "Unable to update";
  }
};

export const deletePost = async (id: number) => {
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return "Unable to delete";
  }
};

export const updateBio = async (username: string, newBio: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        bio: newBio,
      },
    });
    console.log("Updated bio");
    return updatedUser;
  } catch (error) {
    console.error(error);
    return "Unable to update bio";
  }
};

export const getPostById = async (id: number) => {
  try {
    if (!id) {
      return null;
    }
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
};
