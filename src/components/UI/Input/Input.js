import './Input.css'
import React from 'react';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
}

function Input(props) {

    const inputType = props.type || 'text'
    const cls = ['input'];
    const htmlFor = `${inputType} = ${Math.random()}`

    if(isInvalid(props)) {
        cls.push('invalid')
    }

    if(inputType === 'search') {
        cls.push('search')
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

            {
                isInvalid(props) ? <span>{props.errorMessage || 'Введите данные!'}</span> : null
            }

        </div>
    )
}

export default Input