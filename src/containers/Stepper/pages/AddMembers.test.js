import {render, screen ,cleanup, getByPlaceholderText, getByTestId, fireEvent, waitFor} from '@testing-library/react';

import AddMembers from './AddMembers';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "../../../state/store";
import userEvent from "@testing-library/user-event";


describe("AddMembers", () => {
    it('renders without crashing', () => {
      const div = document.createElement("div");
      ReactDom.render(<Provider store={store}><AddMembers/></Provider>, div)
    });

    it('throw error if clicked add member without entering values', ()=>{
      render(<Provider store={store}><AddMembers/></Provider>);
      const addMemberBtn = screen.getByText("Add Member", {exact: false});
      userEvent.click(addMemberBtn);
      const errorMessage = screen.getAllByText("This field is required.", {exact: false});
      expect(errorMessage[0]).toBeInTheDocument();
    });

    it('Show list of roles when clicked on select box', ()=>{
      const {container} = render(<Provider store={store}><AddMembers/></Provider>);
      const rolesSelectBox = container.querySelector("#mui-component-select-roles");
      userEvent.click(rolesSelectBox);
      const list = screen.getByText("Architect", {exact: false});
      expect(list).toBeInTheDocument();
    })

    it('show the name of member when user types his name in textbox',()=>{
      const {container} = render(<Provider store={store}><AddMembers/></Provider>);
      const usernameTextField = screen.getByLabelText("Username", {exact: false});
      fireEvent.change(usernameTextField, {target: {value: "Ayus"}});
      const list = screen.getByText("Ayush Shekhar - ashekhar", {exact: false});
      expect(list).toBeInTheDocument();
    })
    
});
