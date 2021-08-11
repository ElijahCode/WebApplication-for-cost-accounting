import React from "react";

export function About(): JSX.Element {
  return (
    <>
      <div className="aboutBlock" data-testid="aboutTestBlock">
        <p data-testid="descriptionParagraph">
          This application let you write you cost and watch history of your
          expenses. Also it let you to create categories and subcategories of
          your expenses. Data that you push in apllication will stand in safety
          on server of Google Firebase servis.
        </p>
        <p data-testid="authorParagraph">Author: Ilya Starikkov</p>
      </div>
    </>
  );
}
