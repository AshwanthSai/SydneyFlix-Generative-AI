/* 
Dependency Fix for MSW - Mocking API
Jest Test
*/

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "./test/jest.polyfills";
import { server } from "./test/server";

import { ReadableStream } from 'node:stream/web'
if (globalThis.ReadableStream === undefined) {
  globalThis.ReadableStream = ReadableStream
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());