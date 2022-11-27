import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { db } from "../firebase";
import "../styles/users.css";
import "../styles/table.css";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
export default function SubcategoryTbody(props) {
  const [isLoading, setIsLoading] = useState(false);
    const [showupdatesubCatModal, setShowupdatesubCatModal] = useState(false);
    const [subcatupdate, setsubcatupdate] = useState(props.subcategories);
    const [serialupdate, setserialupdate] = useState(props.serialupdate);

  const updatesubcat = async (uid) => {
    // const data = new Date();
    // const datedata = data.toLocaleString("en-GB", {
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",
    
    // });
    setIsLoading(true);
    const updatedocument = doc(db, `categories/${props.locc}/subCategories`,uid);
    
    await updateDoc(updatedocument,{
      subcategory: subcatupdate,
      serial:serialupdate,
    });
    window.location.reload(true)
    setIsLoading(false);
    
  };

  const deletesubcat = async (uid) => {
    setIsLoading(true);
    const deletedocument = doc(db, `categories/${props.locc}/subCategories`,uid);
    console.log(deletedocument.path);
    await deleteDoc(deletedocument);
    window.location.reload(true)
    setIsLoading(false);
  };
  useEffect(() => {
    setserialupdate(props.serial);
    setsubcatupdate(props.subcategories);
  }, []);
  return (
    <>
      <tr  style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
                
                
              }}>

     
        <td><div className="name">{props.serial}</div></td>
        <td>{props.subcategories}</td>
        
        <td>
          <div className="flex justify-center gap-2">
            <button
               onClick={() => {
                setShowupdatesubCatModal(true)
                console.log(props);
              }}
              type="button"
              class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
            >
              EDIT
            </button>
           
            <button
              value={props.id}
              onClick={(e) => deletesubcat(e.target.value)}
        
              type="button"
              class="text-white bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  "
            >
              REMOVE
            </button>
          
          </div>
         
        </td>
        {isLoading ? <LoadingSpinner /> : SubcategoryTbody}
      </tr>
     

      <Modal
        title="Edit A Category"
        show={showupdatesubCatModal}
        contentStyle={{ height: "450px" }}
        
      >
       <button
                onClick={() => setShowupdatesubCatModal(false)}
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
       
        <input
                      value={serialupdate}
                      onChange={(e) => setserialupdate(e.target.value)}
                      type="text"
                      name="subcategory"
                      id="subcategory"
                      class="bg-gray-50 border  border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={props.serial}
                      required=""
                    />
          <input
                      value={subcatupdate}
                      onChange={(e) => setsubcatupdate(e.target.value)}
                      type="text"
                      name="subcategory"
                      id="subcategory"
                      class="bg-gray-50 border  border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={props.subcategories}
                      required=""
                    />
         
                    
                 
          
        </div>
       
        <button
                    value={props.id}
                    onClick={(e) => updatesubcat(e.target.value)}
                    type="submit"
                    class="max-w-md text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                  {isLoading ? <LoadingSpinner /> : SubcategoryTbody}
      </Modal>
    </>
  );
}
