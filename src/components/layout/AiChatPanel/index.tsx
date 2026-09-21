import { useAiChatPanel, useCloseOnEscape } from "./hooks"
import Motion from "@/utils/Motion"
import * as Components from "./components"
import "./AiChatPanel.css"

function AiChatPanel() {
  const { open, dispatch } = useAiChatPanel()

  const handleClose = () => dispatch({ type: "CLOSE" })

  useCloseOnEscape(open, handleClose)

  if(!open) return null

  return (
    <Motion animation="slideInRight" className="ai-chat-panel fixed top-0 right-0 h-screen w-full max-w-md z-[9999] flex flex-col shadow-2xl">
      <div role="complementary" aria-label="AI assistant chat panel" className="flex flex-col h-full bg-[color:var(--claude-bg)]">
        <Components.PanelHeader onClose={handleClose} />
        <Components.MessageList />
        <Components.MessageInput />
      </div>
    </Motion>
  )
}

export default AiChatPanel
