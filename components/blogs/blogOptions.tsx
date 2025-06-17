"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

function BlogOptions({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/blog/delete/`, { id });
      router.push("/blog");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-6 w-6 flex justify-center items-center">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/blog/edit/${id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BlogOptions;
