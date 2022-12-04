import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import NoAvatarImg from "../../assets/person/noAvatar.png"
import HeartImg from "../../assets/heart.png"
import LikeImg from "../../assets/like.png"

export default function Post({ post }) {
  
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user: currentUser} = useContext(AuthContext)

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const LikeHandler = async () => {
    
    try {
      await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id})
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          {
            <div className="postTopLeft">
              <NavLink to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={user.profilePicture || NoAvatarImg}
                  alt=""
                />
              </NavLink>

              <span className="postUsername">{user.username}</span>
              <span className="postDate">
                {moment(post.createdAt).startOf("day").fromNow()}
              </span>
            </div>
          }
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={LikeHandler}
              className="likeIcon"
              src={LikeImg}
              alt=""
            />
            <img
              onClick={LikeHandler}
              className="likeIcon"
              src={HeartImg}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
