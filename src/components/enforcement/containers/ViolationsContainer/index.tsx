import { memo } from 'react'
import { useHandleTableData, useResetCtx, useHandleDeleteBtn } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SiteViolationsIndicator from '../../indicators/ViolationsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter'
import GetViolation from '@/components/enforcement/forms/get/GetViolation'
import * as ComplaintsContainer from '../ComplaintsContainer/components'
import * as Components from './components'

function ViolationsContainer({ violations }: { violations: AppTypes.ConstructionViolationInterface[] }) {
  const tableData = useHandleTableData(violations)

  const handleDeleteBtn = useHandleDeleteBtn()

  useResetCtx()

  return (
    <div className="flex flex-col my-10 gap-10 m-auto w-fit">
      <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
        <Components.CreateBtn href={'/create/enforcement/violation'}>
          Create New Violation
        </Components.CreateBtn>
        <div className="absolute flex items-center gap-3 top-8 right-8">
          <ComplaintsContainer.ReportBtn />
          <ComplaintsContainer.ExportBtn />
        </div>

        <div className="m-auto">
          <SiteViolationsIndicator violations={violations} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <Components.ViolationsTable tableData={tableData} />
        </div>
      </div>

      <Components.UpdateForm>
        <GetViolation handleDeleteBtn={handleDeleteBtn} />
      </Components.UpdateForm>
      
    </div>
  )
}

export default memo(ViolationsContainer)