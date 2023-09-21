import { render, screen, cleanup, getByPlaceholderText, getByTestId, fireEvent, waitFor } from '@testing-library/react';

import Tools from './Tools';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "../../state/store";
import userEvent from "@testing-library/user-event";


describe("Tools", () =>
{
    it('renders without crashing', () =>
    {
        const div = document.createElement("div");
        ReactDom.render(<Provider store={store}><Tools /></Provider>, div)
    });

});