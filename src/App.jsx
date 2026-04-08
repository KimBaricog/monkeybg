import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Alert from "./components/Alertcom";
import How from "./components/Howto";
import { Analytics } from "@vercel/analytics/react";
import React, { useState, useRef } from "react";

function App() {
  const image = useRef(null);
  const selectPhoto = useRef(null);
  const removebtn = useRef(null);
  const downloadbtn = useRef(null);
  const hidinfo = useRef(null);
  const cancelbtn = useRef(null);
  const mainTextContainer = useRef(null);
  const outputcontainer = useRef(null);
  const errorText = useRef(null);
  const [dragDisabled, setDragDisabled] = useState(false);

  const backgroundstyle = {
    backgroundImage:
      "url('https://res.cloudinary.com/dgwmeeszw/image/upload/v1775481344/Screenshot_2026-04-06_210913_hl6lwh.png')",
  };

  const [images, setImages] = useState([]);
  const [imgData, setImgData] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

  const [dragging, setDragging] = useState(false);

  const handleClick = () => image.current.click();

  const handlestyle = () => {
    selectPhoto.current.style.display = "none";
    removebtn.current.style.display = "block";
    mainTextContainer.current.style.display = "none";
    outputcontainer.current.style.display = "flex";
    cancelbtn.current.style.display = "block";
    hidinfo.current.style.display = "none";
  };

  // 🔹 Preview image (used by both click & drag)
  const handlepreview = () => {
    const file = image.current.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPG files are allowed!");
      image.current.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setImages([url]);
    setImgData(url);
    handlestyle();
  };

  // DRAG & DROP HANDLERS
  const handleDragOver = (e) => {
    if (dragDisabled) return;
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    if (dragDisabled) return;
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPG files are allowed!");
      return;
    }

    // Put file into input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    image.current.files = dataTransfer.files;

    handlepreview();
  };

  const showloader = () => setIsVisible((prev) => !prev);
  const showsuccess = () => setIsShow((prev) => !prev);
  const showerror = () => setIsShowError((prev) => !prev);

  //  REMOVE BG
  const removeBg = async () => {
    showloader();

    const file = image.current.files[0];
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setIsVisible(true);

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", file, file.name);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "xxq7Jj8Dtdts63TAU9bpa5oo", //hahahaha expose API key don't have the budget for a backend deployment :D(Anyway, this key is rate-limited and can only be used for testing purposes)
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
      setDragDisabled(true);

      setTimeout(() => showsuccess(), 2000);
    } else {
      await response.text();
      showerror();

      setTimeout(() => {
        showerror();
        reset();
      }, 2000);
    }
  };

  const downloadImage = (blobUrl) => {
    if (!blobUrl) return;

    fetch(blobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "monkeybg.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  function reset() {
    window.location.reload();
  }

  return (
    <>
      <Header />
      <main>
        <div className="head-text">
          <div className="head-text-logo">
            <img src="/logo1.png" alt="MonkeyBG Logo" />
            <p style={{ fontSize: "20px", fontWeight: "700" }}>
              <spam style={{ color: "yellow" }}>M</spam>ONKEY.BG
            </p>
          </div>

          <h1>Remove the background from your image for free.</h1>
        </div>

        <Alert showsuccess={isShow} showerror={isShowError} />
        <p ref={errorText} style={{ color: "red" }}></p>
        <div className="parentcontainer">
          <div
            className="container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            style={{
              border: dragging ? "2px solid blue" : "2px dashed gray",
              backgroundImage: imgData
                ? backgroundstyle.backgroundImage
                : "none",
            }}
          >
            <div ref={mainTextContainer} className="main-text">
              <p>
                Drag & Drop or Select image to{" "}
                <spam style={{ color: "rgb(24, 109, 255)" }}>
                  remove background
                </spam>
              </p>
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
                  src={index === images.length - 1 ? imgData : src}
                  alt="preview"
                />
              ))}
            </div>

            <input
              type="file"
              ref={image}
              onChange={handlepreview}
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
            />

            <button ref={selectPhoto} onClick={handleClick}>
              Select Photo
            </button>

            <p ref={hidinfo} id="info-text">
              File must be JPEG, JPG, PNG
            </p>
          </div>
          <div className="otherbtn">
            <button
              ref={removebtn}
              style={{ display: "none", opacity: isVisible ? 0.5 : 1 }}
              onClick={removeBg}
              disabled={isVisible}
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
              style={{ display: "none", cursor: "pointer" }}
              onClick={reset}
            >
              Cancel
            </p>
          </div>
        </div>

        <How />

        <Analytics />
      </main>
    </>
  );
}

export default App;
