import React, { Component } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import classes from './Auth.css'
import axios from 'axios'
import Credential from '../firebase-key.json'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        user: {
            token: null,
            UID: null,
            error: null,
            loading: false
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = async ( event ) => {
        event.preventDefault();
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
    
        }
        await axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${Credential.apiKey}`, authData)
            .then (response => {
                console.log(response.data)
                this.setState({
                    user: {
                        token: response.data.idToken,
                        UID: response.data.localId,
                        error: null,
                        loading: false
                    }
                })
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('UID', response.data.localId)
                localStorage.setItem('email', this.state.controls.email.value)
                // localStorage.setItem('password', this.state.controls.password.value)

            })
            .catch(error => {
                console.log(error)
                this.setState({
                    user: {
                        error: error
                    }
                })
            })
        console.log(this.state)
        this.props.history.push({pathname: '/editor'})
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">LOGIN</Button>
                </form>
            </div>
        )
    }
}

export default Auth;