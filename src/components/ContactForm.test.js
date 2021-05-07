import React from 'react';
import {getByLabelText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    const header = screen.queryByText(/contact form/i);
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    
    const firstNameInput = screen.getByLabelText(/first Name/i);
    userEvent.type(firstNameInput, "Seye");
    waitFor(async () => {
    const firstNameError = screen.queryByText(
        /Error: firstName must have at least 5 characters./i
      );
      expect(firstNameError).toBeInTheDocument();
    });
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first Name/i);
    userEvent.type(firstNameInput, "");
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "");
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, "");

    const firstNameError = screen.queryByText(
        /Error: firstName must have at least 5 characters./i
      );
      const emailError =  screen.queryByText(
        /Error: email must be a valid email address./i
      );
      const messageError =  screen.queryByText(
        /Error: message is a required field./i
      );
      expect(firstNameError).toBeInTheDocument();
      expect(emailError).toBeInTheDocument();
      expect(messageError).toBeInTheDocument();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first Name/i);
    userEvent.type(firstNameInput, "Seyet");
    expect(firstNameInput).toBeInTheDocument();

   
    const lastNameInput = screen.getByLabelText(/last Name/i);
    userEvent.type(lastNameInput, "Onigbinde");
    expect(lastNameInput).toBeInTheDocument();

   
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "n");
    waitFor(async () => {
    const emailError = screen.queryByText(
        /Error: email must be a valid email address./i
      );
      expect(emailError).toBeInTheDocument();
    });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "fgfgfg");
    waitFor(async () => {
    const emailError = screen.queryByText(
        /Error: email must be a valid email address./i
      );
      expect(emailError).toBeInTheDocument();
    });
});


test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    
    const lastNameInput = screen.getByLabelText(/last Name/i);
    userEvent.type(lastNameInput, "");
    const button = screen.getByRole("button", {name:/submit/i});
    userEvent.click(button);
    waitFor(async () => {
      const lastNameError = await screen.queryByText(
        /Error: lastName is a required field./i
      );
      
      expect(lastNameError).toBeInTheDocument();
    });
  });


test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first Name/i);
    userEvent.type(firstNameInput, "Seyet");
    const lastNameInput = screen.getByLabelText(/last Name/i);
    userEvent.type(lastNameInput, "Onigbinde");
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "seyeonigbinde@gmail.com");
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, "Thank you");

    const button = await screen.getByRole("button");
    userEvent.click(button);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first Name/i);
    userEvent.type(firstNameInput, "Seyet");
    const lastNameInput = screen.getByLabelText(/last Name/i);
    userEvent.type(lastNameInput, "Onigbinde");
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "seyeonigbinde@gmail.com");
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, "Thank you");

    const button = screen.getByRole("button");
    userEvent.click(button);
        waitFor(async ()=>{
                const formDisplay = await screen.findByText("Seyet");
                expect(formDisplay).toBeInTheDocument();
            });
            
});




