import axios from "axios";

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get("http://localhost:8800/api/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  console.log(request);
  return null
};
