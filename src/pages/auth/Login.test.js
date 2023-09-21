import { render, screen, cleanup, getByPlaceholderText, getByTestId, fireEvent, waitFor } from '@testing-library/react';

import Login from './Login';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "../../state/store";
import userEvent from "@testing-library/user-event";


describe("Login", () =>
{
    it('renders without crashing', () =>
    {
        const div = document.createElement("div");
        ReactDom.render(<Provider store={store}><Login /></Provider>, div)
    });

    it('throw error if clicked Login button without entering values', () =>
    {
        const {container} = render(<Provider store={store}><Login /></Provider>);
        const loginBtn = screen.getAllByText("Login", { exact: false });
        userEvent.click(loginBtn[1]);
        const username = container.querySelector("#userName");
        expect(username).toHaveAttribute("aria-invalid", "This field is required.");
        const password = container.querySelector("#password");
        expect(password).toHaveAttribute("aria-invalid", "This field is required.");      
    });
});