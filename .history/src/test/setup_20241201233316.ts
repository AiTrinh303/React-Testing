import '@testing-library/jest-dom/vitest'
import ResizeObserver from 'resize-observer-polyfill';
import {server} from './mocks/server';
import { Auth0Provider } from '@auth0/auth0-react';

beforeAll(() => server.listen()); 

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

vi.mock('auth0/auth0-react', () => {
  return {
    useAuth0: vi.fn().mockReturnValue({
      isAuthen
    }),
    Auth0Provider: ({children}: PropsWithChildren) => children
  }
})

global.ResizeObserver = ResizeObserver;

// window.PointerEvent = class PointerEvent extends Event {};
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

