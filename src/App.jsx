import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Alert from "./components/Alertcom";
import React, { useState, useRef } from "react";

function App() {
  const image = useRef(null); // store the image file
  const selectPhoto = useRef(null); // store the button to select the image
  const removebtn = useRef(null); // store the button to remove the background
  const downloadbtn = useRef(null); // store the button to download the image
  const cancelbtn = useRef(null); // store the button to cancel the process
  const mainTextContainer = useRef(null); // store the main text container
  const outputcontainer = useRef(null); // store the output container
  const errorText = useRef(null); // store the error text element

  const [images, setImages] = useState([]); // store uploaded image URLs
  const [imgData, setImgData] = useState(null); // store removed-bg image

  // Click handler for select photo button
  const handleClick = () => image.current.click();

  // Hide select button, show remove button
  const handlestyle = () => {
    selectPhoto.current.style.display = "none";
    removebtn.current.style.display = "block";
    mainTextContainer.current.style.display = "none";
    outputcontainer.current.style.display = "flex";
    cancelbtn.current.style.display = "block";
  };

  // Preview image when selected
  const handlepreview = () => {
    const file = image.current.files[0];

    if (!file) return; // if no file is selected, do nothing

    const allowedTypes = ["image/png", "image/jpeg"];
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPG files are allowed!");
      image.current.value = ""; // reset input
      return;
    }

    const url = URL.createObjectURL(file);
    setImages((prev) => [...prev, url]);
    setImgData(url); // set current image for background removal
    handlestyle();
  };
  const [isVisible, setIsVisible] = useState(false); // state to control loader visibility
  const showloader = () => {
    setIsVisible((prev) => !prev); // toggle visibility
  };

  const [isShow, setIsShow] = useState(false); // state to control alert visibility
  const showsuccess = () => {
    setIsShow((prev) => !prev);
  };
  const [isShowError, setIsShowError] = useState(false); // state to control error alert visibility
  const showerror = () => {
    setIsShowError((prev) => !prev);
  };
  // Remove background
  const removeBg = async () => {
    showloader(); // show loader
    const file = image.current.files[0];
    if (!file) {
      alert("Please select an image first");
      return;
    }
    setIsVisible(true); // ensure loader is shown when called
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", file, file.name);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "xxq7Jj8Dtdts63TAU9bpa5oo", //expose API hahahaha don't have the money for a backend deployment :D (only a test key anyway, will be deactivated after 50 API calls)
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
      showsuccess();
    } else {
      const error = await response.text();
      showerror();
      setTimeout(() => {
        showerror();
        reset();
      }, 5000);
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

  function reset() {
    window.location.reload();
  }

  return (
    <>
      <Header />
      <main>
        <Alert showsuccess={isShow} showerror={isShowError} />
        <p ref={errorText} style={{ color: "red" }}></p>
        <div ref={mainTextContainer} className="main-text">
          <p>Select image to remove background</p>
        </div>
        <div
          ref={outputcontainer}
          style={{ display: "none" }}
          className="output"
        >
          <Loader visible={isVisible} />

          {images.map((src, index) => (
            <img
              key={index}
              src={index === images.length - 1 ? imgData : src} // last image shows removed bg
              alt="preview"
            />
          ))}
        </div>

        <input
          type="file"
          ref={image}
          onChange={handlepreview}
          accept="image/png, image/jpeg"
        />

        <button ref={selectPhoto} onClick={handleClick}>
          Select Photo
        </button>

        <button
          ref={removebtn}
          style={{ display: "none", opacity: isVisible ? 0.5 : 1 }}
          onClick={removeBg}
          disabled={isVisible} // disable while loading
        >
          {isVisible ? "Processing..." : "Remove Background"}
        </button>

        <button
          ref={downloadbtn}
          style={{ display: "none" }}
          onClick={() => downloadImage(imgData)}
        >
          Download
        </button>

        <p
          id="cancel"
          ref={cancelbtn}
          style={{ display: "none" }}
          onClick={reset}
        >
          Cancel
        </p>
      </main>
    </>
  );
}

export default App;
