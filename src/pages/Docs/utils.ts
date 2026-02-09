export type MethodsType =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'

export type RequestItemType = {
  name: string
  request?: {
    method: string
    url: { raw: string; path: string[] }
    description?: string
    body?: {
      mode: string
      raw: string
    }
  }
  item?: RequestItemType[]
}

export type CollectionInfoType = {
  name: string
  description: string
}

export type CollectionType = {
  info: CollectionInfoType
  item: RequestItemType[]
}

type MethodsColorType =
  | 'badge-success'
  | 'badge-info'
  | 'badge-warning'
  | 'badge-error'
  | 'badge-secondary'

export const docColorsMap = new Map<MethodsType, MethodsColorType>([
  ['GET', 'badge-success'],
  ['POST', 'badge-info'],
  ['PUT', 'badge-warning'],
  ['DELETE', 'badge-error'],
  ['PATCH', 'badge-secondary']
])
