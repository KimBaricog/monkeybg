import "../style/card.css";

function Card(props) {
  return (
    <>
      <div className="card">
        <img src={props.image} alt={props.title} />
        <div className="tut-text">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  );
}
export default Card;
