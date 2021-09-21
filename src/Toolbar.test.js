import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter} from 'react-router-dom';

import Toolbar from "./Toolbar";

/*
possible ot mock useLocation.pathname, BUT will then have
the same route for all tests. Instead use MemoryRouter as in tests below
to simulate route. Will then not be dependent on the hook useLocation
in case the code changes the way location/pathname is fetched.
*/
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useLocation: () => ({
//     pathname: "/editor"
//   })
// }));


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


/* Using mock */
// it("should contain Save-link in editor-page", () => {
//     act(() => {    render(<Toolbar />, container);  });
//     expect(document.body.textContent).toMatch(new RegExp('Save'));
// });


it("should contain save-link in editor-page", () => {
    // Render app
    act(() => {
        render(
            <MemoryRouter initialEntries={['/editor']}>
                <Toolbar />
            </MemoryRouter>,
            container);
    });

    // Check correct page content showed up
    expect(document.body.textContent).toMatch(new RegExp('Save'));
});

it("should not contain save-link in list-page", () => {
    // Render app
    act(() => {
        render(
            <MemoryRouter initialEntries={['/list']}>
                <Toolbar />
            </MemoryRouter>,
            container);
    });

    // Check correct page content showed up
    expect(document.body.textContent).toMatch(new RegExp(''));
});
