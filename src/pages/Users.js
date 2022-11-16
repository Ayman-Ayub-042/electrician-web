import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/users.css";
import "../styles/table.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UsersTbody from "./UsersTbody";

const Users = () => {
  const [addname, setaddname] = useState("");
  const [addemail, setaddemail] = useState("");
  const [addphone, setaddphone] = useState("");
  const [modal, setmodal] = useState(false);

  const [userData, setuserData] = useState([]);
  const addrefUser = collection(db, "users");

  const getUser = async () => {
    const getData = await getDocs(addrefUser);
    console.log(getData);
    setuserData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const AddUser = async () => {
    const addData = await addDoc(addrefUser, {
      name: addname,
      email: addemail,
      phone: addphone,
    })
      .then(() => {
        console.log(addData);
      })
      .catch((err) => {
        console.log(err);
      });
    setaddname("");
    setaddemail("");
    setaddphone("");
    setmodal(false);
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="users">
        <div className="flex justify-between">
          <h2>Users</h2>
          <button
            onClick={() => setmodal(true)}
            type="button"
            class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  "
          >
            Add
          </button>
        </div>
        <div className="search-bar">
          <IoSearchOutline className="icon" />
          <input placeholder="Search user by name or email..." />
        </div>

        <div className="table">
          <table style={{ height: "auto" }}>
            <tr
              style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
              }}
            >
              <th>Name</th>
              <th>Email </th>
              <th>Phone No</th>
            </tr>
            {userData.map((val, ind) => {
              return (
                <UsersTbody
                  key={ind}
                  id={val.id}
                  name={val.name}
                  email={val.email}
                  phone={val.phone}
                />
              );
            })}
          </table>
        </div>
      </div>

      {modal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          class="   fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center bg-gray-500 bg-opacity-20"
        >
          <div class="relative m-auto p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-[#242424] rounded-lg shadow ">
              <button
                onClick={() => setmodal(false)}
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
              <div class="py-6 px-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-white">
                  Edit Activation Key
                </h3>
                <form class="space-y-6" action="#">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      KEY
                    </label>
                    <input
                      value={addname}
                      onChange={(e) => setaddname(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="username"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      value={addemail}
                      onChange={(e) => setaddemail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="user@gmail.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm font-medium text-white"
                    >
                      Phone
                    </label>
                    <input
                      value={addphone}
                      onChange={(e) => setaddphone(e.target.value)}
                      type="number"
                      name="phone"
                      id="phone"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Phone No"
                      required=""
                    />
                  </div>
                  <button
                    onClick={AddUser}
                    type="submit"
                    class="max-w-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
