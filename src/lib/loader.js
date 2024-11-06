import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {

       const res = await apiRequest("/post/" + params.id);
      //  console.log(res.data);
       return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/post?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/user/profilePosts");
  const chatPromise = apiRequest("/chats");

  // console.log(postPromise)
  // console.log(chatPromise);
  
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};