import { Context } from 'react'
import { SearchableCtx } from './hooks'

// Components
import * as Components from './components'

function Search<T extends SearchableCtx>({ ctx }: { ctx: Context<T> }) {

  return (
    <div className="flex gap-4 items-center w-1/2 xl:w-1/4">
      <Components.Header />
      <Components.SearchInput ctx={ctx} />
      <Components.ClearBtn ctx={ctx} />
    </div>
  )
}

export default Search