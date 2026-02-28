export default function Favorites({ favorites, onSelect }) {
  return (
    <div className="favorites-container">
      <h3>Favorites</h3>
      <ul>
        {favorites.length === 0 && <li>No songs added</li>}
        {favorites.map((song, index) => (
          <li key={index} onClick={() => onSelect(index)}>
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}