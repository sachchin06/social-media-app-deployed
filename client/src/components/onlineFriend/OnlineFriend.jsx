import './onlineFriend.css'

export default function onlineFriend({user}) {
  const PF = "public/assets/"
  return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className='rightbarProfileImg' src={PF + user.profilePicture} alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <div className="righrbarUsername">{user.username}</div>
          </li>
  )
}
