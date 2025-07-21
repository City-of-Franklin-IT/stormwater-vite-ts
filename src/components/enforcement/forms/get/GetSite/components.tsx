import { useContext } from 'react'
import EnforcementCtx from '@/components/enforcement/context'
import { useGetActiveSiteNames, useOnSiteSelect, useGetSelectedSite, useHandleNoSiteBtn } from './hooks'
import { useSetFormType, useResetCtx } from './hooks'

// Components
import FormContainer from "../../../../form-elements/FormContainer"

export const SiteSelect = () => { // Site select
  const { selectedSite } = useContext(EnforcementCtx)

  const { data } = useGetActiveSiteNames()

  const sites = data?.data || []

  const onSiteSelect = useOnSiteSelect()

  if(selectedSite) return null

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-xl">Select Site</h2>

      <select
        className="text-info select select-bordered"
        onChange={(e) => onSiteSelect(e)}>
          <option value=""></option>
          {sites.map(site => {
            return (
              <option key={`site-option-${ site.uuid }`} value={site.uuid}>{site.name}</option>
            )
          })}
      </select>
      <NoSiteBtn />
    </div>
  )
}

export const NoSiteBtn = () => { 
  const { onClick, visible } = useHandleNoSiteBtn()

  if(!visible) return null
  
  return (
    <button 
      type="button"
      className="btn btn-ghost uppercase"
      onClick={onClick}>
        Continue Without Site
    </button>
  )
}

export const Form = () => { // Set form
  const site = useGetSelectedSite()

  const today = new Date().toISOString().split('T')[0]

  const Component = useSetFormType()

  useResetCtx() // Reset ctx on page page change

  if(!Component || !site) return <></>

  return (
    <div className="m-auto w-4/5 mb-10 2xl:w-3/5">
      <FormContainer>
        <Component
          date={today}
          site={site} />
      </FormContainer>
    </div>
  )
}