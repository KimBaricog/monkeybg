import "../style/header.css";
import Install from "./Install";
import { useState } from "react";
import { FaTiktok, FaFacebook, FaGithub } from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header>
        <img
          src="https://res.cloudinary.com/dgwmeeszw/image/upload/v1775398753/Gemini_Generated_Image_eov33peov33peov3-removebg-preview_volk3g.png"
          alt="Logo"
        />

        <div className="text">
          <h1>
            <spam style={{ color: "yellow" }}>M</spam>ONKEY.bg
          </h1>
          <p>Remove background for free!</p>
        </div>

        <div className="check">
          <input id="checkbox2" type="checkbox"></input>
          <label
            className="toggle toggle2"
            for="checkbox2"
            onClick={() => setOpen(!open)}
          >
            <div id="bar4" className="bars"></div>
            <div id="bar5" className="bars"></div>
            <div id="bar6" className="bars"></div>
          </label>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="text-support">
          <h2>Show support</h2>
          <a href="https://www.tiktok.com/@gataseveryday1">
            <FaTiktok size={20} color="#000" />
            <p>Tiktok</p>
          </a>
          <a href="https://www.facebook.com/kim.baricog.2025/">
            <FaFacebook size={20} color="#000" />
            <p>Facebook</p>
          </a>
          <a href="https://github.com/KimBaricog">
            <FaGithub size={20} color="#000" />
            <p>Github</p>
          </a>
        </div>

        <Install />

        <div className="image">
          <img
            src="https://res.cloudinary.com/dgwmeeszw/image/upload/v1775444893/monkeybg_5_qqzvul.png"
            alt="Support Image"
          ></img>
        </div>
      </div>
    </>
  );
}

export default Header;
