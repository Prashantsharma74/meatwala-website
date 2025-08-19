
// import React from "react";
// import Food from "./Food";

// const FoodCategory = ({ item, restId,addToCart,open }) => {
//   return (
//     <section id={item?.category} style={{paddingTop:"0px",paddingBottom:"0px"}} className="food-category-section">
//       <div id={item?.category} className="product-details-box-title">
//         {item?.category} ({item?.items?.length})
//       </div>
//       {item?.items?.map((food) => (
//         <Food key={food.pkid} food={food} restId={restId} addToCart={addToCart} open={open} />
//       ))}
//     </section>
//   );
// };

// export default FoodCategory;


import Food from "./Food"

const FoodCategory = ({ item, restId, addToCart, open }) => {
  return (
    <section
      id={item?.category}
      style={{
        paddingTop: "0px",
        paddingBottom: "0px",
        // Add extra bottom margin for the last category to account for fixed category bar
        marginBottom: item?.isLast ? "80px" : "0px",
      }}
      className="food-category-section"
    >
      <div
        id={item?.category}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '8px',
          borderRadius: '16px',
          display: 'inline-block' // ✅ Yeh line important hai
        }}
        className="product-details-box-title"
      >
        {item?.category} 
        {/* ({item?.items?.length}) */}
      </div>

      {item?.items?.map((food) => (
        <Food key={food.pkid} food={food} restId={restId} addToCart={addToCart} open={open} />
      ))}
    </section>
  )
}

export default FoodCategory
