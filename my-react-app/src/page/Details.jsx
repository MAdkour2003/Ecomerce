import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../api/api";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchData().then((data) => {
      setItem(data.find((p) => p.id === parseInt(id)));
    });
  }, [id]);

  if (!item) return <h2>Loading...</h2>;

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="text-4xl font-bold text-[#0a5bb7bb]"
      >
        ~ Back to Home
      </button>
      <div className="p-6 bg-white shadow ">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">#{item.id}</h1>
        <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.body}</p>
        <span className="text-sm text-gray-500 ">User #{item.userId}</span>
      </div>
    </div>
  );
}

export default Details;
