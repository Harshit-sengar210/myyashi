import SubpageLayout from "@/components/SubpageLayout";
import ChatStory from "@/components/ChatStory";

export default function ChatPage() {
  return (
    <SubpageLayout
      title="Sweetie's Chat"
      hindiTitle="हम दोनों की प्यारी सी बातचीत 💬"
      icon="💬"
    >
      <ChatStory />
    </SubpageLayout>
  );
}
