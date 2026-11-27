import SubpageLayout from "@/components/SubpageLayout";
import SurpriseClimax from "@/components/SurpriseClimax";

export default function SurprisePage() {
  return (
    <SubpageLayout
      title="Special Surprise"
      hindiTitle="सिर्फ तुम्हारी मुस्कान के लिए 🎁"
      icon="🎁"
    >
      <SurpriseClimax />
    </SubpageLayout>
  );
}
