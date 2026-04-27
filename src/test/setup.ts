import "@testing-library/jest-dom"
import { vi } from "vitest"

vi.mock('@/context/Auth', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    token: undefined,
    isLoading: false,
    refreshToken: vi.fn()
  })),
  AuthProvider: ({ children }: any) => children
}))

// Mock ResizeObserver for ArcGIS
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
