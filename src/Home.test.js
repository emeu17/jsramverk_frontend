import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router} from 'react-router-dom';

import Home from "./Home";

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with welcome text", () => {
    act(() => {    render(<Router><Home /></Router>, container);  });
    expect(container.textContent).toMatch(new RegExp('Welcome'));
});

// it("renders button for creating new document", () => {
//   act(() => {    render(<Router><Home /></Router>, container);  });
//   expect(container.getByRole('link').toBeInTheDocument());
//   expect(container.getByRole('link').toHaveTextContent("Create new document"));
// });
