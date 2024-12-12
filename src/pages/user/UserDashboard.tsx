/* eslint-disable @typescript-eslint/no-unused-vars */
import Profile from "@/components/Profile";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const UserDashboard = () => {
  const { data: profile, isLoading, isError, error } = useGetMyProfileQuery("");

  return (
    <div>
      <Profile profile={profile?.data} />
    </div>
  );
};

export default UserDashboard;
