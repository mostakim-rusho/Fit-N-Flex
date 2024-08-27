import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "./Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "./Hooks/useAuth";
import { BiLoaderCircle } from "react-icons/bi";

const CheckoutForm = ({ bookingData, closeModal }) => {
  const [processing, setProcessing] = useState(false);

  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");

  const axiosSecure = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (bookingData?.price) {
      getClientSecret({ price: bookingData?.price });
    }
  }, [bookingData?.price]);

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(
      `/makePayment?email=${user?.email}`,
      price,
    );
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      return toast.error(error);
    }

    const { error: confirmationError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: bookingData?.user?.email,
            name: bookingData?.user?.name,
          },
        },
      });

    if (confirmationError) {
      setProcessing(false);
      return toast.error(confirmationError.message);
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        ...bookingData,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      try {
        await axiosSecure.post(`/payment?email=${user?.email}`, paymentInfo);
        closeModal();
        Swal.fire({
          title: "Success",
          text: `Payment success! Your Trx id : ${paymentIntent.id}`,
          icon: "success",
        });
        setProcessing(false);
      } catch (error) {
        setProcessing(false);
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
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
      <div className="text-right">
        <button
          className="mt-12 rounded-lg bg-amber-500 px-3 py-2 text-white disabled:cursor-not-allowed"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? (
            <BiLoaderCircle className="mx-auto animate-spin text-lg" />
          ) : (
            `Pay ${bookingData.price}`
          )}
        </button>
      </div>
      <ToastContainer></ToastContainer>
    </form>
  );
};

CheckoutForm.propTypes = {
  bookingData: PropTypes.object,
  closeModal: PropTypes.func,
};

export default CheckoutForm;
