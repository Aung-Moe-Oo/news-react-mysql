import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import EDIT from "../img/edit.png";
import DELETE from "../img/bin.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      <div className="content">
        <img src={post?.img && require(`../img/${post.img}`)} alt="img" />
        <div className="user">
          {post?.userImg && <img src={post?.userImg} alt="userImage" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}.</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={EDIT} alt="edit" title="EDIT" />
              </Link>
              <img
                onClick={handleDelete}
                src={DELETE}
                alt="delete"
                title="DELETE"
              />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
