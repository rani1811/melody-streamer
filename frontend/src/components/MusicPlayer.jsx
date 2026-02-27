import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Playlist from "./Playlist";
import Favorites from "./Favorites";
import ProgressBar from "./ProgressBar";

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  /* Load Songs */
  useEffect(() => {
    fetch("/api/songs")
      .then(res => res.json())
      .then(data => {
        const songs = data.map(song => ({
          name: song.title,
          src: song.file_url,
          artist: song.artist,
          album: "Album"
        }));
        setPlaylist(songs);
      })
      .catch(() => {});
  }, []);

  /* Load Selected Song */
  useEffect(() => {
    if (playlist.length > 0) {
      audioRef.current.src = playlist[currentIndex].src;
    }
  }, [currentIndex, playlist]);

  /* Play / Pause */
  const togglePlay = () => {
    if (!audioRef.current.src) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  /* Next / Previous */
  const changeSong = (dir) => {
    if (!playlist.length) return;
    const newIndex =
      (currentIndex + dir + playlist.length) % playlist.length;

    setCurrentIndex(newIndex);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  /* Progress */
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleProgressChange = (value) => {
    const audio = audioRef.current;
    setProgress(value);
    audio.currentTime = (value / 100) * audio.duration;
  };

  /* Volume */
  const handleVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value;
  };

  /* Favorites */
  const toggleFavorite = () => {
    const song = playlist[currentIndex];
    const exists = favorites.find(f => f.src === song.src);

    if (exists) {
      setFavorites(favorites.filter(f => f.src !== song.src));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  const isFavorite = favorites.some(
    f => f.src === playlist[currentIndex]?.src
  );

  return (
    <div className="container">
      <div className="player">
        <h2>{playlist[currentIndex]?.name || "No Song"}</h2>
        <h3>{playlist[currentIndex]?.artist || ""}</h3>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => changeSong(1)}
        />

        <ProgressBar
          progress={progress}
          volume={volume}
          onProgressChange={handleProgressChange}
          onVolumeChange={handleVolumeChange}
        />

        <Controls
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          onNext={() => changeSong(1)}
          onPrev={() => changeSong(-1)}
        />

        <button
          className={`heart-btn ${isFavorite ? "liked" : ""}`}
          onClick={toggleFavorite}
        >
          ❤
        </button>
      </div>

      <div className="list">
        <Favorites
          favorites={favorites}
          onSelect={setCurrentIndex}
        />
        <Playlist
          playlist={playlist}
          onSelect={setCurrentIndex}
        />
      </div>
    </div>
  );
}