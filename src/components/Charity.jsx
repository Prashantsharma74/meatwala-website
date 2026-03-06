import { useEffect, useState } from "react";

const BottomFooter = () => {
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    fetch("https://partnermeatwala.com/api/customer/getcherity")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "1" && data.cherity) {
          setCharity(data.cherity);
        }
      })
      .catch((error) => console.error("Error fetching charity data:", error));
  }, []);

  return (
    <div className={`bottom-footer-part mt-2`} style={{borderTop:"2px solid lightgrey"}}>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        {charity && (
          <div
            className="charity-section d-flex align-items-center"
            style={{
              textAlign: "center",
              // marginBottom: "20px",
              gap: "10px",
              paddingTop: "18px",
            }}
          >
            <div className="d-flex gap-3" style={{ textAlign: "center" }}>
              <div>
                <a href={`${charity?.url}`}>
                  <img
                    src={`https://partnermeatwala.com/documents/${charity?.logo}`}
                    alt="Charity Logo"
                    style={{ width: "130px", height: "auto" }}
                  />
                </a>
                <h5>{charity.heading}</h5>
                <div
                  style={{
                    color: "black",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {charity.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default BottomFooter;
