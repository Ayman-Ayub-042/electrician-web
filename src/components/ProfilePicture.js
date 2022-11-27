import dummy_image from "../assets/dummy_image.jpeg";
import "../styles/profile-picture.css";

const ProfilePicture = (props) => {
  return (
    <div className="profile-picture" style={props.style}>
      <img
        style={props.imgStyle ? props.imgStyle : {}}
        src={dummy_image}
        alt="img"
      ></img>
    </div>
  );
};

export default ProfilePicture;
