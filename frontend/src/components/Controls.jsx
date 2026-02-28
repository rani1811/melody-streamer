export default function Controls({ isPlaying, onPlayPause, onNext, onPrev }) {
  return (
    <div className="controls">
      <button onClick={onPrev}>⏮</button>
      <button onClick={onPlayPause}>
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button onClick={onNext}>⏭</button>
    </div>
  );
}