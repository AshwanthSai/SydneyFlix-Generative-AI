import { screen,} from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils.jsx"
import '@testing-library/jest-dom'; 
import MovieList from "./MovieList.jsx"; 
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie.jsx";

/* Do not run Alan SDK, Simply Mock It */
jest.mock("../Alan.jsx", () => () => {});

const dummyMovies = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg",
      genre_ids: [28, 14, 35],
      id: 845781,
      original_language: "en",
      original_title: "Red One",
      overview: "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
      popularity: 5982.016,
      poster_path: "/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
      release_date: "2024-10-31",
      title: "Red One",
      video: false,
      vote_average: 7,
      vote_count: 1427
    },
    {
      adult: false,
      backdrop_path: "/anotherBackdropPath.jpg",
      genre_ids: [12, 16, 10751],
      id: 123456,
      original_language: "en",
      original_title: "Another Movie",
      overview: "This is another movie description.",
      popularity: 1234.567,
      poster_path: "/anotherPosterPath.jpg",
      release_date: "2023-12-25",
      title: "Another Movie",
      video: false,
      vote_average: 8,
      vote_count: 567
    }
  ],
  total_pages: 1,
  total_results: 2
};
 
describe("MovieList Component", () => {
    describe("Rendering Movies", () => {
      it("should render the correct number of movies", () => {
        renderWithProviders(
            <>
                <FeaturedMovie movie={dummyMovies.results[0]} />
                <MovieList movies={dummyMovies} numberOfMovies={2}/>
            </>
        );
        const headings = screen.getAllByRole('heading', { name: /red one/i });
        expect(headings).toHaveLength(2);
      });
  
      it("should exclude the first movie when excludeFirst is true", () => {
        renderWithProviders(
            <>
                <FeaturedMovie movie={dummyMovies.results[0]} />
                <MovieList excludeFirst movies={dummyMovies} numberOfMovies={2}/>
            </>
        );
        screen.getByRole('heading', {  name: /red one/i})
        screen.getByRole('heading', {  name: /Another Movie/i})
      });
  
      it("should render movie details correctly", () => {
        renderWithProviders(
            <>
                <MovieList movies={dummyMovies} numberOfMovies={1}/>
            </>
        );
        screen.getByRole('heading', {  name: /red one/i})
        screen.getByRole('img', {  name: /red one/i})
        const tooltip = screen.getByTestId('movie-rating');
        expect(tooltip).toBeInTheDocument();
    });
});
});

// expect(screen.getByTestId('movie-rating').getAttribute("aria-label") ).toHaveTextContent("7.00 / 10");