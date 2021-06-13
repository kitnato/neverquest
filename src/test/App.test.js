import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import App from "pages/App";

describe("<App />", () => {
  test("Adding todo works", () => {
    const { getByText, getByPlaceholderText } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    fireEvent.input(getByPlaceholderText("Enter TODO"), {
      target: { value: "Fake TODO" },
    });

    fireEvent.click(getByText(/Add/i));

    expect(getByText(/Fake TODO/i)).toBeInTheDocument();
  });
});
