import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Bike, Calendar, Heart, Users } from "lucide-react";

const LeftMenu = () => {
  return (
    <div className="w-[30rem]">
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <p className="font-medium ">About Me</p>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <nav className="space-y-1">
            <Link href={`/profile/${"turboo"}`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                {/* <Heart className="h-5 w-5 text-orange-500" /> */}
                <Calendar className="h-5 w-5 text-orange-500" />
                Events
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              {/* <Users className="h-5 w-5 text-orange-500" /> */}
              <Bike className="h-5 w-5 text-orange-500" />
              Trips
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftMenu;
