import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={require(`../img/${post.img}`)} alt="PostImage" />
            </div>

            <Link className="content link" to={`/post/${post.id}`}>
              <div className="">
                <h1>{post.title}</h1>
              </div>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
