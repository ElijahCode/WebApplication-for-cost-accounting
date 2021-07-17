import React from "react";

interface RegistrationState {
    login: string,
    password: string,
    buttonIsClicked: boolean
}

export class Registration extends React.Component <Record<string, unknown>, RegistrationState>{
    state = {
        login: '',
        password: '',
        buttonIsClicked: false
    }

    loginInputChange = (ev: React.ChangeEvent): void => {
        if(this.state.login === '' && this.state.buttonIsClicked) {
            this.setState({
                buttonIsClicked: false
            })
        }
        this.setState({
            login: (ev.target as HTMLInputElement).value
        })
    }

    passwordInputChange = (ev: React.ChangeEvent): void => {
        if(this.state.password === '' && this.state.buttonIsClicked) {
            this.setState({
                buttonIsClicked: false
            })
        }
        this.setState({
            password: (ev.target as HTMLInputElement).value
        })
    }

    registerButtonClick = (): void => {
        this.setState({
            buttonIsClicked: true
        })
    }

    render(): JSX.Element {
        return <div className='registrationBlock' data-testid='registrationWrapper'>
            <p>Enter login and password for register in application</p>
            <p>Login:</p><input type="text" className='loginInput' data-testid='inputForLogin' onChange={this.loginInputChange}/> {this.state.login === '' && this.state.buttonIsClicked && <p data-testid='loginIsEmptyWarn'>You forget enter a login</p>}
            <p>Password:</p><input type="text" className='passwordInput' data-testid='inputForPassword' onChange={this.passwordInputChange} /> {this.state.password === '' && this.state.buttonIsClicked && <p data-testid='passwordIsEmptyWarn'>You forget enter a password</p>}
            <button className='registerBtn' data-testid='registerButton' onClick={this.registerButtonClick}>Register</button>
        </div>
    }
}