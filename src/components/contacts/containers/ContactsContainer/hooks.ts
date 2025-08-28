import { useContext, useCallback, useMemo, useEffect } from "react"
import { useReturnUserRoles } from "@/helpers/hooks"
import ContactsCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(ContactsCtx)

  const handlePrevBtn = useCallback(() => {
    if(currentPage !== 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
    }
  }, [currentPage, dispatch])

  const handleNextBtn = useCallback(() => {
    if(currentPage !== totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
    }
  }, [currentPage, totalPages, dispatch])

  const label = `Page ${ currentPage } / ${ totalPages }`

  return { handlePrevBtn, handleNextBtn, label }
}

export const useHandleTableData = (contacts: AppTypes.ContactInterface[]) => {
  const { currentPage, searchValue, showInactiveContacts } = useContext(ContactsCtx)

  const data = useMemo(() => {
    let contactsArray: AppTypes.ContactInterface[]

    if(searchValue) { // Search value
      const regex = new RegExp(searchValue, 'i')

      contactsArray = contacts.filter(contact => {
        const searchableProps: (keyof AppTypes.ContactInterface)[] = ['name', 'company']

        return searchableProps.some(prop => {
          const value = contact[prop]
          return value && regex.test(value as string)
        })
      })
    } else contactsArray = contacts

    if(!showInactiveContacts) { // Inactive contacts filter
      contactsArray = contactsArray.filter(contact => !contact.inactive)
    }

    const startIndex = (currentPage - 1) * 50
    const endIndex = currentPage * 50

    return { tableData: contactsArray.slice(startIndex, endIndex), count: contactsArray.length }
  }, [contacts, currentPage, searchValue, showInactiveContacts])

  useSetTotalPages(data.count)

  return data.tableData
}

export const useOnTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(ContactsCtx)
  const roles = useReturnUserRoles()

  return useCallback(() => {
    if(!roles.includes('task.write')) {
      return null
    }
    
    dispatch({ type: 'SET_FORM_UUID', payload: uuid })
  }, [roles, dispatch, uuid])
}

export const useSetTotalPages = (count: number) => { // Set total pages to ctx
  const { dispatch } = useContext(ContactsCtx)

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(count / 50) })
  }, [count, dispatch])
}