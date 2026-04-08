import "../style/rep.css";
import Sadmonkey from "/sadmonke.png";

function Repair() {
  return (
    <>
      <div className="rep-container">
        <img src={Sadmonkey}></img>
        <p>
          Server is temporarily down, will git back to you as soon as possible.
        </p>
      </div>
    </>
  );
}
export default Repair;
