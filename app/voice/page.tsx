import SubpageLayout from "@/components/SubpageLayout";
import VoiceNotePlayer from "@/components/VoiceNotePlayer";

export default function VoicePage() {
  return (
    <SubpageLayout
      title="Voice Note"
      hindiTitle="मेरी आवाज़ में एक छोटा सा पैगाम 🎧"
      icon="🎧"
    >
      <VoiceNotePlayer />
    </SubpageLayout>
  );
}
