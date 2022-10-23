import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     img: require("../img/place1.jpg"),
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     img: require("../img/place2.jpg"),
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     img: require("../img/place3.jpg"),
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     img: require("../img/place1.jpg"),
  //   },
  //   {
  //     id: 5,
  //     title: "Lorem ipsum dolor",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     img: require("../img/place2.jpg"),
  //   },
  //   {
  //     id: 6,
  //     title: "Lorem ipsum dolor",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     img: require("../img/place3.jpg"),
  //   },
  // ];
  return (
    <div className="menu">
      <h1>Similar posts you may like</h1>
      {posts?.map((post) => (
        <div className="post" key={post.id}>
          <img src={require(`../img/${post.img}`)} alt="img" />
          <h2>{post.title}</h2>
          <Link className="content link" to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
