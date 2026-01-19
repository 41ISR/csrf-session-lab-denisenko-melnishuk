const Button = ({ children, onClick, className, ...rest }) => {

    return (
        <button onClick={onClick} className={className || ''} {...rest}>
            {children}
        </button>
    )
}

export default Button