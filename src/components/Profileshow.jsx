// import React, { useEffect, useState } from "react";
// import { customerdetail,logout } from "../utils/api";
// import { Link,useNavigate  } from "react-router-dom";
// import { FaTrash } from 'react-icons/fa';
// import { DeleteAccount } from "../utils/api";
// import { FcFaq } from "react-icons/fc";
// import { MdOutlineSupportAgent } from "react-icons/md";
// import Swal from "sweetalert2";
// import { MdOutlineLocalDining } from "react-icons/md";
// const Profileshow = ({ selected }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState([]);
//   const getData = async () => {
//     const user = await customerdetail();
//     if (user && user.customerdata && user.customerdata.length > 0) {

//     setUser(user.customerdata[0]);

//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleDelete = async () => {
//     const storedUser = JSON.parse(localStorage.getItem("user")); // Get user from local storage
//     if (!storedUser || !storedUser.userid) {
//       Swal.fire("Error", "User ID not found", "error");
//       return;
//     }

//     const data = { userid: storedUser.userid }; // Send userid in request
//     const response = await DeleteAccount(data);

//     if (response?.status === "1") {
//       Swal.fire({
//         title: "Account Deleted",
//         text: "Your account has been successfully deleted.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         localStorage.clear();
//         navigate("/login"); // Navigate after confirmation
//       });
//     } else {
//       Swal.fire("Error", "Failed to delete account", "error");
//     }
//   };

//   const handleLogout = async()=>{
//     const savedTab = localStorage.getItem('user');
//     const data = {
//       userid:user?.pkid
//     }
//     console.log(data,"dataaaaaa")

//     const Logoutdata = await logout(data)

//     console.log(Logoutdata,"logggg")

//     localStorage.removeItem('user');

//     navigate('/login');

//   }
//   return (
//     <>
//       <div className="profile-sidebar sticky-top">
//         <div className="profile-cover">
//           {
//             user.imagename ?
//             <img
//                 className="img-fluid profile-pic"
//                 src={`https://partnermeatwala.com/documents/${user.imagename}`}
//                 alt="profile"
//               />
//               :
//               <img
//              className="img-fluid profile-pic"
//              src={`assets/images/profile-picture.webp`}
//              alt="profile"
//            />
//           }
//         </div>
//         <div className="profile-name">
//           <h5 className="user-name">{user.name}</h5>
//           <h6>{user.email}</h6>
//         </div>
//         <ul className="profile-list">
//           <li className={selected === "setting" ? `active` : ""}>
//             <i className="ri-user-3-line" />
//             <Link to={"/setting"}>Profile</Link>
//           </li>
//           <li className={selected === "History" ? `active` : ""}>
//             <i className="ri-shopping-bag-3-line" />
//             <Link to={"/myhistory"}>Takeout History</Link>
//           </li>
//           {/* <li
//         className={selected === "DiningHistory" ? "active" : ""}
//         // onClick={handleDelete}
//       >
//         <i className="icon"><MdOutlineLocalDining /></i>
//         <Link to={"/dininghistory"}>Dining History</Link>
//       </li> */}
//           <li className={selected === "Address" ? `active` : ""}>
//             <i className="ri-map-pin-line" />
//             <Link to={"/address"}>Address Book</Link>
//           </li>
//           <li className={selected === "Favourite" ? `active` : ""}>
//             <i className="fa fa-heart" />
//             <Link to={"/favourite"}>Favourite Restaurant</Link>
//           </li>
//           <li className={selected === "Help" ? `active` : ""}>
//             <i className="ri-question-line" />
//             <Link to={"/loyaltypoint"}>Loyalty</Link>
//           </li>
//           <li className={selected === "FAQ" ? `active` : ""}>
//           <FcFaq />
//          <Link to={"/faq"}>FAQ</Link>
//           </li>
//           <li className={selected === "support" ? `active` : ""}>
//           <MdOutlineSupportAgent />
//           <Link to={"/support"}>Support</Link>
//           </li>
//           <li className={selected === "notify" ? `active` : ""}>
//           <i className="fa fa-bell" />{" "}
//           <Link to={"/notification"}>Notification</Link>
//           </li>
//           <li
//           className="logout-button"
//           onClick={handleLogout}
//           aria-label="Log out"
//           >
//             <i className="ri-logout-box-r-line" />
//             Log Out
//           </li>

//           <li
//         className={selected === "Delete Account" ? "active" : ""}
//         onClick={handleDelete}
//         >
//         <i className="icon"><FaTrash /></i> {/* Replace with new icon */}
//         <Link to={"/login"}>Delete Account</Link>
//       </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Profileshow;

import React, { useEffect, useState } from "react";
import { customerdetail, logout } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DeleteAccount } from "../utils/api";
import { FcFaq } from "react-icons/fc";
import { MdOutlineSupportAgent } from "react-icons/md";
import Swal from "sweetalert2";
import { MdOutlineLocalDining } from "react-icons/md";

const Profileshow = ({ selected }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const getData = async () => {
    const user = await customerdetail();
    if (user && user.customerdata && user.customerdata.length > 0) {
      setUser(user.customerdata[0]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(232, 65, 53)",
      cancelButtonColor: "rgb(232, 65, 53)",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms, proceed with API call
    if (result.isConfirmed) {
      const storedUser = JSON.parse(localStorage.getItem("user")); // Get user from local storage
      if (!storedUser || !storedUser.userid) {
        Swal.fire("Error", "User ID not found", "error");
        return;
      }

      const data = { userid: storedUser.userid }; // Send userid in request

      try {
        const response = await DeleteAccount(data); // Call the API

        // Check if the API response is successful
        if (response?.status === "1") {
          Swal.fire({
            title: "Account Deleted",
            text: "Your account has been successfully deleted.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.removeItem("userAddress");
            localStorage.removeItem("user");
            localStorage.removeItem("pincode");
            localStorage.removeItem("hasVisited");
            // Remove specific cookies
          document.cookie = "userAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "pincode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate("/login"); // Navigate to login page only after successful deletion
          });
        } else {
          Swal.fire("Error", "Failed to delete account", "error");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the account",
          "error"
        );
      }
    }
  };

  const handleLogout = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from this session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(232, 65, 53)",
      cancelButtonColor: "rgb(232, 65, 53)",
      confirmButtonText: "Yes, log out!",
    });

    // If user confirms, proceed with API call
    if (result.isConfirmed) {
      const savedTab = localStorage.getItem("user");
      const data = {
        userid: user?.pkid,
      };

      try {
        const Logoutdata = await logout(data); // Call the API

        // Check if the API response is successful
        if (Logoutdata?.status === "1") {
          Swal.fire({
            title: "Logged Out",
            text: "You have been successfully logged out.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.removeItem("user"); // Clear user data from local storage
            navigate("/login"); // Navigate to login page only after successful logout
          });
        } else {
          Swal.fire("Error", "Failed to log out", "error");
        }
      } catch (error) {
        console.error("Error logging out:", error);
        Swal.fire("Error", "An error occurred while logging out", "error");
      }
    }
  };

  return (
    <>
      <div className="profile-sidebar sticky-top">
        <div className="profile-cover">
          {user.imagename ? (
            <img
              className="img-fluid profile-pic"
              src={`https://partnermeatwala.com/documents/${user?.imagename}`}
              alt="profile"
            />
          ) : (
            <img
              className="img-fluid profile-pic"
              src={`assets/images/profile-picture.webp`}
              alt="profile"
            />
          )}
        </div>
        <div className="profile-name">
          <h5 className="user-name">{user.name}</h5>
          <h6>{user.email}</h6>
        </div>
        <ul className="profile-list">
          <li className={selected === "setting" ? `active` : ""}>
            <i className="ri-user-3-line" />
            <Link to={"/setting"}>Profile</Link>
          </li>
          <li className={selected === "History" ? `active` : ""}>
            <i className="ri-shopping-bag-3-line" />
            <Link to={"/myhistory"}>Order History </Link>
          </li>
          {/* <li
        className={selected === "DiningHistory" ? "active" : ""}
        // onClick={handleDelete}
      >
        <i className="icon"><MdOutlineLocalDining /></i> 
        <Link to={"/dininghistory"}>Dining History</Link>
      </li> */}
          <li className={selected === "Address" ? `active` : ""}>
            <i className="ri-map-pin-line" />
            <Link to={"/address"}>Address Book</Link>
          </li>
          <li className={selected === "Favourite" ? `active` : ""}>
            <i className="fa fa-heart" />
            <Link to={"/favourite"}>Favourite Stores </Link>
          </li>
          <li className={selected === "Help" ? `active` : ""}>
            <i className="ri-question-line" />
            <Link to={"/loyaltypoint"}>Loyalty</Link>
          </li>
          <li className={selected === "FAQ" ? `active` : ""}>
            <FcFaq />
            <Link to={"/faq"}>FAQ</Link>
          </li>
          <li className={selected === "support" ? `active` : ""}>
            <MdOutlineSupportAgent />
            <Link to={"/support"}>Support</Link>
          </li>
          <li className={selected === "notify" ? `active` : ""}>
            <i className="fa fa-bell" />{" "}
            <Link to={"/notification"}>Notification</Link>
          </li>
          <li
            className="logout-button"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <i className="ri-logout-box-r-line" />
            Log Out
          </li>

          <li
            className={selected === "Delete Account" ? "active" : ""}
            onClick={handleDelete}
          >
            <i className="icon">
              <FaTrash />
            </i>
            <Link>Delete Account</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profileshow;
