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
        className="text-4xl font-bold text-sidebar"
      >
        ~ Back to Home
      </button>
      <div className="p-6 bg-text1 shadow ">
        <h1 className="text-4xl font-bold text-textid mb-2">#{item.id}</h1>
        <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
        <p className="text-textbody mb-4">{item.body}</p>
        <span className="text-sm text-textload ">User #{item.userId}</span>
      </div>
    </div>
  );
}

export default Details;
