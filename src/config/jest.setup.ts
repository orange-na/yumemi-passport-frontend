import "@testing-library/jest-dom";

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue([]),
});
