import React, { useState,useEffect  } from 'react'
import "../styles/users.css";
import "../styles/categories.css";
import "../styles/table.css";
import ResidentialTbody from "./ResidentialTbody";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import "../styles/tableHeader1.css"
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  documentId,
  Timestamp,
} from "firebase/firestore";
import filterImage from "../assets/filterImage.png";
const Residential = () => {
    const [addlocation, setAddlocation] = useState("");
    const [location, setLocation] = useState("service_and_feeder_load_calculations");
   
    const [title, setTitle] = useState("");
    const [showsubCatModal, setShowsubCatModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ResidentialData, setResidentialData] = useState([]);
    const [value, setValue] = useState('');
    const handleSelect = (e) => {
      console.log(e.target.value);
      setValue(e)
    }
   
    const getResidentialcode = async (loc) => {
      const addResidential1 = collection(db, loc.length === 0 ? `residential_code/service_and_feeder_load_calculations/codes` : `residential_code/${loc}/codes`);
      console.log(addResidential1.path);
      const getData = await getDocs(addResidential1);
      // console.log(TableHeader)
     
      setResidentialData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
  
    const AddResidential = async (props) => {
      const data = new Date();
      const datedata = data.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: '2-digit',
         minute: '2-digit', 
         second: '2-digit'
      });
      setIsLoading(true);
      const addResidential2 = collection(db, location.length === 0 ? `residential_code/service_and_feeder_load_calculations/codes` : `residential_code/${addlocation}/codes`);
      console.log(addResidential2.path);
      const addData = await addDoc(addResidential2, {
        createdTime: datedata,
        text: title,
      })
      // .then(() => {
      //   console.log(addData);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  
      setTitle("");
      setShowsubCatModal(false);
      setIsLoading(false);
      getResidentialcode(location);
      console.log(addResidential2.path);
    };
  
    // const dropdown = (e) =>{
    //   this.setState({selectValue:e.target.id});
    // };
  
  
    useEffect(() => {
      setLocation("service_and_feeder_load_calculations")
      getResidentialcode(location);
    }, []);
    return (
      <div className="" >
  
        <div className="table-header" style={{ width: "850px" }}>
          <h2>Residential Code</h2>
  
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
  
                      setLocation(e.target.value);
                      getResidentialcode(e.target.value.toString())
                    //   console.log(location)
  
                    }}
                  >
  
                    <option value="service_and_feeder_load_calculations" >All</option>
                    <option value="grounding" >Grounding</option>
                    <option value="service_and_feeder_load_calculations">Service & feeder load calc.</option>
                    <option value="temporary_wiring">Temporary wiring</option>
                    
                  </select>
  
                </div>
                <img src={filterImage} alt=""></img>
              </div>
            </div>
  
          </div>
        </div>
        <div className="categories">
          <div className="flex justify-between text-lg font-bold">
            <h2 >Codes</h2>
            <button
              onClick={() => setShowsubCatModal(true)}
              type="button"
              class="text-white mr-10 bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
            >
              Add Codes
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
                <th>Date</th>
                <th>Text</th>
  
              </thead>
              {ResidentialData.map((val, ind) => {
              return (
                <ResidentialTbody

                  key={ind}
                  index={ind}
                  serial={val.serial}
                  id={val.id}
                  title={val.text}
                  date={val.createdTime.toString()}
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
  
  
                   <option value="grounding" >Grounding</option>
                    <option value="service_and_feeder_load_calculations">Service & feeder load calc.</option>
                    <option value="temporary_wiring">Temporary wiring</option>
                    
                </select>
  
            </div>
           
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="Key"
              id="key"
              class="bg-white-50 border h-20 border-white-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-black-500 dark:placeholder-black dark:text-black"
              placeholder="enter text"
              required=""
            />
  
  
  
  
          </div>
          {isLoading ? <LoadingSpinner /> : Residential}
          <button
           
            onClick={AddResidential}
            type="submit"
            class="max-w-md text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </Modal>
      </div>
    );
  };

export default Residential