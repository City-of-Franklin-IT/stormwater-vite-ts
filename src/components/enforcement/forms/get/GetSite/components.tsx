import { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"
import { useGetActiveSiteNames, useGetSelectedSite, useNoSiteBtnVisibility } from "./hooks"
import { useSetFormType, useResetCtx } from "./hooks"

// Components
import Motion from "@/utils/Motion"
import FormContainer from "../../../../form-elements/FormContainer"

export const SiteSelect = ({ onSelect, onNoSiteSelect }: { onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void, onNoSiteSelect: () => void }) => { // Site select
  const { selectedSite } = useContext(EnforcementCtx)

  const { data } = useGetActiveSiteNames()

  const sites = data?.data || []

  if(selectedSite) return null

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-xl">Select Site</h2>

      <select
        className="text-info select select-bordered"
        onChange={onSelect}>
          <option value=""></option>
          {sites.map(site => {
            return (
              <option key={`site-option-${ site.uuid }`} value={site.uuid}>{site.name}</option>
            )
          })}
      </select>
      <NoSiteBtn onNoSiteSelect={onNoSiteSelect} />
    </div>
  )
}

export const NoSiteBtn = ({ onNoSiteSelect }: { onNoSiteSelect: () => void }) => { 
  const visible = useNoSiteBtnVisibility()

  if(!visible) return null
  
  return (
    <button 
      type="button"
      className="btn btn-ghost uppercase"
      onClick={onNoSiteSelect}>
        Continue Without Site
    </button>
  )
}

export const Form = ({ visible }: { visible: boolean }) => { // Set form
  const { data, isFetching } = useGetSelectedSite()
  const Component = useSetFormType()
  useResetCtx() // Reset ctx on page page change

  if(!visible || !Component || isFetching) return null

  return (
    <Motion animation={"fadeInOut"}>
      <div className="m-auto w-4/5 mb-10 2xl:w-3/5">
        <FormContainer>
          <Component site={data?.data} />
        </FormContainer>
      </div>
    </Motion>
  )
}