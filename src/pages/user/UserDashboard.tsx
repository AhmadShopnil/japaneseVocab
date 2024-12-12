import Profile from "@/components/Profile";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const UserDashboard = () => {
  const { data: profile } = useGetMyProfileQuery("");

  return (
    <div>
      <Profile profile={profile?.data} />
    </div>
  );
};

export default UserDashboard;
