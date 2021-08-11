import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { About } from "./about";

describe("Testing functional component about", () => {
  beforeEach(() => {
    render(<About />);
  });
  it("Have about block", () => {
    expect(screen.getByTestId("aboutTestBlock")).toBeInTheDocument();
  });
  it("Have description paragraph", () => {
    expect(screen.getByTestId("descriptionParagraph")).toBeInTheDocument();
  });
  it("Have author paragraph", () => {
    expect(screen.getByTestId("authorParagraph")).toBeInTheDocument();
  });
});
