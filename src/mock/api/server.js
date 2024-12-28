const { TextDecoder, TextEncoder } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder, writable: true },
  TextEncoder: { value: TextEncoder, writable: true },
});

// import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {handlers} from "./handlers"

export const server = setupServer(...handlers)