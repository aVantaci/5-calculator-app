import { Textfit } from "react-textfit";
import "./Screen.sass";

const Screen = ({ className, value }) => {
  return (
    <Textfit className={"screen " + className} mode="single" max={50}>
      {value}
    </Textfit>
  );
};

export default Screen;
