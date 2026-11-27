import SubpageLayout from "@/components/SubpageLayout";
import ReasonsDeck from "@/components/ReasonsDeck";

export default function ReasonsPage() {
  return (
    <SubpageLayout
      title="Kyun Pasand Ho"
      hindiTitle="वो वजहें जिनकी वजह से तुम सबसे खास हो ✨"
      icon="✨"
    >
      <ReasonsDeck />
    </SubpageLayout>
  );
}
