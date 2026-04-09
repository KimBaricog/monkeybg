import React, { useState, useRef } from "react";
import "../style/slider.css";

const Slider = ({ before, after }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    let percent = (x / rect.width) * 100;

    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    setPosition(percent);
  };

  const startDrag = () => (isDragging.current = true);
  const stopDrag = () => (isDragging.current = false);

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        startDrag();
        handleMove(e.clientX); // jump to click position
      }}
      onTouchStart={(e) => {
        startDrag();
        handleMove(e.touches[0].clientX);
      }}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onTouchMove}
      onTouchEnd={stopDrag}
      className="s-container"
    >
      {/* After Image (background) */}
      <img
        src={after}
        alt="after"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
      />

      {/* Before Image (clipped) */}
      <img
        src={before}
        alt="before"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      {/* Slider Line */}
      <div
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        style={{
          position: "absolute",
          left: `${position}%`,
          top: 0,
          height: "100%",
          width: "4px",
          background: "#fff",
          transform: "translateX(-50%)",
        }}
      />

      {/* Circle Handle */}
      <div
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        style={{
          position: "absolute",
          left: `${position}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          border: "2px solid #000",
        }}
      />
    </div>
  );
};

export default Slider;
