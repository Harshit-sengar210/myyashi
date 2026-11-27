import SubpageLayout from "@/components/SubpageLayout";
import LetterViewer from "@/components/LetterViewer";

export default function LettersPage() {
  return (
    <SubpageLayout
      title="Love Letters"
      hindiTitle="ख़ास तुम्हारे लिए कुछ दिल की बातें 💌"
      icon="💌"
    >
      <LetterViewer />
    </SubpageLayout>
  );
}
