// "use client";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import PostLike from "./postLike";
// import { Button } from "../ui/button";
// import { MessageCircle } from "lucide-react";
// import { Textarea } from "../ui/textarea";
// import { Comments } from "./comment";

// interface Props {
//   id: number;
//   userId: string;
// }

// function PostComment({ id, userId }: Props) {
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [commentCount, setCommentCount] = useState(0);
//   const [comments, setComments] = useState([]);
//   useEffect(() => {
//     fetchComments();
//     console.log(commentCount)
//   }, []);
//   useEffect(() => {
//     fetchComments();
//   }, [isCommenting]);

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`/api/post/comment?postId=${id}`);
//       const comments = res.data.comments;
//       setComments(comments);
//       setCommentCount(comments.length);
//     } catch (error) {
//       console.log("Error fetching comments:", error);
//     }
//   };

//   const handleCommentClick = () => {
//     setIsCommenting(!isCommenting);
//     setCommentText("");
//   };

//   const handleCommentSubmit = async () => {
//     try {
//       const res = await axios.post("/api/post/comment", {
//         postId: id,
//         userId: userId,
//         commentText: commentText,
//       });
//       if (res.status === 200) {
//         toast.success("Comment posted successfully");
//       }
//     } catch (error) {}
//     console.log("Submitting comment:", commentText);
//     setIsCommenting(false);
//     setCommentText("");
//   };

//   return (
//     <div className="w-full h-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md flex items-center justify-center" >
//       <Toaster position="top-right" />
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <PostLike id={id} userId={userId} />
//           <Button
//             variant="ghost"
//             size="sm"
//             className="gap-2"
//             onClick={handleCommentClick}
//           >
//             <MessageCircle className="h-4 w-4" />
//             {commentCount > 0 ? commentCount : 0}
//           </Button>
//         </div>
//       </div>
//       {isCommenting && (
//         <div className="mt-4">
//           <Textarea
//             placeholder="Write your comment..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             className="mb-4"
//           />
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => setIsCommenting(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCommentSubmit}
//               className="bg-orange-500 hover:bg-orange-600 gap-2"
//             >
//               Post
//             </Button>
//           </div>
//         </div>
//       )}
//       <Comments comments={comments} postId={id} />
//     </div>
//   )
// }

// export default PostComment

import { getComments, getUserDetails } from "@/lib/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Card, CardContent } from "../ui/card";
import PostActions from "./postActions";
import { Comments } from "./comment";
import PostOption from "./postOption";
import { Toaster } from "react-hot-toast";
interface PostParams {
  id: number;
  username: string;
  content: string;
  imageUrl: string;
}

const PostComment = async ({ id, username, content, imageUrl }: PostParams) => {
  const { userId } = await auth();
  const currentuser = await currentUser();
  const user = await getUserDetails(username);
  const comments = await getComments(id);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md">
      <div className="flex items-center justify-center max-w-4xl mx-auto my-20">
        <Card className="mb-4 shadow-md">
          <Toaster position="top-right" />
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={user?.profilePicture || "default_pfp.jpg"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mb-4">{content}</p>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Post"
                    className="w-full rounded-lg mb-4"
                  />
                )}
                <PostActions id={id} userId={currentuser?.username as string} />
              </div>
              <Comments comments={comments} postId={id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostComment;
