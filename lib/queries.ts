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
  gender: string;
  dob: string;
  location: string;
}) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      bio: data.bio,
      profilePicture: data.profilePicture,
      gender: data.gender,
      dob: data.dob,
      location: data.location,
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

export const toggleLike = async (postId: number, userId: string) => {
  try {
    if (!postId || !userId) {
      console.error("Invalid postId or userId:", { postId, userId });
      return null;
    }

    const existingLike = await prisma.like.findMany({
      where: { userId: userId, postId: postId },
    });

    if (existingLike.length == 0) {
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return newLike;
    } else {
      await prisma.like.delete({
        where: { id: existingLike[0].id },
      });
      return { message: "Like removed" };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return "Unable to toggle like";
  }
};

export const getLikes = async (postId: number) => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        postId,
      },
    });
    return likes;
  } catch (error) {
    console.error("Error getting like count:", error);
    return "Unable to get like count";
  }
};

export const createComment = async (
  postId: number,
  userId: string,
  commentText: string
) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: userId,
        commentText: commentText,
      },
    });
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    return "Unable to create comment";
  }
};

export const getComments = async (postId: number) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    return comments;
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
};

export const deleteComment = async (id: number) => {
  try {
    await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return "Comment deleted successfully";
  } catch (error) {
    console.error("Error deleting comment:", error);
    return "Unable to delete comment";
  }
};

export const toggleFollow = async (senderId: string, receiverId: string) => {
  try {
    if (!senderId || !receiverId) {
      console.error("Invalid postId or userId:", { senderId, receiverId });
      return null;
    }

    const existingFollow = await prisma.follow.findMany({
      where: { followingId: receiverId, followerId: senderId },
    });
    console.log();

    if (existingFollow.length == 0) {
      const newFollow = await prisma.follow.create({
        data: {
          followerId: senderId,
          followingId: receiverId,
        },
      });
      return newFollow;
    } else {
      await prisma.follow.delete({
        where: { id: existingFollow[0].id },
      });
      return { message: "Follow removed" };
    }
  } catch (error) {
    console.error("Error toggling Follow:", error);
    return "Unable to toggle Follow";
  }
};

export const getFollow = async (username: string) => {
  try {
    const followers = await prisma.follow.findMany({
      where: { followingId: username },
      include: { follower: true },
    });

    const following = await prisma.follow.findMany({
      where: { followerId: username },
      include: { following: true },
    });
    const followersCount = await prisma.follow.count({
      where: { followingId: username },
    });

    const followingCount = await prisma.follow.count({
      where: { followerId: username },
    });
    return [followers, following, followersCount, followingCount];
  } catch (error) {
    console.error("Error fetching Follow:", error);
    return "Unable to fetch Follow";
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};

export const createBlog = async (
  title: string,
  author: string,
  content: string,
  tags: string[],
  imageUrl: string
) => {
  try {
    const blog = await prisma.blogs.create({
      data: {
        title: title,
        author: author,
        content: content,
        tags: tags,
        imageUrl: imageUrl,
      },
    });
    return blog;
  } catch (error) {
    return [];
  }
};

export const getBlogs = async () => {
  try {
    const blogs = await prisma.blogs.findMany();
    return blogs;
  } catch (error) {}
};
export const getBlog = async (id: number) => {
  try {
    const blog = await prisma.blogs.findFirst({
      where: {
        id: id,
      },
    });
    return blog;
  } catch (error) {}
};

export const updateBlog = async (
  blogId: number,
  data: Partial<{
    title: string;
    content: string;
    tags: string[];
    imageUrl: string;
  }>
) => {
  try {
    const updatedBlog = await prisma.blogs.update({
      where: { id: blogId },
      data,
    });
    return updatedBlog;
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};

export const getBlogByAuthor = async (author: string) => {
  try {
    const blog = await prisma.blogs.findMany({
      where: {
        author: author,
      },
    });
    return blog;
  } catch (error) {}
};


export const createBlogComment = async (id:number,userId: string,commentText:string) => {
  try {
    const comment = await prisma.blogComment.create({
      data :{
        blogId:id,
        userId : userId,
        commentText : commentText
      }
    })
    return comment;
  } catch (error) {
    
  }
}

export const getBlogComments = async (id:number) =>{
  try {
    const comments = prisma.blogComment.findMany({
      where :{
        blogId:id
      }
    })
    return comments;
  } catch (error) {
    
  }
}

export const toggleBlogLike = async (blogId: number, userId: string) => {
  try {
    if (!blogId || !userId) {
      console.error("Invalid postId or userId:", { blogId, userId });
      return null;
    }

    const existingLike = await prisma.blogLikes.findMany({
      where: { userId: userId, blogId: blogId },
    });

    if (existingLike.length == 0) {
      const newLike = await prisma.blogLikes.create({
        data: {
          userId,
          blogId,
        },
      });
      return newLike;
    } else {
      await prisma.blogLikes.delete({
        where: { id: existingLike[0].id },
      });
      return { message: "Like removed" };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return "Unable to toggle like";
  }
};

export const getBlogLikes = async (blogId: number) => {
  try {
    const likes = await prisma.blogLikes.findMany({
      where: {
        blogId,
      },
    });
    return likes;
  } catch (error) {
    console.error("Error getting like count:", error);
    return "Unable to get like count";
  }
};