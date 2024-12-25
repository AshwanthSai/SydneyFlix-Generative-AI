import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('NavBar Component', () => {
    renderWithProviders(<NavBar />);
});