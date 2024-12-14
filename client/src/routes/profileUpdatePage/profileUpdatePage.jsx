import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  console.log(avatar);
  const navigate = useNavigate();
  console.log(currentUser.data.id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.put(
        `http://localhost:8800/api/users/${currentUser.data.id}`,
        { username, email, password, avatar: avatar[0] },
        { withCredentials: true } // Include cookies in the request
      );
      updateUser(res.data);
      navigate("/profile");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setError(
        err.response.message || "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.data.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.data.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.svg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "klearn",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
