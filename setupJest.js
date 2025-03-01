/**
 * Global Jest setup for React Testing Library
 */
import "@babel/polyfill";
import '@testing-library/jest-dom';

// Mock MutationObserver
global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  disconnect() {}
  observe(element, initObject) {}
  takeRecords() {
    return [];
  }
};

// Polyfill for scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function() {};

// Mock for document.getSelection
document.getSelection = () => {
  return {
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
    getRangeAt: jest.fn(),
    toString: jest.fn(),
    anchorNode: document.createElement('div'),
    anchorOffset: 0,
    focusNode: document.createElement('div'),
    focusOffset: 0,
    isCollapsed: true,
    type: '',
  };
};

// Set up React 18 test environment
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock for createPortal which is used in React 18
if (typeof window !== 'undefined') {
  jest.mock('react-dom', () => {
    const original = jest.requireActual('react-dom');
    return {
      ...original,
      createPortal: (node) => node,
    };
  });
}
