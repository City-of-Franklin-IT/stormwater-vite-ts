import { useEffect, useRef, useState } from "react"
import claudeIcon from "@/assets/icons/claude/claude.webp"
import { useAiChatPanel, useSendChatMessage } from "./hooks"

// Types
import { ChatMessage } from "./context"

export const PanelHeader = ({ onClose }: { onClose: () => void }) => {

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--claude-border)]">
      <div className="flex items-center gap-2">
        <img src={claudeIcon} alt="" className="w-6 h-6" />
        <h2 className="claude-wordmark text-lg text-[color:var(--claude-ink)]">Claude</h2>
      </div>
      <button
        type="button"
        aria-label="Close assistant panel"
        onClick={onClose}
        className="btn btn-sm btn-circle btn-ghost text-[color:var(--claude-ink)] hover:bg-[color:var(--claude-border)]">
          ✕
      </button>
    </div>
  )
}

export const MessageList = () => {
  const { messages, isSending } = useAiChatPanel()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isSending])

  if(messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 px-8 grow text-[color:var(--claude-ink)]/60">
        <img src={claudeIcon} alt="" className="w-10 h-10 opacity-60" />
        <p className="text-sm">Ask Claude about sites, violations, inspections, or anything else in this application.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto px-5 py-4 grow">
      {messages.map(message => <MessageBubble key={message.id} message={message} />)}
      {isSending && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${ isUser ? "justify-end" : "justify-start" }`}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-[color:var(--claude-user-bubble)] text-[color:var(--claude-user-bubble-content)] px-4 py-2.5 shadow-sm"
            : "max-w-[85%] rounded-2xl rounded-bl-sm bg-[color:var(--claude-accent)] text-[color:var(--claude-accent-content)] px-4 py-2.5 shadow-sm"
        }>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  )
}

const TypingIndicator = () => {

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-[color:var(--claude-accent)] px-4 py-3.5 shadow-sm">
        <span className="claude-typing-dot" />
        <span className="claude-typing-dot" />
        <span className="claude-typing-dot" />
      </div>
    </div>
  )
}

export const MessageInput = () => {
  const [value, setValue] = useState("")
  const { isSending } = useAiChatPanel()
  const sendMessage = useSendChatMessage()

  const handleSubmit = () => {
    const text = value.trim()
    if(!text || isSending) return

    setValue("")
    sendMessage(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-[color:var(--claude-border)] p-4">
      <div className="flex items-end gap-2 rounded-xl border border-[color:var(--claude-border)] bg-[color:var(--claude-surface)] px-3 py-2">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          rows={2}
          placeholder="Ask Claude..."
          aria-label="Chat message input"
          className="grow resize-none bg-transparent text-sm text-[color:var(--claude-ink)] placeholder:text-[color:var(--claude-ink)]/40 outline-none disabled:cursor-not-allowed" />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSending || !value.trim()}
          aria-label="Send message"
          className="btn btn-sm rounded-lg bg-[color:var(--claude-accent)] text-[color:var(--claude-accent-content)] disabled:opacity-50 disabled:bg-[color:var(--claude-accent)]">
            Send
        </button>
      </div>
    </div>
  )
}
