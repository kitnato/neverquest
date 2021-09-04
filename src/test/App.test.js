import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import App from "App";

describe("<App />", () => {
  test("App doesn't crash", () => {
    const { getByText } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    expect(getByText(/neverquest/i)).toBeInTheDocument();
  });
});
