import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      // You can await here
      const response = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);

      setPosts(
        response.data.slice(0).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      );
    };
    fetchPosts();
  }, [username, user._id]); // Or [] if effect doesn't need props or state

  // console.log(posts)

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username ===user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
