import React, { useState, useEffect } from "react";
import { IoLockClosedOutline, IoPencil } from "react-icons/io5";
import profileIcon from "../assets/profilePictureIcon.png";
import "../styles/settings.css";
import switchImage from "../assets/switchImage.png";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Settings = (props) => {
  const [nameupdate, setnameupdate] = useState("");
  const [emailupdate, setemailupdate] = useState("");
  const [phoneupdate, setphoneupdate] = useState("");

  const [userData, setuserData] = useState([]);
  const addrefUser = collection(db, "users");


  const updateuser = async (uid) => {
    let userArray = {};
    if (nameupdate !== "" && emailupdate !== "" && phoneupdate !== "") {
      userArray = {
        name: nameupdate,
        email: emailupdate,
        phone: phoneupdate,
      };
    }
    if (nameupdate !== "" && emailupdate === "" && phoneupdate === "") {
      userArray = {
        name: nameupdate,
      };
    }
    if (nameupdate === "" && emailupdate !== "" && phoneupdate === "") {
      userArray = {
        email: emailupdate,
      };
    }
    if (nameupdate === "" && emailupdate === "" && phoneupdate !== "") {
      userArray = {
        phone: phoneupdate,
      };
    }
    if (nameupdate !== "" && emailupdate === "" && phoneupdate !== "") {
      userArray = {
        name: nameupdate,
        phone: phoneupdate,
      };
    }
    if (nameupdate !== "" && emailupdate !== "" && phoneupdate === "") {
      userArray = {
        name: nameupdate,
        email: emailupdate,
      };
    }
    if (nameupdate === "" && emailupdate !== "" && phoneupdate !== "") {
      userArray = {
        email: emailupdate,
        phone: phoneupdate,
      };
    }
    const updatedocument = doc(db, "users", uid);
    await updateDoc(updatedocument, userArray);
    window.location.reload(true);
  };



  const getUser = async () => {
    const getData = await getDocs(addrefUser);
    console.log(getData);
    setuserData(getData.docs.map((doc) => ({ id: doc.id })));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="settings">
      <h2 className="settings-title">Settings</h2>
      <div>
        <h3>Security</h3>
        {userData.map((val, ind) => (       <div className="settings-fields-container">
          <div className="field">
            <input
              value={emailupdate}
              onChange={(e) => setemailupdate(e.target.value)}
              placeholder='Change Email '

            />
            <img
              src={profileIcon}
              alt=""
              style={{ width: "18px", height: "20px" }}
            ></img>
          </div>
          <div className="field">
            <input
              value={nameupdate}
              onChange={(e) => setnameupdate(e.target.value)}
              placeholder="Change Username"
            />
            <IoLockClosedOutline className="icon" />
          </div>
          <div className="field" style={{ borderBottom: "none" }}>
            <input
              value={phoneupdate}
              onChange={(e) => setphoneupdate(e.target.value)}
              placeholder="Change Phone No"
            />
            <IoLockClosedOutline className="icon" />
          </div>


            <button
              key={ind}
              value={val.id}
              onClick={(e)=>updateuser(e.target.value)}
              type="button"
              class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
            >
              Submit
            </button>
         
        </div> ))}
      </div>
    </div>
  );
};

export default Settings;
