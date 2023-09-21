


import { render, screen, cleanup, getByPlaceholderText, getByTestId,getByTitle, fireEvent, getByLabelText, getByText} from '@testing-library/react';
import User from '../../containers/project/User';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "../../state/store"
import userEvent from "@testing-library/user-event";


describe("User", () => {
    it('renders without crashing', () => {
      const div = document.createElement("div");
      ReactDom.render(<Provider store={store}><User/></Provider>, div)
    })
   
  })




