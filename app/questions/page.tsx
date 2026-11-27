import SubpageLayout from "@/components/SubpageLayout";
import QuestionsInteractive from "@/components/QuestionsInteractive";
import PhotoBubbles from "@/components/PhotoBubbles";

export default function QuestionsPage() {
  return (
    <SubpageLayout
      title="Sweetie ke Sawaal"
      hindiTitle="कुछ छोटे और प्यारे सवाल 💭"
      icon="💭"
    >
      {/* 5) Floating Photo Bubbles Background */}
      <PhotoBubbles />

      <QuestionsInteractive />
    </SubpageLayout>
  );
}
