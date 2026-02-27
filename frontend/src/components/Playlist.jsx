export default function Playlist({ playlist, onSelect }) {
  return (
    <div className="playlist-container">
      <h3>Playlist</h3>
      <ul>
        {playlist.length === 0 && <li>No songs added</li>}
        {playlist.map((song, index) => (
          <li key={index} onClick={() => onSelect(index)}>
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}