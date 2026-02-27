export default function Favorites({ favorites, setCurrentIndex }) {
  return (
    <div className="favorites-container">
      <h3>Favorites</h3>
      <ul>
        {favorites.length === 0 && <li>No songs added</li>}
        {favorites.map((song, index) => (
          <li key={index} onClick={() => setCurrentIndex(index)}>
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}