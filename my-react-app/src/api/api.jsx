import { useState } from "react";

const [data, setdata] = useState([]);

const URL = "https://jsonplaceholder.typicode.com/posts";

const fetchdata = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => setdata(data.slice(0, 10)));
};
