import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  let q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  let q =
    "SELECT p.id , `username`,`title`,`desc`, p.img , u.img AS userImg ,`date`,`cat` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("You are not authenticated.");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid.");

    let q =
      "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("You are not authenticated.");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid.");

    const postId = req.params.id;
    let q = "DELETE FROM posts WHERE `id` = ? AND `uid`= ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can only delete your posts.");

      return res.status(200).json("Post has been deleted.");
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("You are not authenticated.");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid.");

    const postId = req.params.id;
    let q =
      "UPDATE posts SET `title`= ?,`desc`= ?,`img` = ?,`cat` = ? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been updated.");
    });
  });
};
