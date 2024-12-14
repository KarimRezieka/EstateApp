import axios from "axios";
import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get("http://localhost:8800/api/posts/" + params.id);
  return res.data;
};


export const listPageLoader = async ({ request, params }) => {
  try {
    const query = request.url.includes("?") ? request.url.split("?")[1] : "";

    const response = await axios.get(
      `http://localhost:8800/api/posts?${query}`,
      {
        withCredentials: true, // Include credentials if necessary
      }
    );

    if (response.data && response.data.data) {
      return defer({
        postResponse: Promise.resolve(response.data),
      });
    } else {
      return defer({
        postResponse: Promise.reject("Invalid data format from API."),
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error.response || error.message); // Log full error response
    return defer({
      postResponse: Promise.reject("Error loading posts!"),
    });
  }
};
