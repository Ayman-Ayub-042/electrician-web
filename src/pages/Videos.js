import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/users.css";
import "../styles/table.css";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";
import InputField from "../components/InputField"
import { db } from "../firebase";
import "../styles/tableHeader1.css"
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import VideosTbody from "./VideosTbody";
import filterImage from "../assets/filterImage.png";


const Videos = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [video, setvideo] = useState("");
  const [title, settitle] = useState("");
  const [videolocation, setvideoLocation] = useState("");
  const [location, setLocation] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [SubcategoryData, setSubCategoryData] = useState([]);
  const addSubcategories = collection(db, location.length === 0 ? `categories/commercial_installs/subCategories` : `categories/${location}/subCategories`);

  const getSubcategories = async (loc) => {
    
    const addSubcategories1 = collection(db, loc.length === 0 ? `categories/commercial_installs/subCategories` : `categories/${loc}/subCategories`);
    console.log(addSubcategories1.path);
    const getData = await getDocs(addSubcategories1);
    // console.log(TableHeader)
    setSubCategoryData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const AddSubcategory = async (props) => {
    // const data = new Date();
    // const datedata = data.toLocaleString("en-GB", {
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",

    // });
    const addData = await addDoc(addSubcategories, {

      subcategory: subcategories,


    })
    setSubcategories("");
    getSubcategories(location);
  };



  // const addvideoref = collection(db, videolocation.length === 0 ? `categories/blue_prints/subCategories/UIwPnumkhBfZzZNkciNm/Parts` : `categories/${location}/subCategories/${videolocation}/Parts`);

  
  const getVideo = async (loc) => {
    console.log(loc);
    const addvideoref1 = collection(db, videolocation.length === 0 ? `categories/blue_prints/subCategories/UIwPnumkhBfZzZNkciNm/Parts` : `categories/${location}/subCategories/${loc}/Parts`);
    const getData = await getDocs(addvideoref1);

    console.log(getData);
    setVideoData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const AddVideo = async () => {
    const data = new Date();
    const datedata = data.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",

    });
    setIsLoading(true);
    const addvideoref1 = collection(db, videolocation.length === 0 ? `categories/blue_prints/subCategories/UIwPnumkhBfZzZNkciNm/Parts` : `categories/${location}/subCategories/${videolocation}/Parts`);
    console.log(addvideoref1.path);
    const addData = await addDoc(addvideoref1, {

      Url: video,
      title: title,
      date: datedata,
    })
      .then(() => {
        console.log(addData);
      })
      .catch((err) => {
        console.log(err);
      });
      setIsLoading(false);
    setvideo("");
    settitle("");

    setShowVideoModal(false);
    getVideo(videolocation);
  };

  useEffect(() => {
    setLocation("")
    getSubcategories(location);
    getVideo(videolocation);
    setvideoLocation("");    

  }, []);
  return (
    <>
      <div className="table-header" style={{ width: "850px" }}>
        <h2>Categories</h2>

        <div className="container">
          <div
            className="center-container"
            style={{ width: "100%", justifyContent: "right" }}
          >
            <div className="center-container">
              <div
                className="location bg-green-500 pl-2"
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  borderRadius: 25,
                }}
              >
                {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}
                <label>Select:</label>
                <select

                  className="block p-2 m-1 w-9 max-w-sm text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    border: "0 !important",
                    cursor: "pointer",
                  }}
                  onChange={(e) => {
                    if (e.target.value == "All") {
                      setLocation("");
                    } else {
                      setLocation(e.target.value);
                      getSubcategories(e.target.value)
                      // console.log(location)
                    }
                  }}
                >

                  <option value="" >All</option>
                  <option value="blue_prints" >BluePrints</option>
                  <option value="fish_tape_glide">Fish Tape Glide</option>
                  <option value="panel_wiring">Panel Wiring & Sizing</option>
                  <option value="service_feedar">Service & Feedar Wiring</option>
                  <option value="commercial_installs">Commercial Installs</option>

                </select>

              </div>
              <img src={filterImage} alt=""></img>
            </div>
          </div>
        </div>
      </div>



      <div className="table-header" style={{ width: "850px" }}>
        <h2>SubCategories</h2>

        <div className="container">
          <div
            className="center-container"
            style={{ width: "100%", justifyContent: "right" }}
          >
            <div className="center-container">
              <div
                className="location bg-green-500 pl-2"
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  borderRadius: 25,
                }}
              >
                {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}
                <label>Select:</label>
                <select

                  className="block p-2 m-1 w-9 max-w-sm text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    border: "0 !important",
                    cursor: "pointer",
                  }}
                  onChange={(e) => {
                    if (e.target.value == "All") {
                      setvideoLocation("");
                    } else {
                      setvideoLocation(e.target.value);
                      getVideo(e.target.value)
                      // console.log(location)
                    }
                  }}
                >

                  <option value="All" >All</option>
                  {SubcategoryData.map((val, ind) => (
                    <option value={val.id}>{val.subcategory}</option>
                  ))}
                </select>
              </div>
              <img src={filterImage} alt=""></img>
            </div>
          </div>
        </div>
      </div>





      <div className="categories">
        <div className="flex justify-between">
          <h2>Videos</h2>
          <button
            onClick={() => setShowVideoModal(true)}
            type="button"
            class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
          >
            Add Videos
          </button>
        </div>


        <div className="table">
          <table style={{ height: "auto" }}>
            <tr
              style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
              }}
            >

              <th>Serial No</th>
              <th>URL</th>
              <th>Title</th>
              <th>Date Issue</th>
            </tr>
            {videoData.map((val, ind) => {
              

              return (
                <VideosTbody

                  key={ind.Serial}
                  index={ind}
                  id={val.id}

                  Url={val.Url}
                  title={val.title}

                  date={val.date}
                  locc={location}
                  vlocc={videolocation}
                />
              );
            })}
          </table>
        </div>
      </div>


      <Modal
        title="Add Video"
        show={showVideoModal}
        contentStyle={{ height: "350px" }}

      >
        <button
          onClick={() => setShowVideoModal(false)}
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        {/* <div className="picture-container">
          <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} />
          <span>Update picture</span>
        </div> */}
        <div className="input-container">
          <select

            class="bg-white-50 border  border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            style={{
              backgroundColor: "white",
              border: "0 !important",
              boxShadow: "0 !important",
              border: "0 !important",
              cursor: "pointer",
            }}
            onChange={(e) => {

              setLocation(e.target.value);
              getSubcategories(e.target.value)

            }}
          >


            <option value="blue_prints" >BluePrints</option>
            <option value="fish_tape_glide">Fish Tape Glide</option>
            <option value="panel_wiring">Panel Wiring & Sizing</option>
            <option value="service_feedar">Service & Feedar Wiring</option>
            <option value="commercial_installs">Commercial Installs</option>

          </select>

          <select

            class="bg-white-50 border  border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            style={{
              backgroundColor: "white",
              border: "0 !important",
              boxShadow: "0 !important",
              border: "0 !important",
              cursor: "pointer",
            }}
            onChange={(e) => {
              if (e.target.value == "All") {
                setvideoLocation("");
              } else {
                setvideoLocation(e.target.value);
                getVideo(e.target.value.toString())
                // console.log(location)
              }
            }}
          >

            <option value="All" >All</option>
            {SubcategoryData.map((val, ind) => (
              <option value={val.id}>{val.subcategory}</option>
            ))}
          </select>

          <input

            type="text"
            value={video}
            onChange={(e) => setvideo(e.target.value)}

            class="bg-white-50 border  border-white-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-black-500 dark:placeholder-black dark:text-black"

            placeholder="Url"
            required=""
          />
          <input

            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}

            class="bg-white-50 border  border-white-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-white-600 dark:border-black-500 dark:placeholder-black dark:text-black"
            placeholder="Title"
            required=""
          />




        </div>
        {isLoading ? <LoadingSpinner /> : Videos}
        <button
          onClick={AddVideo}

          type="submit"
          class="max-w-md text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </Modal>
    </>
  );
};

export default Videos;
