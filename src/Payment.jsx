import { Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const { state } = useLocation();
  const bookingData = state?.bookingData;
  const [isOpen, setIsOpen] = useState(false);

  const stripePromise = loadStripe(
    `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`,
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (!bookingData) return <Navigate to="/" />;

  return (
    <div className="min-h-[60vh] py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Payment | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-col gap-1 rounded-lg border border-amber-500 p-6 shadow-xl shadow-amber-200 md:p-8 lg:w-2/3 lg:gap-3 lg:p-10">
            <p>
              <span className="text-lg font-medium">Your Name : </span>{" "}
              <span className="opacity-80">{bookingData.user.name}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Your Email : </span>{" "}
              <span className="opacity-80">{bookingData.user.email}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Your UID : </span>{" "}
              <span className="opacity-80">{bookingData.user.uid}</span>
            </p>

            <div className="bg-blue-gray-600 h-[1px] w-full"></div>

            <p>
              <span className="text-lg font-medium">Trainer Name :</span>{" "}
              <span className="opacity-80">{bookingData.trainer.name}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Class Name :</span>{" "}
              <span className="opacity-80">{bookingData.class.className}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Day :</span>{" "}
              <span className="opacity-80">{bookingData.class.day}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Slot :</span>{" "}
              <span className="opacity-80">{bookingData.class.sName}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Slot Time :</span>{" "}
              <span className="opacity-80">{bookingData.class.sTime} hr</span>
            </p>

            <div className="bg-blue-gray-600 h-[1px] w-full"></div>

            <p>
              <span className="text-lg font-medium">Package :</span>{" "}
              <span className="opacity-80">{bookingData.package}</span>
            </p>
            <p>
              <span className="text-lg font-medium">Price :</span>{" "}
              <span className="opacity-80">{bookingData.price} $</span>
            </p>

            <div className="mt-6 text-right">
              <button
                onClick={openModal}
                className="btn btn-outline text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="modal-box">
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
            >
              ✕
            </button>
            <Elements stripe={stripePromise}>
              <CheckoutForm closeModal={closeModal} bookingData={bookingData} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
