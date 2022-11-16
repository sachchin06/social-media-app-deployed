import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState, useRef } from "react";
import axios from "axios";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mern-social");
        data.append("cloud_name", "du9xrc6fe");

        const uploadRes = await axios.post(
          " https://api.cloudinary.com/v1_1/du9xrc6fe/image/upload",
          data
        );

        const postUrl = uploadRes.data.url;

        newPost.img = postUrl;
      }

      await axios.post("posts", newPost);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture || PF + "person/noAvatar.png"}
            alt=""
          />
          <input
            className="shareInput"
            ref={desc}
            placeholder={"What's in your mind " + user.username + "?"}
            type="text"
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
