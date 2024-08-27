import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AvatarCard = ({ trainer }) => {
  return (
    <Link to={`/trainerDetails/${trainer._id}`}>
      <div className="relative cursor-pointer duration-200 hover:scale-105">
        <div className="absolute -inset-2">
          <div className="mx-auto h-full w-14 max-w-sm lg:mx-0"></div>
        </div>
        <img
          src={trainer.photoUrl}
          className="relative z-10 size-14 shrink-0 rounded-xl object-cover object-top hover:shadow-xl hover:shadow-amber-300"
        />
      </div>
    </Link>
  );
};

AvatarCard.propTypes = {
  trainer: PropTypes.object,
};

export default AvatarCard;
