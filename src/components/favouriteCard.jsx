import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { addFav } from '../utils/api';

{/* <CiHeart /> */}
const FavouriteCard = ({item,getFavorite}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [fav, setFav] = useState([]);
  const [Favres,setFavres] = useState("")
  useEffect(() => {
    if (item) {
      setFavres(item.pkid);
      setFav(item.isfav);
    }
  }, [item]);

const favrite = async()=>{
  const data = {
     
      custid:storedUser?.userid,
      restid:Favres           ,
       isfav:fav == "1" ? "0" : "1"
  }
  const response = await addFav(data);
  if(response.status == "1"){
    getFavorite()
  }
}

  return (
    <>
    {/* <div className='row g-4 ratio2_3'> */}
    {/* <Link to={item?.isonline === "1" ? `/restaurant/${item?.pkid}` : `/restaurant/${item?.pkid}`}> */}

            {/* <div key={item?.pkid} className="col-xl-6 col-lg-4 col-sm-6 trash"> */}
           <div className="vertical-product-box product-style-2">
          <div className="vertical-product-box-img">
            {/* <Link href="menu-listing.html"> */}
            
  <img
    className={`product-img-top w-100 bg-img bg-size fix-image-size ${item?.isonline === "1" ? "" : "grayscale-img"}`}
    src={`https://partnermeatwala.com/documents/${item?.imagename}`}
    alt="Product"
  />
  
  <button className="wishlist-close" onClick={favrite}>
           {item.isfav == "1" ? 
                        <i
                          className="fa fa-heart"
                          style={{ fontSize: 16, color: "red" }}
                        /> :

                        <CiHeart/>
           }
                      </button>
            {
              item?.isonline === "1" ? "" :
              <div className="closed-banner text-center">
                <h4 className="text-white">Not Taking Orders</h4>
              </div>
            }
            {/* </Link> */}
          </div>
          <Link to={item?.isonline === "1" ? `/store/${item?.pkid}` : `/store/${item?.pkid}`}>

          <div className="vertical-product-body">
            {/* <div className="brand-label">
              <img
                src={`https://partnermeatwala.com/documents/${item?.logo}`}
                className="img-fluid"
                alt="brand"
              />
            </div> */}
            <div className="d-flex align-items-center justify-content-between">
              <Link href="menu-listing.html">
                <h4 className="vertical-product-title">{item?.name}</h4>
              </Link>
              <h6 className="rating-star">
                <span className="star">
                  <i className="ri-star-s-fill" />
                </span>
                {item?.hyginerating}
              </h6>
            </div>
            <h6 className="food-items">
              {`${item.cat1 ? item.cat1 : "ㅤ"}${
                item.cat2 ? " • " + item.cat2 : ""
              }${item.cat3 ? " • " + item.cat3 : ""}`}
            </h6>
            {/* <i className="fa fa-circle ml-2 me-2" aria-hidden="true" /> */}
            {/* <ul className="details-list">
              <li>
                <i className="ri-map-pin-fill theme-color" /> {item?.distance}{" "}
                Miles
              </li>
              <li>
                <i className="ri-time-line" /> {item?.mincookduration}
              </li>
            </ul>
            <ul className="marquee-discount">
              <li className="discount-info">
                <i className="ri-discount-percent-fill theme-color" /> Upto 50% off | Code
                FREE50
              </li>
            </ul> */}
          </div>
          </Link>

        </div>
                {/* </div> */}
    </>
  )
}

export default FavouriteCard