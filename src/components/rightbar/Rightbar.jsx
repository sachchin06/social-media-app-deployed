import { Users } from "../../dummyData";
import OnlineFriend from "../onlineFriend/OnlineFriend";
import "./rightbar.css";
import Ad from "../ad/Ad";
import Friend from "../friend/Friend";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { useState } from "react";
import birthdayImg from "../../assets/gift.png"


export default function Rightbar({ user }) {
  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={birthdayImg} alt="" />
          <span className="birthdayText">
            <b>Kurubaran Ram </b>and <b>60 other friends </b> have a birthday
            today.
          </span>
        </div>
        <Ad />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <OnlineFriend key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed,setFollowed] = useState(currentUser.following.includes(user?._id))
    
    const followHandler = async (e) => {
      e.preventDefault();
    
      try {
        if (followed) {
          await axios.put("/users/" + user._id + "/unfollow", {
            userId: currentUser._id,
          });

          dispatch({type:"UnFOLLOW", payload: user._id})
        } else {
          await axios.put("/users/" + user._id + "/follow", {
            userId: currentUser._id,
          });
          dispatch({type:"FOLLOW", payload: user._id})
          console.log("success");
        }

        setFollowed(!followed)
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        {currentUser._id !== user._id && (
          <button onClick={followHandler} className="rightbarFollowButton">
           
            {followed ? "unfollow" : "follow"}
            {followed ? <Remove  sx={{ fontSize: 20 }}/> : <Add  sx={{ fontSize: 20 }}/>}
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "Other"}
            </span>
          </div>
        </div>

        {user.following && (
          <>
            <h4 className="rightbarTitle">
              {user.following.length ? "User Friends" : ""}
            </h4>
            <div className="rightbarFollowings">
              {user.following.map((friend) => (
                <Friend id={friend} key={friend} />
              ))}
            </div>
          </>
        )}

        <Ad />
      </>
    );
  };

  // console.log(user);
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
