const Input = ({ value, onChange, className, ...rest }) => {

  return <input value={value} onChange={onChange} className={className || ""} {...rest} />;
};

export default Input