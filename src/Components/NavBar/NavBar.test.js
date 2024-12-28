import { fireEvent, renderHook, screen, waitFor, within } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils.jsx"
import NavBar from "./NavBar.jsx";
import { useContext } from "react";
import { ColorModeContext } from "../../utils/ToggleColorMode.jsx";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'; 
import { useSelector } from "react-redux";

/* Do not run Alan SDK, Simply Mock It */
jest.mock("../Alan.jsx", () => () => {});

describe("NavBar Component", () => {
  test("renders the NavBar structure consistently", () => {
    renderWithProviders(<NavBar />);
    screen.getByText(/Categories/i);
    screen.getByText(/Genres/i);
    screen.getByTestId('Brightness7Icon'); // Light Mode Icon
    screen.getByTestId('search-input'); // Search Bar
    screen.getByTestId('profile-avatar'); // Profile Avatar

    // This Button is not rendered initially, only after API Call
    // Which we have mocked 
    waitFor(async () => {
      const button = await screen.findByRole('button', { name: /western/i });
      expect(button).toBeInTheDocument();
    });
  });

  test("toggles color theme when dark mode is clicked", async () => {
    renderWithProviders(<NavBar />);
    const colorSwitch = await screen.findByTestId('color-switch');
    const { result } = renderHook(() => useContext(ColorModeContext));
    fireEvent.click(colorSwitch);
    waitFor(async () => {
      await expect(result.current.mode).toBe("dark");
    });
  });

  test("updates the search bar value correctly", async () => {
    renderWithProviders(<NavBar />);
    const searchBar = await screen.findByTestId("search-input");
    await userEvent.type(searchBar, 'SuperMan');
    expect(searchBar).toHaveValue("SuperMan");
  });

  test("updates currentGenreOrCategory in the store when a genre/category is clicked", async () => {
    const { store } = renderWithProviders(<NavBar />);
    const link = screen.getByRole('link', { name: /popular/i });
    fireEvent.click(link);
    waitFor(async () => {
      const updatedState = await store.getState();
      expect(updatedState.currentGenreOrCategory.genreIdOrCategoryName).toBe("popular");
    });
  });

  test("updates searchQuery in the store when searching", async () => {
    renderWithProviders(<NavBar />);
    const searchBar = await screen.findByTestId("search-input");
    await userEvent.type(searchBar, 'SuperMan');
    waitFor(async () => {
      const updatedState = await store.getState();
      expect(updatedState.currentGenreOrCategory.searchQuery).toBe("SuperMan");
    });
  });
});
