import firebase from "firebase";
import React from "react";
import { connect } from "react-redux";
import { setAllState, setUserName } from "../../ts/reducer/actions";

class StateSetterWithoutConnect extends React.Component<
  any,
  Record<string, unknown>
> {
  setState = async (): Promise<void> => {
    const userId = (firebase.auth().currentUser as firebase.User).uid;
    let categoriesOfCost = await firebase
      .database()
      .ref(`users/${userId}`)
      .get()
      .then((snap) => snap.val());
    if (categoriesOfCost === null) {
      categoriesOfCost = [];
    }
    this.props.setAllState({
      user: userId,
      categoriesOfCost,
    });
  };

  componentDidMount = async (): Promise<void> => {
    console.log("WAAAAAAAAAAAAAAAAAAAGGGGGGGGHHHHHHHHHHHHH");
    await this.setState();
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.user,
});
const mapDispatchToProps = {
  setAllState,
  setUserName,
};

export const StateSetter = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateSetterWithoutConnect);
