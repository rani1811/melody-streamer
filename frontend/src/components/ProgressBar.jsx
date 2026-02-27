export default function ProgressBar({
  progress,
  volume,
  onProgressChange,
  onVolumeChange
}) {
  return (
    <>
      <input
        type="range"
        value={progress}
        onChange={(e) => onProgressChange(e.target.value)}
      />

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(e.target.value)}
      />
    </>
  );
}