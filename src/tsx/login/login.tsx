import firebase from "firebase";
import React from "react";
import { connect } from "react-redux";
import { setAllState, setUserName } from "../../ts/reducer/actions";

interface LoginState {
  login: string;
  password: string;
  buttonIsClicked: boolean;
}

class LoginWithoutConnect extends React.Component<any, LoginState> {
  state = {
    login: "",
    password: "",
    buttonIsClicked: false,
  };

  googleAuthentification = async (): Promise<void> => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(googleAuthProvider);
    await this.setOrCreateStore();
  };

  setOrCreateStore = async (): Promise<void> => {
    const userId = (firebase.auth().currentUser as firebase.User).uid;
    this.props.setUserName(userId);
    let categoriesOfCost = await firebase
      .database()
      .ref(`users/${userId}`)
      .get()
      .then((snap) => snap.val());
    if (!categoriesOfCost) {
      categoriesOfCost = [];
    }
    const state: IState = {
      user: userId,
      categoriesOfCost,
    };
    this.props.setAllState(state);
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
        <button onClick={this.googleAuthentification}>Login with Google</button>
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

const mapStateToProps = (state: IState) => ({
  currentUser: state.user,
});
const mapDispatchToProps = {
  setAllState,
  setUserName,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithoutConnect);
