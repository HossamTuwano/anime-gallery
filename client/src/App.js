// import "./App.css";
import { FileImageFilled } from "@ant-design/icons";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
function App() {
  const [img, setImg] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/photos", {
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await uploadImg();
    const result = Object.assign(image);
    console.log(result);
  };

  const handleChangeImage = (e) => {
    setImg(e.target.files[0]);
  };

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "jjrqsn0n");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/deex1bwvl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data.url);
      return { image: data.url };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#deeaf6] h-screen flex justify-center">
      <div className="border bg-[#ffff] absolute top-1/4 rounded-md h-64 w-[450px] flex justify-center py-4 px-3 ">
        <div class="border border-dashed border-gray-500 relative rounded bg-[#f2f6fc] ">
          <form>
            <input
              type="file"
              multiple
              class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
              onChange={handleChangeImage}
            />
            <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
              <motion.div
                className="-rotate-12 mb-3"
                animate={{ y: 9, rotate: -12 }}
                transition={{ yoyo: Infinity }}
              >
                <FileImageFilled style={{ fontSize: "50px", color: "#08c" }} />
              </motion.div>
              {img ? (
                <div>
                  <h4>
                    Drop files anywhere to upload
                    <br />
                    or
                  </h4>
                </div>
              ) : (
                <div>
                  <button>send</button>
                </div>
              )}

              <p class="">Select Files</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
// bg-[#f2f6fc]
