import './Select.css'

function Select(props) {
    
    const htmlFor = `${props.label} = ${Math.random()}`

    return (
        <div className='select'>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select 
                id={htmlFor} 
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((option, index) => {
                        return (
                            <option 
                                value={option.value} 
                                key={option.value}
                            >
                                {option.text}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Select;