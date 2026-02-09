// Types
import { MapHitInterface } from "@/components/sites/containers/SitesContainer/types"
import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'
import { MotionProps } from "motion/react"

export const getUserDepartment = async (instance: IPublicClientApplication, activeAccount: AccountInfo) => {
  const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me?$select=department',
    scopes: ['User.Read']
  }

  const accessTokenRequest = {
    scopes: graphConfig.scopes,
    account: activeAccount
  }

  const result = await instance.acquireTokenSilent(accessTokenRequest)
  const accessToken = result.accessToken

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${ accessToken }`)
  const response = await fetch(graphConfig.graphMeEndpoint, { headers })
  const data = await response.json()

  return data.department
}

export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}

export const formatPhone = (phone: string): string | undefined => { // Format phone number
  if(phone) {
    return `${ phone.slice(0, 3) }-${ phone.slice(3, 6) }-${ phone.slice(6, 10) }`
  }
}

export const mapHitTest = (results: __esri.ViewHit[]) => { // Checks if a feature is present in map hit results
  return results.find(result => {
    const hit = result as MapHitInterface

    return hit.graphic?.attributes?.uuid
  })
}

export const formatDate = (date: string) => { // Format dates for react hook form
  
  return new Date(date).toISOString().split('T')[0]
}

const slideInLeft: MotionProps = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const slideInRight: MotionProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const fadeInOut: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: {
    duration: 0.25,
    ease: 'easeOut'
    } 
  },
  transition: {
    duration: 0.25,
    ease: 'easeIn'
  }
}

export type MotionPropsType =
  | 'slideInLeft'
  | 'slideInRight'
  | 'fadeInOut'

export const motionPropsMap = new Map<MotionPropsType, MotionProps>([
  ['slideInLeft', slideInLeft],
  ['slideInRight', slideInRight],
  ['fadeInOut', fadeInOut]
])