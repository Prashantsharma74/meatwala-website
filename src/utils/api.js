import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/store";
// const API_URL = "/api/customer";

const API_URL = "https://partnermeatwala.com/api/customer";
// const API_URL = "https://partnermeatwala.com/api/customer";
const API_URL1 = "https://partnermeatwala.com/api/restaurantmaster";
const API_URL2 = "https://partnermeatwala.com/api/drivermaster";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Error retrieving user from localStorage:", error);
    return null;
  }
};

// Function to listen for changes in localStorage (e.g., across tabs)
const listenForLocalStorageChanges = (callback) => {
  window.addEventListener("storage", (event) => {
    if (event.key === "user") {
      // When the "user" key is updated in localStorage, call the callback function
      callback(getStoredUser());
    }
  });
};

const storedUser = getStoredUser();

/////////// login start ////////
export const sendOtpApi = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/sendotp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const addcustinfoApi = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/addcustinfo`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    if (res.data.status == "1") {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
/////////// login end ////////

export const getRestaurants = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getdashboardforcust`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("getRestaurants", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
// export const getRestaurants = async (data) => {

//   try {
//     const res = await axios.post(
//       `${API_URL}/gettoprestaurantforcust`,
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     // console.log(res.data);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching restaurants:", error);
//     throw error;
//   }
// };
export const getDiningRestaurants = async (data) => {
  // data = {
  //   page: "1",
  //   pincode: "4430008",
  //   lat: "21.0980572",
  //   lng: "79.0667197",
  //   userid: "7",
  // };

  try {
    const res = await axios.post(`${API_URL}/getrestfordining`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const getTopRestaurants = async (data) => {
  // data = {
  //   pincode: "4430008",
  //   lat: "21.0980572",
  //   lng: "79.0667197",
  // };

  try {
    const res = await axios.post(`${API_URL}/gettoprestaurantforcust`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const getOfferRestaurants = async (data) => {
  // data = {
  //   pincode: "4430008",
  //   lat: "21.0980572",
  //   lng: "79.0667197",
  // };

  try {
    const res = await axios.post(`${API_URL}/getofferrestaurantlist`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getRestaurantFood = async (data) => {

  try {
    const res = await axios.post(
      `${API_URL}/getrestaurantdetailsforcust`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const chooseAdd = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getmenudetailsforcust`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const orderHistory = async (data) => {
  // data =  {
  //   userid: "42",
  // };
  try {
    const res = await axios.post(`${API_URL}/getorderhistory`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const DiningHistory = async (data) => {
  // data =  {
  //   userid: "42",
  // };
  try {
    const res = await axios.get(
      `${API_URL}/GetCustomerDiningBookingListByCustId`,
      {
        params: {
          custid: data.custid, // assuming `userid` is what you want to use as `custid`
        },

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
// API fetch function for OpenAndClose
export const OpenAndClose = async (data) => {
  try {
    const res = await axios.get(
      `${API_URL}/GetRestaurantOpenCloseTimeDetails`,
      {
        params: {
          restid: data.restid, // Ensure restid is correctly passed as a query parameter
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurant open/close times:", error);
    throw error;
  }
};

export const reOrder = async (data) => {
  // data =  {
  //   userid: "42",
  // };
  try {
    const res = await axios.post(`${API_URL}/reorderbooking`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const categorylist = async (data) => {
  data = {
    sortingtype: "1",
  };
  try {
    const res = await axios.post(`${API_URL}/getcategorylistforcust`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const categorylistRestaurant = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getcategorywiserestaurant`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Res", res)
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
// //////////  CART apis  ///////////

export const addToCart = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/insertupdatecart`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const CartItems = async (data) => {
  const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
  const pincode = storedPincode ? storedPincode.longName : "";
  const user = JSON.parse(localStorage.getItem("user"));
  const state = store.getState();
  const activeTab = state.User.activeTab;
  data = {
    custid: user?.userid,
    // custid: "6",
    pincode: pincode.toString(),
    type: activeTab == "Delivery" ? "delivery" : "takeaway",
  };
  try {
    const res = await axios.post(`${API_URL}/getcartmenudetaillist`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

////////// profile apis //////////////////////////////////
export const getCustaddress = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getcustaddressbyid`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const getFavorite = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getcustfavrestaurant`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getFaq = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getfaqlist`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const customerdetail = async (data) => {
  const storedUser = getStoredUser();

  if (!storedUser?.userid) {
    throw new Error("User ID is not available.");
  }

  data = {
    custid: storedUser?.userid,
  };
  try {
    const res = await axios.post(`${API_URL}/getcustdatabyid`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const orderdetails = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getorderhistorybyid`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const getrestdetailsfordining = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getrestdetailsfordining`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const deltAddress = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/deletecustaddress`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const search = async (data) => {

  try {
    const res = await axios.post(`${API_URL}/getsearchrestaurant`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const logout = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/logoutcustomer`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const DeleteAccount = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/deleteaccount`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const review = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/givereviewandrating`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const bookDining = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/insertrestdiningbooking`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status == "1") {
      toast.success("Dining booked successfully");
      return res.data;
    }
  } catch (error) {
    toast.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const addFav = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/addupdatefavorite`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "1") {
      toast.success(`${res.data.returnmsg}`);
      return res.data;
    }
  } catch (error) {
    toast.error("not added address:");
    // throw error;
  }
};
export const addcustinfo = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/addcustinfo`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "1") {
      return res.data;
    }
  } catch (error) {
    toast.error("not added address:");
    // throw error;
  }
};
export const notification = async () => {
  const data = {
    userid: "17",
  };
  try {
    const res = await axios.post(`${API_URL}/getnotifificationlist`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "1") {
      // toast.success("Address Added Successfully")
      return res.data;
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
export const Allsupport = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getsupportlist`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "1") {
      // toast.success("Address Added Successfully")
      return res.data;
    }
  } catch (error) {
    toast.error("not added address:");
    // throw error;
  }
};
export const loyalty = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getcustloyaltyhistory`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "1") {
      // toast.success("Address Added Successfully")
      return res.data;
    }
  } catch (error) {
    toast.error("not added address:");
    // throw error;
  }
};

export const generateTicket = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/sendsupport`, data);

    if (res.data.status === "1") {
      toast.success(res.data.returnmsg);
      return res.data;
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
export const addOrder = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/addorder`, data);

    return res.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
export const supportbyId = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/getsupportdetailbyid`, data);

    if (res.data.status === "1") {
      return res.data;
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
export const Updateticket = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/updateticket`, data);

    if (res.data.status === "1") {
      return res.data;
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
export const Deletenotification = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/deletenotification`, data);

    if (res.data.status === "1") {
      return res.data;
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const getMaxGuestCapacity = async (restId) => {
  try {
    const res = await axios.get(`${API_URL1}/getmaxdiningguestcapicity`, {
      params: { restid: restId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching max guest capacity:", error);
    throw error;
  }
};

export const fetchDiningTimeSlots = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/getdiningtimeslot`, data);

    // Check if the response was successful
    if (response.data.success === "1") {
      return response.data; // Return the time slots from the response
    } else {
      throw new Error("Failed to fetch time slots");
    }
  } catch (error) {
    console.error("Error fetching dining time slots:", error);
    return [];
  }
};
export const DiningBooking = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/godiningbooking`, data);

    // Check if the response was successful
    if (response.data.success === "1") {
      return response.data; // Return the time slots from the response
    } else {
      throw new Error("Failed to fetch time slots");
    }
  } catch (error) {
    console.error("Error fetching dining time slots:", error);
    return [];
  }
};

export const getDiningOrderStatus = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/get_diningorder_status_after_payment`,
      data
    );

    // Check if the response was successful
    if (response.data.status === "1") {
      return response.data; // Return the response data if successful
    } else {
      throw new Error("Failed to retrieve order status");
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null; // Return null or handle as needed
  }
};
export const AddRestaurant = async (data) => {
  try {
    const response = await axios.post(`${API_URL1}/insertrestaurant`, data);

    // Check if the response was successful
    if (response.data.success === "1") {
      return response.data; // Return the response data if successful
    } else {
      throw new Error("Failed to retrieve order status");
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null; // Return null or handle as needed
  }
};
export const verifyotps = async (data) => {
  try {
    const response = await axios.post(`${API_URL1}/verifyotp`, data);
    // Use the correct property in the API response
    if (response.data.success === "1") {
      return response.data; // Return the response data if successful
    } else {
      console.error("API returned failure:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message, error.response);
    return null; // Handle error gracefully
  }
};

export const Checkotp = async (data) => {
  try {
    const response = await axios.post(`${API_URL1}/checkotp`, data);
    // Check if the response was successful
    if (response.data.success === "1") {
      return response.data; // Return the response data if successful
    } else {
      throw new Error("Failed to retrieve order status");
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null; // Return null or handle as needed
  }
};

export const sendRequestForRider = async (data) => {
  try {
    const response = await axios.post(`${API_URL2}/insertdriver`, data);
    if (response.data.success === "1") {
      return response.data;
    } else {
      throw new Error("Failed to send request");
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null;
  }
};

export const getOtpForRider = async (data) => {
  try {
    const response = await axios.post(`${API_URL2}/getEmailverify`, data);
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return null;
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/Getbloglistforcust`);
    if (response.data.success === "1") {
      return response.data;
    } else {
      throw new Error("Failed to send request");
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null;
  }
};
export const getAllContents = async () => {
  try {
    const response = await axios.get(`${API_URL}/Getcontentlistforcust`);
    if (response.data.success === "1") {
      return response.data;
    } else {
      throw new Error("Failed to send request");
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null;
  }
};

export const insertSupportedBybites = async (data) => {

  try {
    const response = await axios.post(
      `${API_URL}/Insertsupportedbybites`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      // API responded with an error status
      console.error("API Error:", error.response.data);
      return { success: false, error: error.response.data };
    } else if (error.request) {
      // No response received
      console.error("No Response from API:", error.request);
      return { success: false, error: "No response from server" };
    } else {
      // Some other error
      console.error("Axios Error:", error.message);
      return { success: false, error: error.message };
    }
  }
};

export const insertrestaurantwholesale = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/insertrestaurantwholesale`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error Getting:-", error);
    return null;
  }
};

export const insertbitesforbussiness = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/Insertbitesforbussiness`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error Getting:-", error);
    return null;
  }
};
export const DriverVehicle = async (data) => {
  try {
    const response = await axios.post(
      `https://partnermeatwala.com/api/drivermaster/insertdrivervehical`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error Getting:-", error);
    return null;
  }
};

// Function to update user on localStorage changes
const updateUserOnStorageChange = (newUser) => {
  // Here you can trigger a state update or other logic when user data changes
};

// Start listening for localStorage changes
listenForLocalStorageChanges(updateUserOnStorageChange);

// Only export the necessary functions once
export { listenForLocalStorageChanges };
