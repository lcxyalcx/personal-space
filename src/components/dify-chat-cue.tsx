/**
 * 固定在聊天气泡左侧的轻量提示（与 udify 注入的 #dify-chatbot-bubble-button 对齐）。
 * 样式见 globals.css `.dify-chat-cue`。
 */
export function DifyChatCue() {
  return (
    <div className="dify-chat-cue" role="note">
      <div className="dify-chat-cue__pill">
        <span className="dify-chat-cue__en">Talk to me</span>
        <span className="dify-chat-cue__zh">点按钮开聊</span>
      </div>
    </div>
  );
}
