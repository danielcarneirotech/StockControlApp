import './Form.css';

export function Form({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="form">
        {children}
      </form>
    </div>
  );
}

Form.FormGroup = function FormGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`form-group ${className}`}>{children}</div>;
};

export default Form;
