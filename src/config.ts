export const APP_BASE = "/stormwater"
export const APP_TITLE = "Stormwater Sites and Enforcement"

export const CLIENT_ID = "10dff41b-bba0-4fcb-83a6-147c19927e6b"
export const ENTRA_CLIENT_ID = "62d76967-d490-4c39-ad33-f245baf5dc53"

export const AUTH_AUTHORITY = "https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/"
export const AUTH_REDIRECT_URI = "https://dev.franklintn.gov/stormwater"
export const AUTH_POST_LOGOUT_REDIRECT_URI = APP_BASE

export const API_URL = import.meta.env.DEV ?
  "https://cofasv38.franklin-gov.com/api/v3/eng/stormwater" :
  "https://dev.franklintn.gov/api/v3/eng/stormwater"
export const ACTIVE_SITES_URL = "https://dev.franklintn.gov/api/v3/eng/public/active-sites"
export const MCP_URL = "https://dev.franklintn.gov"

// Development only (MSAL is bypassed when import.meta.env.DEV). Never commit a real token.
export const MOCK_TOKEN = "dev-token-1234"
