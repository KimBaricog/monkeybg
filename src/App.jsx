import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import React, { useState, useRef } from "react";

function App() {
  const image = useRef(null); // store the image file
  const selectPhoto = useRef(null); // store the button to select the image
  const removebtn = useRef(null); // store the button to remove the background
  const downloadbtn = useRef(null); // store the button to download the image

  const [images, setImages] = useState([]); // store uploaded image URLs
  const [imgData, setImgData] = useState(null); // store removed-bg image

  // Click handler for select photo button
  const handleClick = () => image.current.click();

  // Hide select button, show remove button
  const handlestyle = () => {
    selectPhoto.current.style.display = "none";
    removebtn.current.style.display = "block";
  };

  // Preview image when selected
  const handlepreview = () => {
    const file = image.current.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
      setImgData(url); // set current image for background removal
      handlestyle();
    }
  };
  const [isVisible, setIsVisible] = useState(false); // state to control loader visibility
  const showloader = () => {
    setIsVisible((prev) => !prev); // toggle visibility
  };

  // Remove background
  const removeBg = async () => {
    showloader(); // show loader
    const file = image.current.files[0];
    if (!file) {
      alert("Please select an image first");
      showloader(); // hide loader
      return;
    }

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", file, file.name);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "GHGm9EButF5XYfoQfMiZGMjq", //expose API hahahaha don't have the money for a backend deployment :D (only a test key anyway, will be deactivated after 50 API calls)
      },
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      removebtn.current.style.display = "none";
      downloadbtn.current.style.display = "block";
      setImgData(url);
      showloader();
    } else {
      const error = await response.text();
      console.error(error);
    }
  };

  const downloadImage = (blobUrl) => {
    if (!blobUrl) return;

    fetch(blobUrl) // fetch the blob
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "monkeybg.png"; // force .png extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // cleanup
      });
  };

  return (
    <>
      <Header />
      <main>
        <div className="output">
          <Loader visible={isVisible} />
          {images.map((src, index) => (
            <img
              key={index}
              src={index === images.length - 1 ? imgData : src} // last image shows removed bg
              alt="preview"
            />
          ))}
        </div>

        <input type="file" ref={image} onChange={handlepreview} />

        <button ref={selectPhoto} onClick={handleClick}>
          Select Photo
        </button>

        <button ref={removebtn} style={{ display: "none" }} onClick={removeBg}>
          Remove Background
        </button>

        <button
          ref={downloadbtn}
          style={{ display: "none" }}
          onClick={() => downloadImage(imgData)}
        >
          Download
        </button>
      </main>
    </>
  );
}

export default App;
