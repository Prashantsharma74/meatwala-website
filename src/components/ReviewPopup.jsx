import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reviews = [
  {
    name: "Prashant Sharma",
    comment: "Taste is good",
    rating: 5,
    date: "1 Mar 2025",
    time: "9:00AM",
    imageUrl:
      "https://ui-avatars.com/api/?name=Prashant+Sharma&background=random",
  },
  {
    name: "Amit Kumar",
    comment: "Food was delicious!",
    rating: 4,
    date: "28 Feb 2025",
    time: "8:30PM",
    imageUrl: "https://ui-avatars.com/api/?name=Amit+Kumar&background=random",
  },
  {
    name: "Sneha Verma",
    comment: "Great service!",
    rating: 5,
    date: "25 Feb 2025",
    time: "7:15PM",
    imageUrl: "https://ui-avatars.com/api/?name=Sneha+Verma&background=random",
  },
  {
    name: "Sneha Verm",
    comment: "Great service!",
    rating: 5,
    date: "25 Feb 2025",
    time: "7:15PM",
    imageUrl: "https://ui-avatars.com/api/?name=Sneha+Verm&background=random",
  },
];

const ReviewPopup = ({ onClose }) => {
  const [sampleReviews, setSampleReviews] = useState([]);
  const { id } = useParams();
  const pkid = `${id}`;
  const getAllFeedbacks = async () => {
    try {
      const res = await axios.post(
        `https://partnermeatwala.com/api/restaurantmaster/getreviewdetaisforrest`,
        { pkid }
      );
      setSampleReviews(res.data.list);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };


  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ padding: "10px" }}
      >
        <div className="modal-content shadow-lg rounded-3 custom-modal">
          <div className="modal-header bg-light border-bottom">
            <p className="modal-title fw-bold" style={{ fontSize: "18px" }}>
              Reviews
            </p>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {sampleReviews.length > 0 ? (
              sampleReviews.map((review, index) => (
                <div key={index} className="mt-3 pb-3">
                  <div
                    className="gap-3 d-flex border-bottom"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="d-flex gap-2">
                      <img
                        src={
                          review.imageUrl
                            ? review.imageUrl
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                review.name
                              )}&background=random`
                        }
                        alt={review.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="d-flex flex-column align-items-start">
                        <p style={{ fontSize: "14px", margin: 0 }}>
                          {review.name.split(" (")[0]}
                        </p>
                        <p style={{ fontSize: "12px" }}>
                          {moment(review.date, "MMM D YYYY h:mma").format(
                            "DD MMM YYYY"
                          )}
                        </p>
                      </span>
                    </div>
                    <span className="d-flex flex-column align-items-end">
                      <span className="d-flex gap-1">
                        {[...Array(parseInt(review.ratingscore || 0))].map(
                          (_, i) => (
                            <i key={i} className="ri-star-fill text-warning" />
                          )
                        )}
                      </span>
                      <span className="d-flex gap-2">
                        <p
                          style={{
                            fontSize: "14px",
                            fontStyle: "italic",
                            margin: 0,
                          }}
                        >
                          {review.rating}
                        </p>
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center mt-3">
                No reviews available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
