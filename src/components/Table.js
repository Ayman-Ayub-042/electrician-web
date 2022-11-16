import React, {  useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useContext } from "react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useState } from "react";
import "../styles/table.css";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import filterImage from "../assets/filterImage.png";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { GlobalContext } from "../contexts/globalState";
const Table = (props) => {
  const navigate = useNavigate();
  const { locations } = useContext(GlobalContext);
  const [location, setLocation] = useState("");
  console.log(locations)
  const acceptordecline = async (uid) => {
    console.log(uid);

    const ref = doc(db, "pending_bookings", uid[0]);
    let dataArray = {};
    if (uid[1] === "true") {
      dataArray = {
        isApprroved: true,
      };
      alert("Approved");
     
    }
    if (uid[1] === "false") {
      dataArray = {
        isApprroved: false,
      };
      alert("Declined");
      
    }

    try {
      await updateDoc(ref, dataArray);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
  };

  return (
    <div>
      <div className="table-header" style={props.style}>
        <h2>{props.title}</h2>

        <div className="container">
          <div
            className="center-container"
            style={{ width: "100%", justifyContent: "right" }}
          >
            {props.default ? (
              <div className="location">
                Default <AiFillCaretDown className="icon small" />
              </div>
            ) : (
              ""
            )}
            <div className="center-container">
              <div
                className="location"
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  borderRadius: 25,
                }}
              >
                {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}
                <label className="block mx-2 text-sm font-medium">
                  {" "}
                  Branch:{" "}
                </label>
                <select
                  className="block p-2 m-1 max-w-sm text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    border: "0 !important",
                   cursor:'pointer',
                  }}
                  onChange={(e) => {
                    if (e.target.value == "All") {
                      setLocation("");
                    } else {
                      setLocation(e.target.value);
                    }
                  }}
                >
                  <option >All</option>
                  {locations.map((val,ind)=><option>{val.data.branch}</option>)}
                </select>
              </div>
              <img src={filterImage} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Table;
