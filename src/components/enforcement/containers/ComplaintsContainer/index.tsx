import { memo } from 'react'
import { useResetCtx } from '../ViolationsContainer/hooks'
import { useHandleTableData, useHandleDeleteBtn } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import ComplaintsIndicator from '../../indicators/ComplaintsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter'
import { CreateBtn, UpdateForm } from '../ViolationsContainer/components'
import GetComplaint from '@/components/enforcement/forms/get/GetComplaint'
import * as Components from './components'

function ComplaintsContainer({ complaints }: { complaints: AppTypes.ComplaintInterface[] }) {
  const tableData = useHandleTableData(complaints)

  const handleDeleteBtn = useHandleDeleteBtn()

  useResetCtx()

  return (
    <div className="flex flex-col my-10 gap-10 m-auto w-fit">
      <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
        <CreateBtn href={'/create/enforcement/complaint'}>Create New Complaint</CreateBtn>
        <div className="absolute flex items-center gap-3 top-8 right-8">
          <Components.ReportBtn />
          <Components.ExportBtn />
        </div>

        <div className="m-auto">
          <ComplaintsIndicator complaints={complaints} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <Components.ComplaintsTable tableData={tableData} />
        </div>
      </div>

      <UpdateForm>
        <GetComplaint handleDeleteBtn={handleDeleteBtn} />
      </UpdateForm>
    </div>
  )
}

export default memo(ComplaintsContainer)