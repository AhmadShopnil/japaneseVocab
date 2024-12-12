import { Link } from "react-router-dom";

const Home = () => {
  const user = { role: "user" };
  // const user = true;
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to 日本 Learn</h1>
      <p className="text-xl mb-8">
        Start your Japanese learning journey today!
      </p>
      {user ? (
        <Link
          to="/lessons"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Lessons
        </Link>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
