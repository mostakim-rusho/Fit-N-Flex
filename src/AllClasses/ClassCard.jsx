import PropTypes from "prop-types";
import AvatarCard from "./AvatarCard";

const ClassCard = ({ item }) => {
  return (
    <div className="flex flex-col rounded-lg border border-amber-500 shadow-lg transition-shadow duration-300 hover:shadow-amber-300">
      <div className="w-full rounded-lg">
        <img
          src={item.image}
          className="h-80 w-full rounded-t-lg object-cover"
          alt={item.name}
        />
      </div>
      <div className="flex h-full w-full flex-col justify-between p-6">
        <div>
          <h2 className="max-w-max border-b-2 border-amber-500 pb-2 text-2xl font-semibold leading-none">
            {item.name}
          </h2>
          <p className="my-4 text-sm">{item.description}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          {item.trainer.length === 0 ? (
            <p className="font-semibold text-red-500">
              No Trainer Conduct This Class
            </p>
          ) : (
            item.trainer.map((trainer, i) => (
              <AvatarCard key={i} trainer={trainer}></AvatarCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    trainer: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ClassCard;
