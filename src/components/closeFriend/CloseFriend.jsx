import './closeFriend.css'
import NoAvatarImg from "../../assets/person/noAvatar.png"

export default function CloseFriend({user}) {

  return (
    <li className="sidebarFriend">
    <img src={NoAvatarImg} alt="" className='sidebarFriendImg' />
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}
