import { useContext, useMemo, useEffect } from "react"
import { useReturnUserRoles } from "@/helpers/hooks"
import ContactsCtx from "../../context"

// Types
import * as AppTypes from "@/context/App/types"

/**
* Returns contact page nav button props
**/
export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(ContactsCtx)

  const handlePrevBtn = () => {
    if(currentPage !== 1) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage - 1 })
    }
  }

  const handleNextBtn = () => {
    if(currentPage !== totalPages) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage + 1 })
    }
  }

  const prevPageBtnProps = {
    onClick: handlePrevBtn,
    disabled: currentPage === 1
  }

  const nextPageBtnProps = {
    onClick: handleNextBtn,
    disabled: !totalPages || currentPage === totalPages
  }

  const label = `Page ${ currentPage } / ${ totalPages }`

  return { btnProps: { prevPageBtnProps, nextPageBtnProps }, label }
}

/**
* Returns paginated contacts data; applies filter when active
**/
export const useHandleTableData = (contacts: AppTypes.ContactInterface[]) => {
  const { currentPage, searchValue, showInactiveContacts } = useContext(ContactsCtx)

  const data = useMemo(() => {
    let contactsArray: AppTypes.ContactInterface[]

    if(searchValue) { // Search value
      const regex = new RegExp(searchValue, "i")

      contactsArray = contacts.filter(contact => {
        const searchableProps: (keyof AppTypes.ContactInterface)[] = ["name", "company"]

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

/**
* Returns table row onClick handler and className based on user role and contact status
**/
export const useHandleTableRow = (contact: AppTypes.ContactInterface) => {
  const { dispatch } = useContext(ContactsCtx)
  const roles = useReturnUserRoles()

  const onClick = () => {
    if(!roles.includes("task.write")) {
      return null
    }
    
    dispatch({ type: "SET_FORM_UUID", payload: contact.uuid })
  }

  const className = `border-b-1 border-neutral-content/50 ${ contact.inactive ? "opacity-50" : "" }`

  return { onClick, className }
}

/**
* Sets total pages in ContactsCtx based on item count
**/
export const useSetTotalPages = (count: number) => {
  const { dispatch } = useContext(ContactsCtx)

  useEffect(() => {
    dispatch({ type: "SET_TOTAL_PAGES", payload: Math.ceil(count / 50) })
  }, [count, dispatch])
}