import "./ButtonBox.sass";

const ButtonBox = ({ className, children }) => {
  return <div className={"buttonBox " + className}>{children}</div>;
};

export default ButtonBox;
