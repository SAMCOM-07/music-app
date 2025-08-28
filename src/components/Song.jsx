import React, { useContext } from "react";
import { MusicContext } from "./../contexts/MusicContext.jsx";

const Song = ({ song, handleSongChange }) => {
  const { id, name, duration, artist_name, image } = song;

  const { formatTime, currentSong } = useContext(MusicContext);

  
  
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <img src={image} alt="" className="w-12 h-12 rounded-lg" />
        <div className="cursor-pointer" onClick={handleSongChange}>
          <h3
          
            className={`${
              currentSong && currentSong.id === id
                ? "text-blue-300 text-[22px]"
                : " text-white"
            } font-bold max-w-[200px] text-xl truncate hover:scale-105 transition-all duration-200`}
          >
            {name}
          </h3>
          <h5 className="text-gray-300 text-xs font-semibold max-w-[200px] truncate">{artist_name}</h5>
        </div>
      </div>
      <span className="font-bold text-sm md:text-xs text-gray-300">{formatTime(duration)}</span>
    </div>
  );
};

export default Song;
