import { screen } from "@testing-library/react";
import {App} from "../../App.jsx";
import { renderWithProviders } from "../../utils/test-utils.jsx"
import {act} from 'react';
import NavBar from "./NavBar.jsx";

/* Do not run Alan SDK, Simply Mock It */
jest.mock("../Alan.jsx", () => () => {});

describe("TNav Bar Component Testing ", () => {
    /*     test("Nav Bar Structure is Rendered", () => {
        renderWithProviders(<NavBar />);
        screen.getByText(/Categories/i);
        screen.getByText(/Genres/i);
      }); */
  
      test("Ensure Nav Bar Content is Rendered After Fetch", async () => {
          renderWithProviders(<NavBar />);
          await new Promise((r) => setTimeout(r, 2000));
          screen.getByRole('button', {  name: /Popular/i})
          screen.getByRole('button', {  name: /Top Rate/i})
          screen.getByRole('button', {  name: /Upcoming/i})
      });

  }); 