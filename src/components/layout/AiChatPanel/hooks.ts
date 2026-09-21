import { useContext, useEffect } from "react"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { postChatMessage } from "./AiChatPanelActions"
import AiChatPanelCtx from "./context"

export const useAiChatPanel = () => useContext(AiChatPanelCtx)

export const useCloseOnEscape = (open: boolean, onClose: () => void) => {
  useEffect(() => {
    if(!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])
}

export const useSendChatMessage = () => {
  const { sessionId, dispatch } = useAiChatPanel()
  const { enabled, token, refreshToken } = useEnableQuery()

  return async (text: string) => {
    if(!enabled || !token) return

    dispatch({ type: "SEND_MESSAGE", payload: { text } })

    const result = await withTokenRefresh(
      () => postChatMessage({ sessionId, message: text }, authHeaders(token)),
      refreshToken
    ).catch(err => {
      console.log(err)
      return undefined
    })

    if(!result) {
      dispatch({ type: "SEND_FAILED" })
      return errorPopup("Claude couldn't respond. Please try again.")
    }

    dispatch({ type: "RECEIVE_REPLY", payload: { text: result.reply, sessionId: result.sessionId } })
  }
}
