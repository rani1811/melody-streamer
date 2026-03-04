import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Playlist from "./Playlist";
import Favorites from "./Favorites";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  /* ===============================
     LOAD SONGS FROM BACKEND
  =============================== */
  useEffect(() => {
    fetch("/api/songs")
      .then(res => res.json())
      .then(data => {
        const songs = data.songs.map(song => ({
          name: song.title,
          artist: song.artist,
          album: "Album",
	  src: song.file_url || `/music/${song.file_name}`
        }));
        setPlaylist(songs);
      })
      .catch(() => {
        setPlaylist([
          {
            name: "Sample Song",
            artist: "Demo Artist",
            album: "Demo Album",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          }
        ]);
      });
  }, []);

  /* ===============================
     LOAD SONG WHEN INDEX CHANGES
  =============================== */
  useEffect(() => {
    if (!playlist.length || !audioRef.current) return;

    const audio = audioRef.current;

    audio.src = playlist[currentIndex].src;
    audio.load(); // 🔥 important

    if (isPlaying) {
      audio.play().catch(err => console.error(err));
    }
  }, [currentIndex, playlist]);

  /* ===============================
     PLAY / PAUSE
  =============================== */
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  /* ===============================
     NEXT / PREVIOUS
  =============================== */
  const changeSong = (direction) => {
    if (!playlist.length) return;

    const newIndex =
      (currentIndex + direction + playlist.length) % playlist.length;

    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  /* ===============================
     PROGRESS
  =============================== */
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleProgressChange = (value) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    setProgress(value);
    audio.currentTime = (value / 100) * audio.duration;
  };

  /* ===============================
     VOLUME
  =============================== */
  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  /* ===============================
     FAVORITES
  =============================== */
  const toggleFavorite = () => {
    const song = playlist[currentIndex];
    const exists = favorites.find(f => f.src === song.src);

    if (exists) {
      setFavorites(favorites.filter(f => f.src !== song.src));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  /* ===============================
     LOCAL FILE INSERT
  =============================== */
  const handleInsertClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const newSong = {
      name: file.name.replace(/\.[^/.]+$/, ""),
      src: url,
      artist: "Local File",
      album: "Local"
    };

    const updated = [...playlist, newSong];
    setPlaylist(updated);
    setCurrentIndex(updated.length - 1);
    setIsPlaying(true);
  };

  const isFavorite = favorites.some(
    f => f.src === playlist[currentIndex]?.src
  );

  return (
    <div className={`container ${showPlaylist || showFavorites ? "expanded" : ""}`}>

      <div className="player">
        <h2>{playlist[currentIndex]?.name || "Song Title"}</h2>
        <h3>{playlist[currentIndex]?.artist || "Artist Name"}</h3>
        <h4>{playlist[currentIndex]?.album || "Album Name"}</h4>

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

        <div className="buttons">
          <button onClick={() => setShowPlaylist(prev => !prev)}>
            Playlist
          </button>

          <button
            className={`heart-btn ${isFavorite ? "liked" : ""}`}
            onClick={toggleFavorite}
          >
            ❤
          </button>

          <button onClick={handleInsertClick}>+</button>

          <button onClick={() => setShowFavorites(prev => !prev)}>
            Favorites
          </button>
        </div>

        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {(showPlaylist || showFavorites) && (
        <div className="list">

          {showFavorites && (
            <Favorites
              favorites={favorites}
              onSelect={(index) => {
                const favSong = favorites[index];
                audioRef.current.src = favSong.src;
                audioRef.current.load();
                audioRef.current.play();
                setIsPlaying(true);
              }}
            />
          )}

          {showPlaylist && (
            <Playlist
              playlist={playlist}
              onSelect={(index) => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
            />
          )}

        </div>
      )}
    </div>
  );
}
