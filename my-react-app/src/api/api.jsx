import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchData = () => {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => data.slice(0, 10));
};

export const fetchDataAxios = () => {
  return axios.get(URL).then((res) => res.data.slice(0, 10)); // Get only 10 posts
};

export const fetchPostById = (id) => {
  return fetch(`${URL}/${id}`).then((res) => res.json());
};
