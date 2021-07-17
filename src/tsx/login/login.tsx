import React from "react";

interface LoginState {
  login: string;
  password: string;
  buttonIsClicked: boolean;
}

export class Login extends React.Component<
  Record<string, unknown>,
  LoginState
> {
  state = {
    login: "",
    password: "",
    buttonIsClicked: false,
  };

  loginInputChange = (ev: React.ChangeEvent): void => {
    if (this.state.login === "" && this.state.buttonIsClicked) {
      this.setState({
        buttonIsClicked: false,
      });
    }
    this.setState({
      login: (ev.target as HTMLInputElement).value,
    });
  };

  passwordInputChange = (ev: React.ChangeEvent): void => {
    if (this.state.password === "" && this.state.buttonIsClicked) {
      this.setState({
        buttonIsClicked: false,
      });
    }
    this.setState({
      password: (ev.target as HTMLInputElement).value,
    });
  };

  confirmButtonClick = (): void => {
    this.setState({
      buttonIsClicked: true,
    });
  };

  render(): JSX.Element {
    return (
      <div className="loginBlock" data-testid="loginWrapper">
        <p>Enter login and password for enter in application</p>
        <p>Login:</p>
        <input
          type="text"
          className="loginInput"
          data-testid="inputForLogin"
          onChange={this.loginInputChange}
        />{" "}
        {this.state.login === "" && this.state.buttonIsClicked && (
          <p data-testid="loginIsEmptyWarn">You forget enter a login</p>
        )}
        <p>Password:</p>
        <input
          type="text"
          className="passwordInput"
          data-testid="inputForPassword"
          onChange={this.passwordInputChange}
        />{" "}
        {this.state.password === "" && this.state.buttonIsClicked && (
          <p data-testid="passwordIsEmptyWarn">You forget enter a password</p>
        )}
        <button
          className="confirmBtn"
          data-testid="confirmButton"
          onClick={this.confirmButtonClick}
        >
          Confirm
        </button>
      </div>
    );
  }
}
