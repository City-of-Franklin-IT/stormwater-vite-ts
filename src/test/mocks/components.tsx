import { vi } from "vitest"

export const mockLayout = vi.fn(({ children }: { children: React.ReactNode }) => 
  <div data-testid="layout">{children}</div>
)

export const mockHandleLoading = vi.fn(({ children, isSuccess }: { children: React.ReactNode, isSuccess: boolean }) => 
  isSuccess ? <div>{children}</div> : <div data-testid="loading-spinner">Loading...</div>
)

export const mockErrorBoundary = vi.fn(({ children }: { children: React.ReactNode }) => 
  <div>{children}</div>
)

export const mockSitesProvider = vi.fn(({ children }: { children: React.ReactNode }) => 
  <div>{children}</div>
)

export const mockSitesContainer = vi.fn(({ sites }: { sites: any[] }) => 
  <div data-testid="sites-container">Sites: {sites.length}</div>
)