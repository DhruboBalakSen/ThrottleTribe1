"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props{
  id: number;
}

function PostOption({id}: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await axios.delete("/api/post", { params: {id : id} });
      if (res.status === 200) {
        toast.success("Deleted post Successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.log("Error deleting post:", error);
      console.log("An error occurred while deleting the post.");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-6 w-6 flex justify-center items-center">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/post/${id}`}><DropdownMenuItem >Edit</DropdownMenuItem></Link>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostOption;
