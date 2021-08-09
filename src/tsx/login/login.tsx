import firebase from "firebase";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { setAllState, setUserName } from "../../ts/reducer/actions";

const mapStateToProps = (state: IState) => ({
  currentUser: state.user,
});
const mapDispatchToProps = {
  setAllState,
  setUserName,
};

const loginConnector = connect(mapStateToProps, mapDispatchToProps);

type LoginProps = ConnectedProps<typeof loginConnector>;

interface LoginState {
  login: string;
  password: string;
  buttonIsClicked: boolean;
}

class LoginWithoutConnect extends React.Component<LoginProps, LoginState> {
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

  render(): JSX.Element {
    return (
      <div className="loginBlock" data-testid="loginWrapper">
        <button onClick={this.googleAuthentification}>Login with Google</button>
      </div>
    );
  }
}

export const Login = loginConnector(LoginWithoutConnect);
