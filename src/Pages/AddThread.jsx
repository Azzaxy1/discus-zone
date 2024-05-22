// import React from "react";
import { useState } from "react";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../redux/threads/action";
import { useNavigate } from "react-router-dom";

const AddThread = () => {
  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBodyHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    dispatch(asyncAddThread({ title, category, body }));
    navigate("/");
  };

  return (
    <main className="min-h-screen md:pt-24 pt-28 font-quicksand">
      <div className="flex flex-col md:max-w-[60%] max-w-[90%] px-9 md:py-10 py-10 m-auto border-2  rounded-md">
        <div className="w-full ">
          <h2 className="text-2xl font-bold">Masukan Thread Baru</h2>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-3 pt-5">
            <div className="mt-1">
              <input
                type="text"
                placeholder="Judul Thread"
                className="block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                value={title}
                onChange={onTitleChange}
              />
            </div>
            <div className="mt-1">
              <input
                type="text"
                placeholder="Kategori Thread"
                className="block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                value={category}
                onChange={onCategoryChange}
              />
            </div>
            <div className="mt-1">
              <div
                contentEditable
                data-placeholder="Tuliskan deskripsi..."
                className="block w-full h-40 px-2 py-2 border border-gray-500 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                value={body}
                onInput={onBodyHandler}
              />
            </div>
            <div className="mt-1">
              <button
                type="submit"
                className="w-full p-2 mt-3 font-bold text-white rounded-md bg-primary hover:bg-hoverBtn"
              >
                Buat Thread
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddThread;
