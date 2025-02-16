import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  BadgePlus,
  Bike,
  BookOpen,
  Cake,
  Calendar,
  MapPin,
  User,
} from "lucide-react";

function LeftMenu({
  dob,
  location,
  gender,
  createdAt,
}: {
  dob: string;
  location: string;
  gender: string;
  createdAt: string;
}) {
  return (
    <div className="w-[30rem] flex gap-4 flex-col">
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex flex-col items-start gap-4">
            <p className="font-semibold">About Me</p>
            <div className="flex flex-col gap-6">
              <p className="flex gap-4">
                <User />
                {gender.slice(0, 1).toUpperCase() + gender.slice(1)}
              </p>
              <p className="flex gap-4">
                <Cake /> DOB: {dob}
              </p>
              <p className="flex gap-4">
                <MapPin /> From: {location}
              </p>
              <p className="flex gap-4">
                <BadgePlus /> Joined: {createdAt}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default LeftMenu;
