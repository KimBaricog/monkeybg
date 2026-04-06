import "../style/howto.css";
import Card from "./Card";

function Howto() {
  return (
    <div className="howto">
      <h2 id="h-id">How to remove the background of a picture.</h2>

      <div className="card-container">
        <Card
          image="https://res.cloudinary.com/dgwmeeszw/image/upload/v1775484548/choose_ebt8n8.png"
          title="1. Select"
          description="For best results, use an image where the subject has clean, well-defined edges and isn’t obstructed by other objects."
        />
        <Card
          image="https://res.cloudinary.com/dgwmeeszw/image/upload/v1775484548/remove_n6lflv.png"
          title="2. Remove"
          description="Upload your image to automatically remove the background in an instant."
        />
        <Card
          image="https://res.cloudinary.com/dgwmeeszw/image/upload/v1775484549/edit_wql8m7.png"
          title="3. Edit"
          description="Download your new image as a PNG file with a transparent background to save, share, or keep editing in Adobe Express."
        />
      </div>
    </div>
  );
}
export default Howto;
