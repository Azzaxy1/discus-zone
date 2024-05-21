// import React from "react";
import PropTypes from "prop-types";

const Category = ({ data, onCategorySelect, selectedCategory }) => {
  const categories = [...new Set(data.map((thread) => thread.category))];

  return (
    <article className="flex md:max-w-[60%] max-w-[90%] m-auto py-5  flex-row gap-7">
      <div className="flex flex-col w-full p-5 border-2 rounded-md">
        <h2 className="text-sm md:text-lg">Kategori Populer</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((category, i) => (
            <button
              key={i}
              onClick={() => onCategorySelect(category)}
              className={`px-2 py-1 text-sm border rounded-lg cursor-pointer md:text-base   border-secondary w-fit ${
                selectedCategory === category ? "bg-primary text-white" : ""
              }`}
            >
              #{category}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};

Category.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default Category;
