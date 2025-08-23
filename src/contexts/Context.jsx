import React, { useEffect, useRef, useState } from "react";
import Image from "./../assets/cover-image.jpg";
// import { songs } from "./../assets/data.js";
import { MusicContext } from "./MusicContext";

const Context = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  let audioRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [musicType, setMusicType] = useState("");

  // fetching songs

  const myId = "a36292b3";

  // const isChanged = musicType === 'gospel' || musicType === 'hiphop';

  useEffect(() => {
    async function fectSongs() {
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${myId}&format=json&limit=20&offset=${
            count === 0 ? 20 : count * 20
          }&tags=${musicType}&order=releasedate_desc&lang=en`
        );
        const data = await response.json();
        if (data && data?.results) {
          setSongs((prev) =>
              count <= 0
              ? [...data.results]
              : [...prev, ...data.results]
          );
          setCurrentSong(data.results[0]);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMsg("Error loading songs. Check internet connection");
        setIsLoading(false);
        console.log(error.message);
      } 
      // finally {
      //   if (count <= 0) {
      //       console.log("songs loaded");
      //   } else {
      //     console.log("more songs added");
      //   }
      // }
    }

    fectSongs();
  }, [count, musicType]);

  function handlePlay() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
    // console.log(isPlaying)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        formatTime,
        currentSong,
        setCurrentSong,
        Image,
        handlePlay,
        isPlaying,
        setIsPlaying,
        audioRef,
        setCount,
        isLoading,
        errorMsg,
        setMusicType,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default Context;
