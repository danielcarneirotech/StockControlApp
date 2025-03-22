import './Card.css';

export function Card({ children, dataTestId }: { children: React.ReactNode; dataTestId: string }) {
  return (
    <div data-testid={dataTestId} className="card">
      {children}
    </div>
  );
}
Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
};

export default Card;
