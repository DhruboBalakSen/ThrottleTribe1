import { Image, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "./post";
import Create from "./create";

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Pankaj Reet Tech",
      username: "pankajreet",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisi luctus diam dignissim. Cras tincidunt etiam morbi egestas...",
    image: "https://placehold.co/600x300",
    likes: 10212,
    comments: 238,
    shares: 127,
  },
  {
    id: 2,
    author: {
      name: "Jane Doe",
      username: "janedoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    image: "https://placehold.co/600x300",
    likes: 8765,
    comments: 192,
    shares: 85,
  },
];

export function Feed() {
  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <Create />
      {mockPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
