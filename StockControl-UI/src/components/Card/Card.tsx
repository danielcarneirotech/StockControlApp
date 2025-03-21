import "./Card.css";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
};

export default Card;
