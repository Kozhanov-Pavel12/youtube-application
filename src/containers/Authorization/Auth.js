import React from 'react'
import './Auth.css'
import logo from '../../images/logo.svg'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            login: {
                value: '',
                type: 'text',
                label: 'Логин',
                errorMessage: 'Такой логин отсутствует. Попробуйте еще раз!',
                placeholder: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    login: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
        users: {
            user_1: 'admin1',
            user_2: 'admin2',
            user_3: 'admin3',
            user_4: 'admin4',
            user_5: 'admin5',
            user_6: 'admin6',
            user_7: 'admin7',
            user_8: 'admin8',
        }
    }


    submitHandler = event => {
        event.preventDefault()
    }


    validateControl(value, validaton) {
        if(!validaton) {
            return true
        }

        let isValid = true;

        if(validaton.login) {
            isValid = Object.values(this.state.users).includes(value) && isValid
        }

        if(validaton.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validaton.minLength) {
            isValid = value.length >= validaton.minLength && isValid 
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {

        const formControls = { ...this.state.formControls } //получаем копию state
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
            
        })

        this.setState({
            formControls, isFormValid
        })
    }


    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    valid={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage} 
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }


    loginHandler = () => {
        this.props.auth(
            this.state.formControls.login.value,
            this.state.formControls.password.value,
            this.state.isFormValid
        )
    }


    render() {
        return (
            <div className='auth'>
                <div>

                    <form onSubmit={this.submitHandler} className='authForm'>
                        <img src={logo} alt={'logo'}/>

                        <h3>Вход</h3>

                        {
                            this.renderInputs()
                        }

                        <Button 
                            className='button primaryBtn' 
                            onClick={this.loginHandler}
                            >
                            Войти
                        </Button>

                    </form>

                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (login, password, isLogin) => dispatch(auth(login, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);