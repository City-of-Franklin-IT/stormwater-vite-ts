import { memo } from "react"
import { useResetCtx } from "../ViolationsContainer/hooks"
import { useHandleTableData, useHandleDeleteBtn } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import IllicitDischargesIndicator from "../../indicators/IllicitDischargesIndicator"
import DateRangeFilter from "../../filters/DateRangeFilter"
import * as ViolationsContainer from "../ViolationsContainer/components"
import * as ComplaintsContainer from "../ComplaintsContainer/components"
import GetIllicitDischarge from "@/components/enforcement/forms/get/GetIllicitDischarge"
import Motion from "@/utils/Motion"
import * as Components from "./components"

function DischargesContainer({ discharges }: { discharges: AppTypes.IllicitDischargeInterface[] }) {
  const tableData = useHandleTableData(discharges)

  const handleDeleteBtn = useHandleDeleteBtn()

  useResetCtx()

  return (
    <Motion animation={"slideInRight"}>
      <div className="flex flex-col my-10 gap-10 m-auto w-full max-w-7xl">
        <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
          <ViolationsContainer.CreateBtn href={"/create/enforcement/discharges"}>
            Create New Illicit Discharge
          </ViolationsContainer.CreateBtn>
          <div className="absolute flex items-center gap-3 top-8 right-8">
            <ComplaintsContainer.ReportBtn />
            <ComplaintsContainer.ExportBtn />
          </div>

          <div className="m-auto">
            <IllicitDischargesIndicator discharges={discharges} />
          </div>

          <div className="flex flex-col gap-3">
            <DateRangeFilter />
            <Components.IllicitDischargesTable tableData={tableData} />
          </div>
        </div>

        <ViolationsContainer.UpdateForm>
          <GetIllicitDischarge handleDeleteBtn={handleDeleteBtn} />
        </ViolationsContainer.UpdateForm>

      </div>
    </Motion>
  )
}

export default memo(DischargesContainer)