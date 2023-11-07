import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserInfoCard from "@/components/admin-profile-page/user-info-card";
import UserPasswordCard from "@/components/admin-profile-page/user-password-card";
import UserProfileCard from "@/components/admin-profile-page/user-profile-card";
import { NextPage } from "next";
import { getServerSession } from "next-auth";

interface Props {}

const ProfilePage: NextPage<Props> = async () => {
  const session = await getServerSession(authOptions);
  const user = { ...session?.user, _id: session?.user._id?.toString() };

  return (
    <div className="admin-page-container space-y-10">
      <UserProfileCard user={user} />
      <div className="flex gap-6">
        <div className="w-1/2">
          <UserPasswordCard userId={user._id as string} />
        </div>

        <div className="flex-1">
          <UserInfoCard userId={user._id as string} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
