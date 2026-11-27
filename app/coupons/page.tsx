import SubpageLayout from "@/components/SubpageLayout";
import ScratchCoupons from "@/components/ScratchCoupons";

export default function CouponsPage() {
  return (
    <SubpageLayout
      title="Coupons"
      hindiTitle="ख़ास तुम्हारे लिए कुछ प्यारे वाउचर 🎁"
      icon="🎁"
    >
      <ScratchCoupons />
    </SubpageLayout>
  );
}
