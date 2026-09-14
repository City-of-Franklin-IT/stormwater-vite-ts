export const getAccessTokenRoles = (accessToken: string): string[] => {
  try {
    const payload = accessToken.split('.')[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    const claims = JSON.parse(decoded)

    return claims.roles ?? []
  } catch {
    return []
  }
}