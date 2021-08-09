import firebase from "firebase";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { setAllState, setUserName } from "../../ts/reducer/actions";

const mapStateToProps = (state: IState) => ({
  categoriesOfCost: state.categoriesOfCost,
});

const mapDispatchToProps = {
  setAllState,
  setUserName,
};

const StateSetterConnector = connect(mapStateToProps, mapDispatchToProps);

type IStateSetterProps = ConnectedProps<typeof StateSetterConnector>;

class StateSetterWithoutConnect extends React.Component<
  IStateSetterProps,
  Record<string, unknown>
> {
  setState = async (): Promise<void> => {
    const userId = (firebase.auth().currentUser as firebase.User).uid;
    const dataString = await firebase
      .database()
      .ref(`users/${userId}`)
      .get()
      .then((snap) => snap.val());
    let categoriesOfCost = JSON.parse(dataString);
    if (categoriesOfCost === null) {
      categoriesOfCost = [];
    }

    this.props.setAllState({
      user: userId,
      categoriesOfCost,
    });
  };

  componentDidMount = async (): Promise<void> => {
    await this.setState();
  };

  render() {
    return null;
  }
}

export const StateSetter = StateSetterConnector(StateSetterWithoutConnect);
