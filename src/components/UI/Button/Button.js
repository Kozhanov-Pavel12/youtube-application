import './Button.css'

function Button(props) {
    const cls = [
        'button',
        props.className
    ]

    return (
        <button onClick={props.onClick} className={cls.join(' ')}>
            {props.children}
        </button>
    )
}

export default Button;