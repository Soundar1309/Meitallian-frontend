const FoodBasket = ({ cartItem, key }) => {
  return (
    <div key={key} className="flex flex-col md:flex-row py-4 ">
      <div className="flex flex-row gap-2 items-start">
        <p className="mr-2">x{cartItem.quantity}</p>
        <div className="w-[80px] h-[80px]">
          <img
            src={cartItem?.image}
            alt={cartItem?.name}
            className="w-[80px] h-[80px] mr-2 object-cover"
          />
        </div>
        <div className="felx flex-col gap-2">
          <p className="font-bold capitalize mr-4">{cartItem.name}</p>
          <div className="text-gray-400 text-sm">
            {cartItem.size && cartItem.size.length > 0 ? (
              <p className="capitalize">size: {cartItem.size}</p>
            ) : (
              <></>
            )}
            {cartItem.toppings && cartItem.toppings.length > 0 ? (
              <p className="capitalize">
                Toppings: {cartItem.toppings?.join(", ")}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="mr-2 ml-auto">
        <p className="font-bold">Rs. {cartItem.price * cartItem.quantity}</p>
      </div>
    </div>
  );
};
export default FoodBasket;
