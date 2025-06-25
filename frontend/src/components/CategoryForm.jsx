import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full bg-transparent text-white outline-none"
          placeholder="Write Category Name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div className="flex justify-between">
        <button onClick={handleSubmit} className="bg-pink-500 text-white py-2 px-4 mt-3 rounded-lg outline-none hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 ">
          {buttonText}
        </button>
        {handleDelete && (
          <button
            className="bg-red-500 text-white py-2 px-4 mt-3 rounded-lg outline-none hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 "
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
