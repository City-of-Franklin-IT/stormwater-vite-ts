// Components
import * as Components from "./components"

function DateRangeFilter() {

  return (
    <div className="flex flex-col items-center gap-6 text-neutral-content font-[play] p-10 pb-12 bg-neutral m-auto w-fit">
      <h2 className="text-xl font-bold uppercase">Date Range Filter</h2>

      <Components.DateRangeInputs />
      <Components.ClearBtn />
    </div>
  )
}

export default DateRangeFilter