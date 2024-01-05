import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utilities";
import { LoadIcon, Field } from "../Components";

const CrP = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerateImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({
          ...form,
          photo: /*`data:image/jpeg;base64,${data.photo}`*/ data.photo,
        });
      } catch (error) {
        alert(error);
      } finally {
        setGenerateImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  // 1:37:54
  const handleSubmit = async (e) => {
    e.prevent.default();
    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type ": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <article>
        <h1 className="font-extrabold text-[#d6dadd] text-[50px]">
          Create & Generate
        </h1>
        <p className="mt-2  text-[#d6dadd] text-[30px] max-w[500px]">
          Create visually stunning images with just a simple sentence
        </p>
      </article>
      <form className="mt-16 max-w-3xl  " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Field
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Farid the mexican"
            value={form.name}
            handleChangeField={handleChange}
          />
          <Field
            LabelName="prompt"
            type="text"
            name="prompt"
            placeholder="a stained glass window depicting a hamburger and french fries"
            value={form.prompt}
            handleChangeField={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-70"
              />
            )}
            {generateImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rbga(0,0,0,0.5)] rounded-lg">
                <LoadIcon />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-[#182c50] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generateImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] font-semibold text-[18px]">
            Once you have created the image you want, you can share it with
            others in the homepage.
          </p>
          <button
            type="submit"
            className="text-white bg-[#182c50] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
          >
            {isLoading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CrP;
