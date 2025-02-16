"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  senderId: String;
  receiverId: String;
  followers: { followerId: string }[];
}

const Follow = ({ senderId, receiverId, followers }: Props) => {
  const followerNames = followers.map((follower) => follower.followerId);
  const { user } = useUser();
  const router = useRouter()
  const handleFollow = async () => {
    try {
      const res = await axios.post("/api/profile/follow", {
        senderId: senderId,
        receiverId: receiverId,
      });
      if(res.status == 200){
        router.refresh()
      }
    } catch (error) {}
  };
  return (
    <div>
      {followerNames.includes(user?.username as string) ? (
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={handleFollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={handleFollow}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default Follow;
