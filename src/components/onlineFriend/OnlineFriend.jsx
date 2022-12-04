import './onlineFriend.css'
import NoAvatarImg from "../../assets/person/noAvatar.png"

export default function onlineFriend({user}) {
  
  return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className='rightbarProfileImg' src={NoAvatarImg} alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <div className="righrbarUsername">{user.username}</div>
          </li>
  )
}
