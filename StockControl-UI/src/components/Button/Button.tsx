import "./Button.css";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button className={props.disabled ? "disabled" : ""} {...props}>
      {props.children}
    </button>
  );
}
