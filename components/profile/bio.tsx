"use client";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
interface Props {
  username: string;
  bio: string;
}

function Bio(dbUser: Props) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(dbUser.bio || "");
  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    // Call an API or mutation to save the updated bio to the database
    // For example: await updateUserBio(bio);
    try {
        const username = dbUser.username
        const res = await axios.post("/api/profile" ,{username : username, bio: bio})
        if (res.status === 200) {
            toast.success("Updated bio Successfully");
          } else {
            toast.error("Failed to update Bio");
            handleCancelEdit();
          }
    } catch (error) {
        
    }

    setIsEditingBio(false);
    // Optionally show a toast notification
  };

  const handleCancelEdit = () => {
    setIsEditingBio(false);
    setBio(dbUser.bio || ""); // Reset to original bio
  };
  return (
    <>
      {isEditingBio ? (
        <>
          <Textarea
            name="bio"
            className="shadow-sm focus:ring-orange-500 focus:border-orange-500 my-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={6}
            required
          />
          <div className="flex gap-4 mt-2">
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleSaveBio}
            >
              Save
            </Button>
            <Button
              className="bg-gray-300 hover:bg-gray-400"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-800 mb-4">{bio}</p>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleEditBio}
          >
            Edit Bio
          </Button>
        </>
      )}
    </>
  );
}

export default Bio;
