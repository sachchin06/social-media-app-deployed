import "./friend.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Friend({ id }) {
  const PF = "public/assets/"

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${id}`);
      setUser(res.data);
    };

    fetchUser();
  }, [id]);

  return (
    <>
      {" "}
      {user && (
        <NavLink className="rightbarFollowingLink" to={`/profile/${user.username}`}>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <span className="rightbarFollowingName">{user.username}</span>
          </div>
        </NavLink>
      )}
    </>
  );
}
