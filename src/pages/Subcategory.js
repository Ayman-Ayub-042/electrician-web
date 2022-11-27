import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/users.css";
import "../styles/categories.css";
import "../styles/table.css";
import "../styles/tableHeader1.css"
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import InputField from "../components/InputField"
import filterImage from "../assets/filterImage.png";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  documentId,
} from "firebase/firestore";
import SubcategoryTbody from "./SubcategoryTbody";


const Subcategory = (props) => {
  const [addlocation, setAddlocation] = useState("");
  const [location, setLocation] = useState("");
  const [serial, setSerial] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [showsubCatModal, setShowsubCatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [SubcategoryData, setSubCategoryData] = useState([]);
  const [value, setValue] = useState('');
  const handleSelect = (e) => {
    console.log(e.target.value);
    setValue(e)
  }
  const [addSubcategories, setAddSubcategories] = useState(collection(db, location.length === 0 ? `categories/commercial_installs/subCategories` : `categories/${location}/subCategories`));

  const getSubcategories = async (loc) => {
    const addSubcategories1 = collection(db, loc.length === 0 ? `categories/commercial_installs/subCategories` : `categories/${loc}/subCategories`);
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
    setIsLoading(true);
    const addSubcategories2 = collection(db, addlocation.length === 0 ? `categories/blue_prints/subCategories` : `categories/${addlocation}/subCategories`);
    console.log(addSubcategories2.path);
    const addData = await addDoc(addSubcategories2, {
      serial: serial,
      subcategory: subcategories,
    })
    // .then(() => {
    //   console.log(addData);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    setSubcategories("");
    setShowsubCatModal(false);
    setIsLoading(false);
    getSubcategories(location);
   
  };

  // const dropdown = (e) =>{
  //   this.setState({selectValue:e.target.id});
  // };


  useEffect(() => {
    var loc=localStorage.getItem('sublocation');
    if (loc){
      setLocation(loc)
      
    }
    else{
      setLocation("commercial_installs")
     
    }
   
    if (loc){
      getSubcategories(loc)
      
    }
    else{
      getSubcategories("commercial_installs")
     
    }
   
  }, []);
  return (
    <div className="" >

      <div className="table-header" style={{ width: "1000px" }}>
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
                  value={location}
                  className="block p-2 m-1 w-9 max-w-sm text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    border: "0 !important",
                    cursor: "pointer",
                  }}
                  onChange={(e) => {

                    setLocation(e.target.value);
                    localStorage.setItem('sublocation',e.target.value);
                    getSubcategories(e.target.value.toString())
                    // console.log(location)

                  }}
                >

                  <option value="" >All</option>
                  <option value="blue_prints" >BluePrints</option>
                  <option value="fish_tape_glide">Fish Tape Glide</option>
                  <option value="panel_wiring">Panel Wiring & Sizing</option>
                  <option value="service_feedar">Service & Feedar Wiring</option>
                  <option value="commercial_installs">Commercial Installs</option>
                  <option value="residential_installs">Residential Installs</option>
                </select>

              </div>
              <img src={filterImage} alt=""></img>
            </div>
          </div>

        </div>
      </div>
      <div className="categories">
        <div className="flex  text-lg font-bold">
          <h2 >Subcategories</h2>
          <button
            onClick={() => setShowsubCatModal(true)}
            type="button"
            class="text-white ml-[700px] mr-10 bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
          >
            Add SubCategory
          </button>
        </div>


        <div className="table pl-3">
          <table style={{ height: "auto" }} >
            <thead

              style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",

              }}
            >
              <th>Serial No</th>
              <th>Subcategory Name</th>

            </thead>
            {SubcategoryData.map((val, ind) => {
              return (
                <SubcategoryTbody

                  key={ind}
                  index={ind}
                  serial={val.serial}
                  id={val.id}
                  subcategories={val.subcategory}
                  date={val.date}
                  locc={location.toString()}
                />
              );
            })}
          </table>
        </div>
      </div>


      <Modal
      
        title="Adding New Subcategory"
        show={showsubCatModal}
        contentStyle={{ height: "350px" }}
      >
        <button
          onClick={() => setShowsubCatModal(false)}
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
          <div className="center-container ">
            
              {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}

              <select

                className="bg-white-50 border  border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                style={{
                  backgroundColor: "white",
                  border: "0 !important",
                  boxShadow: "0 !important",
                  border: "0 !important",
                  cursor: "pointer",
                }}
                onChange={(e) => {

                  setAddlocation(e.target.value);


                }}
              >


                <option value="blue_prints" >BluePrints</option>
                <option value="fish_tape_glide">Fish Tape Glide</option>
                <option value="panel_wiring">Panel Wiring & Sizing</option>
                <option value="service_feedar">Service & Feedar Wiring</option>
                <option value="commercial_installs">Commercial Installs</option>
                <option value="residential_installs">Residential Installs</option>
              </select>

          </div>
          <input
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            type="text"
            name="Key"
            id="key"
            class="bg-white-50 border  border-white-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-black-500 dark:placeholder-black dark:text-black"
            placeholder="Serial No"
            required=""
          />
          <input
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
            type="text"
            name="Key"
            id="key"
            class="bg-white-50 border  border-white-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-black-500 dark:placeholder-black dark:text-black"
            placeholder="Subcategory name"
            required=""
          />




        </div>
      
        <button
         
          onClick={AddSubcategory}
          type="submit"
          class="max-w-md text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {isLoading ? <LoadingSpinner /> : Subcategory}
      </Modal>
    </div>
  );
};

export default Subcategory;
