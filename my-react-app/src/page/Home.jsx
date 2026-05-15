import { useState } from "react";
import { Link } from "react-router-dom";

import { fetchData, fetchDataAxios } from "../api/api";

function Home() {
  const [posts, setPosts] = useState([]);

  const handleFetch = () => {
    fetchData().then((data) => setPosts(data));
  };

  const handleAxios = () => {
    fetchDataAxios().then((data) => setPosts(data));
  };

  const handleReset = () => {
    setPosts([]);
  };

  return (
    <div>
      <h1 className="mb-5 mr-1.5 text-4xl font-semibold text-[#0a5bb7bb]">
        Home
      </h1>

      <div className="flex gap-2.5 mb-5">
        <button
          onClick={handleFetch}
          className="px-5 py-2.5 bg-[#1e3a5f] text-white rounded-md cursor-pointer hover:bg-[#2a4a73] transition-colors"
        >
          Fetch Data
        </button>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 bg-[#dc2626] text-white rounded-md cursor-pointer hover:bg-[#b91c1c] transition-colors"
        >
          Reset
        </button>

        <button
          onClick={handleAxios}
          className="px-5 py-2.5 bg-[#2563eb] text-white rounded-md cursor-pointer hover:bg-[#1d4ed8] transition-colors"
        >
          Axios Data
        </button>
      </div>
      {posts.length === 0 ? (
        <p className="text-[#6b7280]">Click the button to load posts------</p>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4.3 rounded-md ">
              <div className="text-6xl mb-2.5 text-center font-extrabold ">
                {post.id}
              </div>
              <div className="text-center">
                <h3 className="font-bold my-2.5">{post.title}</h3>
                <p className="text-gray-500 p-2 my-2.5">
                  {post.body.substring(0, 60)}...
                </p>
                <Link
                  to={`/${post.id}`}
                  className="text-blue-600 no-underline items-end"
                >
                  View price
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
