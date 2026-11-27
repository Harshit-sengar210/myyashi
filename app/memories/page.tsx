import SubpageLayout from "@/components/SubpageLayout";
import MemoryTimeline from "@/components/MemoryTimeline";
import CollageSplit from "@/components/CollageSplit";
import SketchColorSlider from "@/components/SketchColorSlider";

export default function MemoriesPage() {
  return (
    <SubpageLayout
      title="Our Memories"
      hindiTitle="हमारी ख़ूबसूरत यादों का कारवां 📸"
      icon="📸"
    >
      {/* 2) 7-Panel Collage Split into Animated Polaroids */}
      <CollageSplit />

      {/* 3) Interactive Sketch-to-Color Reveal Slider */}
      <SketchColorSlider />

      {/* Vertical Timeline Stories */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-center mb-6">
          <span className="text-xs font-poppins uppercase tracking-widest text-pink-soft font-semibold block mb-1">
            Story Timeline
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
            From Day One To Today 💖
          </h3>
        </div>
        <MemoryTimeline />
      </div>
    </SubpageLayout>
  );
}
