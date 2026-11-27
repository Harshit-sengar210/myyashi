import SubpageLayout from "@/components/SubpageLayout";
import SongPlayerView from "@/components/SongPlayerView";

export default function SongPage() {
  return (
    <SubpageLayout
      title="Our Song"
      hindiTitle="एक ख़ास धुन और कुछ अनकहे अहसास 🎵"
      icon="🎵"
    >
      <SongPlayerView />
    </SubpageLayout>
  );
}
