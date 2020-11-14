import React, { useState , useEffect } from "react";
import Axios from "axios";

import Posts from "../Home/Posts/Posts";
import Aux from "../../hoc/Auxiliary";

const Jobs = (props) => {
  const [postsData, setPostsData] = useState();

  useEffect(() => {
    Axios({
      method: "get",
      url: "/api/posts",
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        setPostsData(response.posts);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);

  return <Aux>{postsData ? <Posts posts={postsData} /> : null}</Aux>;
};

export default Jobs;
