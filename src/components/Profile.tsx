/* eslint-disable @typescript-eslint/no-explicit-any */
const Profile = ({ profile }: any) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        {/* Profile Header */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profile?.profileImage || "/default-profile.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-black text-white rounded-full p-2 text-xs">
              {profile?.role}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {profile?.name}
          </h1>
          <p className="text-lg text-gray-600">{profile?.email}</p>

          {/* Edit Profile Button */}
          {/* <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
            Edit Profile
          </button> */}
        </div>

        {/* Information Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Name</h3>
            <p className="text-gray-600">{profile?.name}</p>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-gray-600">{profile?.email}</p>
          </div>

          {/* Role */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Role</h3>
            <p className="text-gray-600">
              {profile?.role || "No role assigned"}
            </p>
          </div>

          {/* Profile Image */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <div
              className="h-32 bg-cover bg-center border-4 border-gray-100 mx-auto"
              style={{
                backgroundImage: `url(${
                  profile?.profileImage || "/default-profile.jpg"
                })`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
