const AboutSection = () => {
  return (
    <section className="relative my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div
        className="absolute inset-0 rounded-3xl bg-cover bg-top"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/TkpYzSy/0-Rlh-Lth-Gvs0v-BCYmm.png')",
        }}
      ></div>
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-md rounded-3xl border border-amber-500 bg-base-content bg-opacity-60 p-6 text-center text-amber-500 shadow-md shadow-amber-100">
          <h2 className="mb-8 rounded-3xl bg-white p-2 text-3xl font-bold">
            About Us
          </h2>
          <p className="text-base-300">
            <span className="text-xl font-semibold text-amber-400">
              Welcome to Fit N Flex Arena
            </span>
            <br /> <br />
            your ultimate destination for fitness and well-being. Our
            state-of-the-art facility offers a wide range of services including
            a modern gym, yoga classes, personal training, group fitness
            sessions, cardio training, and nutrition counseling. Our goal is to
            provide a holistic approach to fitness, ensuring that you have all
            the resources you need to achieve your health and fitness goals.
          </p>
          <p className="mt-4 text-base-300">
            Whether you are looking to build muscle, improve flexibility, boost
            cardiovascular health, or receive guidance on nutrition, our
            certified trainers and nutrition experts are here to help. Join us
            at Fin n Flex Arena and embark on your journey to a healthier,
            happier you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
