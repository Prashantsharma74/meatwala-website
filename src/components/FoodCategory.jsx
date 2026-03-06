import Food from "./Food"

const FoodCategory = ({ item, restId, addToCart, open }) => {
  return (
    <section
      id={item?.category}
      style={{
        paddingTop: "0px",
        paddingBottom: "0px",
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
          display: 'inline-block' 
        }}
        className="product-details-box-title"
      >
        {item?.category} 
      </div>

      {item?.items?.map((food) => (
        <Food key={food.pkid} food={food} restId={restId} addToCart={addToCart} open={open} />
      ))}
    </section>
  )
}

export default FoodCategory
