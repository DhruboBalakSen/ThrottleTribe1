import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CommentOptions = ({ id }: { id: number }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/post/comment?commentId=${id}`);
      if (res.status === 200) {
        toast.success("Comment deleted successfully");
        router.refresh();
      }
    } catch (error) {}
  };
  return (
    <DropdownMenu>
      <Toaster position="top-right" />
      <DropdownMenuTrigger className="h-6 w-6 flex justify-center items-center">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentOptions;
