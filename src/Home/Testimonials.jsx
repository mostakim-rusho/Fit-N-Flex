import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/testimonials");
      return data;
    },
  });

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Testimonials
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Fit N Flex Arena transformed my routine! The tracking tools, personalized
          insights, and variety of classes keep me motivated and on track.
          Highly recommend!
        </p>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <div>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              navigation={true}
              breakpoints={{
                260: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                },
                1125: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="flex-grow"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id} className="flex h-full">
                  <section className="card mx-4 mb-8 flex h-72 w-full flex-grow flex-col rounded-lg border border-amber-500 p-6 shadow-xl transition-shadow duration-300 hover:shadow-amber-300">
                    <div className="mx-auto flex h-full text-center">
                      <figure className="flex max-w-screen-md flex-col">
                        <svg
                          className="mx-auto mb-3 h-12 text-amber-500"
                          viewBox="0 0 24 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <blockquote className="flex-grow">
                          <p className="flex h-full text-lg font-medium text-gray-900 dark:text-white">
                            {testimonial.description}{" "}
                          </p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center justify-center space-x-3">
                          <img
                            className="h-12 w-12 rounded-full border border-gray-300"
                            src={testimonial.imageUrl}
                            alt="profile picture"
                          />
                          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                            <div className="pr-3 font-medium text-gray-900 dark:text-white">
                              {testimonial.userName}
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
