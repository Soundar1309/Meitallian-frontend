import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import sandwich from "../../assets/sandwich.png";

const CheckoutForm = ({ price, cart }) => {
  const { isDarkMode } = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(cart);
  const discount = 0;
  // useEffect(() => {
  //   if (typeof price !== "number" || price < 1) {
  //     console.error(
  //       "Invalid price value. Must be a number greater than or equal to 1."
  //     );
  //     return;
  //   }

  //   axiosSecure.post("/create-payment-intent", { price }).then((res) => {
  //     console.log(res.data.clientSecret);
  //     console.log(price);
  //     setClientSecret(res.data.clientSecret);
  //   });
  // }, [price, axiosSecure]);

  // handleSubmit btn click
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // console.log('card: ', card)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setcardError(error.message);
    } else {
      // setcardError('Success!');
      // console.log('[PaymentMethod]', paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("paymentIntent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const transitionId = paymentIntent.id;
      setcardError(`Your transitionId is: ${transitionId}`);

      // save payment info to server
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "order pending",
        itemsName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };

      // send payment info
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Payment info sent successfully!");
          navigate("/order");
        }
      });
    }
  };
  const basketPrice = cart.reduce((total, cartItem) => {
    return total + cartItem.price*cartItem.quantity; // Accumulate the price of each cart item
  }, 0);

  const tax = cart.reduce((total, cartItem) => {
    return total + cartItem.price*cartItem.quantity * 0.06;
}, 0);

const totalAmount = cart.reduce((total, cartItem) => {
  return total+cartItem.price*cartItem.quantity;
}, 0);

let deliveryCharge = totalAmount <= 2000 ? 30 : 0;

const totalAmountWithTaxAndDelivery = totalAmount+ deliveryCharge;


  const editBasketHandler = () => {
    navigate("/cartpage");
  };

  console.log(cart);
  return (
    <div className="flex justify-between max-w-6xl mx-auto mt-12 ">
      <div className="px-4 py-8 rounded-xl shadow-xl mt-10 border">
        <div className="flex flex-row justify-between gap-4">
          <p className="text-2xl font-bold">Food Basket</p>
          <button onClick={editBasketHandler}>
            Edit Cart <FontAwesomeIcon icon={faEdit} className="ml-2" />
          </button>
        </div>
        <div className="flex flex-col justify-between py-4 ">
          {cart && cart.length > 0 ? (
            cart.map((cartItem, index) => {
              return (
                <div key={index} className="flex flex-row py-4 ">
                  <div className="flex flex-row gap-2 items-start">
                    <p className="mr-2">x{cartItem.quantity}</p>
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={cartItem?.image || sandwich}
                        alt={cartItem?.name}
                        className="w-[80px] h-[80px] mr-2 object-cover"
                      />
                    </div>
                    <div className="felx flex-col gap-2">
                      <p className="font-bold capitalize mr-4">
                        {cartItem.name}
                      </p>
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
                    <p className="font-bold">Rs. {cartItem.price*cartItem.quantity}</p>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <hr />
        <div>
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Basket Price</p>
            <p>Rs. {basketPrice}</p>
          </div>
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Delivery</p>
            <p>Rs. {deliveryCharge}</p>
          </div>
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Tax</p>
            <p>Rs. {tax}</p>
          </div>
          <div className="flex justify-between py-4">
            <p className="font-semibold">Discount</p>
            <p>Rs. {discount}</p>
          </div>
          <hr />
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Order Total</p>
            <p>Rs. {discount + deliveryCharge + tax + basketPrice}</p>
          </div>
        </div>
        <button className="btn bg-green w-full mt-4">Confirm order</button>
      </div>
      {/* <div className="md:w-1/2 space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: Rs.{price}</p>
        <p>Number of Items: {cart.length}</p>
      </div> */}
      <div
        className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8`}
      >
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-primary btn-sm mt-5 w-full"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-red text-xs italic">{cardError}</p>
        ) : (
          ""
        )}

        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            className="btn  btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
