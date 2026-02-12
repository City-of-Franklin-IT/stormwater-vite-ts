// Components
import * as Components from "./components"

function Search() {

  return (
    <div className="flex items-center gap-2 rounded-lg mr-auto">
      <Components.Header />
      <div className="flex gap-2 h-[40px]">
        <Components.SearchInput />
        <Components.ClearBtn />
      </div>
    </div>
  )
}

export default Search