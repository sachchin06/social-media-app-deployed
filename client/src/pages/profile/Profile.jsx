import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Profile() {

  const username = useParams().username  //  or const params = useParams()
  const [user,setUser] = useState({})   //      const username = params.username

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }

    fetchUser()
  }, [username])

  const PF = "public/assets/"
// console.log(params);

  return (
   
    <>
      <Topbar />
      <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
           <div className="profileCover">
           <img className="profileCoverImg" src={user.coverPicture || PF + "person/noCover.png"} alt="" />
            <img className="profileUserImg" src={user.profilePicture || PF + "person/noAvatar.png" } alt="" />
           </div>
           <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
           </div>
        </div>
        <div className="profileRightBottom">   
          { user.username ? <Feed username={username} /> : "loading"}
          <Rightbar user={user} />
        </div>
        </div>
      </div>
    </>
  );
}
