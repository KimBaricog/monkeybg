import Slider from "./Slider";
import before from "../assets/before.jpg";
import after from "../assets/after.png";
import "../style/imgslider.css";

function Imageslider({ remove }) {
  return (
    <div
      className="slider-container"
      style={{ display: remove ? "none" : "flex" }}
    >
      <Slider
        before={before}
        after={after}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
export default Imageslider;
