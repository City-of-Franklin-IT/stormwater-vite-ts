// Components
import * as Components from "./components"

function Header() {

  return (
    <header className="flex flex-col font-[play] w-full">
      <div className="flex flex-col gap-4 justify-between font-[play] tracking-[.25rem] items-center bg-primary px-8 w-full shadow-xl lg:flex-row 2xl:h-[10vh]">
        <Components.Title />

        <div className="flex gap-2 overflow-visible w-full lg:w-auto">
          <Components.Buttons />
        </div>
      </div>
    </header>
  )
}

export default Header
