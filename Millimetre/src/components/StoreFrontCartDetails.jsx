import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsCurrencyRupee } from "react-icons/bs";
import StoreFrontNav from "./StoreFrontNav";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHome } from "react-icons/ai";

import {
  addToCart,
  removeToCart,
  decToCart,
  resetCart,
} from "../features/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
const baseUrl = import.meta.env.VITE_USER_BASE_URL;
function StoreFrontCartDetails() {
  const razorpayKey = import.meta.env.VITE_RAZORPAY_API_KEY;
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cart.cart);
  const shipping = useSelector((state) => state.cart.shipping);

  const commonId = useSelector((state) => state?.profile);
  const userData = useSelector((state) => state?.user?.user);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartData.reduce(
      (total, item) => total + item.productPrice * item.qnty,
      0
    );

    setTotalPrice(total);
  }, [cartData]);

  const shippingFee = 120;

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const makePayment = async () => {
    const orderData = {
      amount: (shippingFee + totalPrice) * 100, // Razorpay amount is in paise
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
      shippingAddress: {
        name: shipping.name,
        phone: shipping.phone,
        zip: shipping.zip,
        address1: shipping.address1,
        address2: shipping.address2,
        city: shipping.city,
      },
    };

    try {
      // Make an API call to your server to create a Razorpay order
      const response = await axios.post(`${baseUrl}api/payment`, orderData);
      const { id, amount, currency } = response.data;

      const options = {
        key: razorpayKey,
        amount,
        currency,
        order_id: id,
        name: "Millimetre",
        description: "Payment for your order",
        image:
          "https://res.cloudinary.com/djle7gupn/image/upload/v1700134615/samples/h55ahvlvfcfeo0cmhxlp.jpg",
        handler: function (response) {
          // Handle success
          console.log(response);
          alert("Payment Successful!");
          dispatch(resetCart()); // Assuming you have a resetCart action

          // You can redirect the user or perform any other action on success
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: shipping?.phone,
        },
        theme: {
          color: "#31c869",
        },
      };

      // Create a Razorpay instance and open the payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  return (
    <>
      <StoreFrontNav />
      <section className="my-28 md:mt-20 mx-auto">
        <h1 className="mb-5 text-slate-700 text-center text-2xl font-bold">
          Cart Items {cartData.length < 1 && "(0)"}
        </h1>
        <div className="mx-auto max-w-5xl justify-start px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartData.length === 0 ? (
              <div className=" ">
                <h1 className="absolute left-[50%] translate-x-[-50%] text-3xl lg:text-5xl w-[100vw] text-center text-slate-600 font-semibold mt-5">
                  Your cart is empty
                </h1>
              </div>
            ) : (
              <div className="md:max-h-[75vh] md:overflow-y-auto md:px-6 pb-2 flex flex-col gap-7">
                {/*............. */}
                {shipping && shipping.name && shipping.phone ? (
                  <div className="border border-slate-300 text-md p-3 px-4 rounded-[0.8rem] flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2">
                      <span>
                        <AiFillHome className="text-xl" />
                      </span>
                      <p className="flex flex-col text-[0.8rem]">
                        <span>
                          {" "}
                          Deliver to:{" "}
                          <span className="font-bold text-black ">
                            {" "}
                            {shipping.name},
                          </span>{" "}
                          <span className="font-bold text-black ">
                            {shipping.phone},
                          </span>
                          <span className="font-bold text-black ">
                            {" "}
                            {shipping.zip}
                          </span>
                        </span>
                        <span>
                          {truncateText(
                            `${shipping.address1}, ${shipping?.address2}, ${shipping?.city}`,
                            60
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="text-blue-500 border-b border-blue-600">
                      <Link to={`/${commonId && commonId.commonId}/shipping`}>
                        Change
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="border border-red-300 text-md p-3 px-4 rounded-[0.8rem] flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2">
                      <span>
                        <AiFillHome />
                      </span>
                      <p>Add Address</p>
                    </div>
                    <div className="text-blue-500 border-b border-blue-600">
                      <Link to={`/${commonId && commonId.commonId}/shipping`}>
                        Add Address
                      </Link>
                    </div>
                  </div>
                )}

                {cartData.map((cart) => (
                  <div
                    key={cart.productId}
                    className=" justify-between rounded-xl  p-5 border border-slate-300 sm:flex sm:justify-start"
                  >
                    <img
                      src={cart.productImages[0]}
                      alt="product-image"
                      className=" rounded-lg w-28 h-24 sm:w-32 sm:h-28"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-sm md:text-md font-medium text-slate-700 px-2">
                          {cart.productName}
                        </h2>
                        <p className="mt-1 flex items-center text-lg text-gray-700">
                          <BsCurrencyRupee /> {cart.productPrice}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center justify-center border-gray-200">
                          <button
                            onClick={() =>
                              cart.qnty <= 1
                                ? dispatch(removeToCart(cart.productId))
                                : dispatch(decToCart(cart.productId))
                            }
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5  hover:bg-gray-600 duration-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </button>
                          <div
                            className="h-8 w-8  flex justify-center items-center border bg-white text-center text-xs outline-none"
                            type="number"
                            min="1"
                          >
                            {cart.qnty}
                          </div>
                          <button
                            onClick={() => dispatch(addToCart(cart))}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3  hover:bg-gray-600 duration-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-lg flex items-center">
                            <BsCurrencyRupee /> {cart.qnty * cart.productPrice}
                          </p>
                          <button
                            onClick={() =>
                              dispatch(removeToCart(cart.productId))
                            }
                          >
                            <RxCross2 className="text-red-600 font-bold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* subtotal... */}
          {cartData.length > 0 && (
            <div className="top-15 mt-16 max-w-full text-[1.1rem]  h-full rounded-xl border border-slate-300 p-6 py-4  md:mt-0 md:w-1/3">
              <p className=" text-lg font-bold text-slate-900  mb-2">
                Price Details
              </p>
              <p className="border-b border-slate-300 my-2"></p>
              <div className="mb-2 flex justify-between my-3">
                <p className="text-gray-800 ">Subtotal</p>
                <p className="text-gray-700   flex items-center ">
                  <BsCurrencyRupee /> {totalPrice}
                </p>
              </div>
              <div className="flex text-[1.1rem] justify-between my-3">
                <p className="text-gray-800 text-[1.1rem]">Shipping</p>
                <p className="text-gray-700 flex items-center">
                  <BsCurrencyRupee />
                  {shippingFee}
                </p>
              </div>
              <p className="border-b border-slate-300 my-2"></p>
              <div className="flex justify-between">
                <p className="text-lg font-bold">Grand Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold flex items-center">
                    <BsCurrencyRupee />
                    {shippingFee + totalPrice}
                  </p>
                </div>
              </div>
              <button
                onClick={makePayment}
                className="mt-6 w-full rounded-md bg-slate-800 hover:bg-slate-700 py-1.5 font-medium text-white hover-bg-blue-600"
              >
                Check out
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default StoreFrontCartDetails;
