import "./ThemeSwitcher.sass";

const ThemeSwitcher = ({ onClick, className }) => {
  return (
    <div className="reactfragment">
      <h1>calc</h1>
      <div className="theme">
        <div></div>
        <p>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </p>
        <p>theme</p>
        <div className={"switcher " + className} onClick={onClick}>
          <div className={"toggle " + className}></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
