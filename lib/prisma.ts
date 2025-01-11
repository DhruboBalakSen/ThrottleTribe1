import prisma from "./db";

export const createPost = async (data: { userid: number, content : string, imageUrl : string }) => {
    const post = await prisma.post.create({
        data : {
            userId : data.userid,
            content : data.content,
            imageUrl : data.imageUrl
        }
    });
    return post;
}