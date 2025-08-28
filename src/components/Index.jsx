import React, { useState, useEffect, useContext } from "react";
import Song from "./Song.jsx";
import CurrentSong from "./CurrentSong.jsx";
import { MusicContext } from "../contexts/MusicContext";

const Index = () => {

  const {
    Image,
    audioRef,
    setIsPlaying,
    songs,
    setCount,
    isLoading,
    errorMsg,
    setMusicType,
    currentSong,
    setCurrentSong,
  } = useContext(MusicContext);

  const handleSongChange = (getIndex) => {
    setCurrentSong(songs[getIndex]);
    setIsPlaying(true);
    // audioRef.current.play();
  };

  useEffect(() => {
    currentSong && audioRef.current.play();
  }, [currentSong]);

  return (
    <div className="container mx-auto gridCenter">
      <div className="bg-[#050551] h-dvh w-screen sm:h-[700px] sm:w-[350px] sm:shadow-3xl sm:rounded-3xl relative flex flex-col items-center gap-4 p-4 overflow-hidden">
        <img
          src={Image}
          alt=""
          className="w-[150px] h-[150px] md:w-[150px] md:h-[150px] rounded-xl mt-4"
        />

        <div className="w-full text-center flex flex-row items-center justify-between">
          <h1 className="font-bold text-white text-xl md:text-lg">
            Music Desk {new Date().getFullYear()}
          </h1>
          <span className="text-gray-300 text-xl md:text-base font-bold">{songs.length} Songs</span>
        </div>

        <div className="space-x-4 border-t-2 border-gray-500 w-full pt-4 text-center">
          <button
            onClick={() => {
              setMusicType("")
              setCount(0)
            }}
            className="py-1 px-4 text-lg bg-white rounded-xl font-semibold text-[#050551] hover:scale-95 hover:opacity-65"
          >
            All
          </button>
          <button
            onClick={() => {
              setMusicType("gospel")
              setCount(0)
            }}
            className="py-1 px-4 text-lg bg-white rounded-xl font-semibold text-[#050551] hover:scale-95 hover:opacity-65"
          >
            Gospel
          </button>
          <button
            onClick={() => {
              setMusicType("hiphop")
              setCount(0)
            }}
            className="py-1 px-4 text-lg bg-white rounded-xl font-semibold text-[#050551] hover:scale-95 hover:opacity-65"
          >
            Hip-Hop
          </button>
        </div>

        <div
          className={`overflow-y-scroll py-6 border-t-2 border-gray-500 flex flex-col gap-4 w-full ${
            currentSong && "pb-18"
          }`}
        >
          {isLoading && (
            <div className="self-center font-semibold text-white mt-24 text-lg">
              Loading Songs ...
            </div>
          )}
          {errorMsg && (
            <div className="text-center self-center max-w-[215px] font-semibold text-white mt-24 text-lg">
              {errorMsg}
            </div>
          )}

          {songs &&
            songs.map((song, index) => (
              <Song
                handleSongChange={() => handleSongChange(index)}
                key={index}
                song={song}
              />
            ))}
          {
          songs && songs?.length > 0 && songs.length < 500 && 
          (
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="py-1 px-3 rounded-md font-semibold bg-white text-[#050551] w-fit self-center mt-4 hover:scale-95 hover:opacity:65"
            >
              More Songs
            </button>
          )}
        </div>
        {currentSong && <CurrentSong />}
      </div>
    </div>
  );
};

export default Index;
