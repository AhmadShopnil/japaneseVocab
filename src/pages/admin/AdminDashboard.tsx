import Profile from "@/components/Profile";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const AdminDashboard = () => {
  const { data: profile } = useGetMyProfileQuery("");

  return (
    <div>
      <Profile profile={profile?.data} />
    </div>
  );
};

export default AdminDashboard;
