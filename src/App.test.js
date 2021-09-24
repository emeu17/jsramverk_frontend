import React from "react";
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from './App';
import { MemoryRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils';

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

test('renders Editor link', () => {
    render(<App />, container);
    const linkElement = screen.getByText(/My Editor/i);

    expect(linkElement).toBeInTheDocument();
});

it("navigates to list-page when you click the link", () => {
    // in a real test a renderer like "@testing-library/react"
    // would take care of setting up the DOM elements

    // Render app
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>,
        container
    );

    // Interact with page
    act(() => {
        // Find the link
        const goEditorLink = screen.getByText(/List documents/i);

        // Click it
        goEditorLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Check correct page content showed up
    expect(document.body.textContent).toMatch(new RegExp('List of documents'));
});
