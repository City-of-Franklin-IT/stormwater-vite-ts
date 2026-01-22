export interface MapHitInterface {
  graphic: {
    attributes: {
      name: string
      hasOpenViolation: boolean
      uuid: string
    }
  }
}

export type FilterableCtx = {
  searchValue: string
  showActiveSitesOnly: boolean
  showOpenIssuesOnly: boolean
  dispatch: React.Dispatch<
    | { type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' }
    | { type: 'TOGGLE_OPEN_ISSUES_ONLY' }
  >
}