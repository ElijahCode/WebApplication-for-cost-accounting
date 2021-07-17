import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import userEvents from "@testing-library/user-event";
import { Registration } from "./registration";

describe("Testig Login Component", () => {
  beforeEach(() => {
    render(<Registration />);
  });

  it("Have wrapper block", () => {
    expect(screen.getByTestId("registrationWrapper")).toBeInTheDocument();
    expect(
      screen.getByText("Enter login and password for register in application")
    ).toBeInTheDocument();
  });
  it("Have input for login", () => {
    expect(screen.getByText("Login:")).toBeInTheDocument();
    expect(screen.getByTestId("inputForLogin")).toBeInTheDocument();
  });
  it("Have input for password", () => {
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByTestId("inputForPassword")).toBeInTheDocument();
  });
  it("Have registerButton", () => {
    expect(screen.getByTestId("registerButton")).toBeInTheDocument();
  });
  it("Warns when some input is empty and button is clicked", () => {
    expect(screen.queryByTestId("loginIsEmptyWarn")).not.toBeInTheDocument();
    expect(screen.queryByTestId("passwordIsEmptyWarn")).not.toBeInTheDocument();

    userEvents.type(screen.getByTestId("inputForLogin"), "Tom");

    expect(
      (screen.getByTestId("inputForLogin") as HTMLInputElement).value
    ).toBe("Tom");
    expect(
      (screen.getByTestId("inputForPassword") as HTMLInputElement).value
    ).toBe("");

    userEvents.click(screen.getByTestId("registerButton"));

    expect(screen.getByTestId("passwordIsEmptyWarn")).toBeInTheDocument();

    userEvents.clear(screen.getByTestId("inputForLogin"));
    userEvents.type(screen.getByTestId("inputForPassword"), "qwerty");

    expect(screen.queryByTestId("passwordIsEmptyWarn")).not.toBeInTheDocument();

    expect(
      (screen.getByTestId("inputForLogin") as HTMLInputElement).value
    ).toBe("");
    expect(
      (screen.getByTestId("inputForPassword") as HTMLInputElement).value
    ).toBe("qwerty");

    userEvents.click(screen.getByTestId("registerButton"));

    expect(screen.getByTestId("loginIsEmptyWarn")).toBeInTheDocument();

    userEvents.type(screen.getByTestId("inputForLogin"), "Tom");

    expect(screen.queryByTestId("loginIsEmptyWarn")).not.toBeInTheDocument();
  });
  it("Warns then both inputs empty and button is clicked", () => {
    expect(screen.queryByTestId("loginIsEmptyWarn")).not.toBeInTheDocument();
    expect(screen.queryByTestId("passwordIsEmptyWarn")).not.toBeInTheDocument();

    userEvents.click(screen.getByTestId("registerButton"));

    expect(screen.queryByTestId("loginIsEmptyWarn")).toBeInTheDocument();
    expect(screen.queryByTestId("passwordIsEmptyWarn")).toBeInTheDocument();
  });
});
