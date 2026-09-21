import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

export type ChatMessage = { id: string, role: "user" | "assistant", text: string }

type AiChatPanelCtx = {
  dispatch: Dispatch<AiChatPanelAction>
  open: boolean
  sessionId?: string
  messages: ChatMessage[]
  isSending: boolean
}

type AiChatPanelState = Omit<AiChatPanelCtx, "dispatch">

type AiChatPanelAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "SEND_MESSAGE", payload: { text: string } }
  | { type: "RECEIVE_REPLY", payload: { text: string, sessionId: string } }
  | { type: "SEND_FAILED" }

const initialState: AiChatPanelState = {
  open: false,
  sessionId: undefined,
  messages: [],
  isSending: false
}

const AiChatPanelCtx = createContext<AiChatPanelCtx>({
  ...initialState,
  dispatch: () => null
})

const AiChatPanelReducer = (state: AiChatPanelState, action: AiChatPanelAction): AiChatPanelState => {

  switch(action.type) {
    case "OPEN":
      return { ...state, open: true }
    case "CLOSE":
      return { ...state, open: false }
    case "TOGGLE":
      return { ...state, open: !state.open }
    case "SEND_MESSAGE":
      return {
        ...state,
        isSending: true,
        messages: [...state.messages, { id: `msg-${ state.messages.length }`, role: "user", text: action.payload.text }]
      }
    case "RECEIVE_REPLY":
      return {
        ...state,
        isSending: false,
        sessionId: action.payload.sessionId,
        messages: [...state.messages, { id: `msg-${ state.messages.length }`, role: "assistant", text: action.payload.text }]
      }
    case "SEND_FAILED":
      return { ...state, isSending: false }
    default:
      return state
  }
}

export const AiChatPanelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<AiChatPanelState, AiChatPanelAction>>(AiChatPanelReducer, initialState)

  return (
    <AiChatPanelCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </AiChatPanelCtx.Provider>
  )
}

export default AiChatPanelCtx
