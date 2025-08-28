import React, { useContext, useEffect, useRef, useState } from "react";
import { MusicContext } from "./../contexts/MusicContext.jsx";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { TbRewindForward10 } from "react-icons/tb";
import { TbRewindBackward10 } from "react-icons/tb";

const CurrentSong = () => {
  const { handlePlay, isPlaying, setIsPlaying, audioRef, songs, formatTime, currentSong, setCurrentSong } = useContext(MusicContext);
  const { name, image, audio, artist_name } = currentSong;

  const [showDetails, setShowDetails] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurentSongIndex] = useState(0);
  const progressBarRef = useRef(null);

  // progress

  const handleProgressBar = (e) => {
    const bar = progressBarRef.current;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const barWidth = rect.width;

    const percentage = clickX / barWidth;
    const newTime = audioRef.current.duration * percentage;
    audioRef.current.currentTime = newTime;
    // console.log(bar.getBoundingClientRect(), e.clientX, rect.width, percentage, newTime)
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime); 
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
      audioRef.current.pause();
      setCurrentSong(songs[currentSongIndex + 1]);
    };

    audio && audio.addEventListener("ended", handleEnded);

    return () => audio && audio.removeEventListener("ended", handleEnded);
  }, []);

  function handlePrev() {
    if (currentSongIndex > 0) {
      setCurentSongIndex((prev) => prev - 1);
      setIsPlaying(true)
    }
  }

  function handleNext() {
    if (currentSongIndex !== songs.length - 1) {
      setCurentSongIndex((prev) => prev + 1);
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex]);
  }, [currentSongIndex]);

  return (
    <>
      {currentSong && <div
        className={`${
          showDetails ? "hidden" : "block"
        } w-full p-3 bg-gray-100 rounded-3xl absolute bottom-0`}
      >
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <img src={image} alt="" className="w-12 h-12 rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.3)]" />
            <div
              onClick={() => setShowDetails(true)}
              className="cursor-pointer"
            >
              <h3 className="font-bold text-[#050551] max-w-[200px] truncate">
                {name}
              </h3>
              <h5 className="text-gray-400 text-xs font-semibold max-w-[200px] truncate">{artist_name}</h5>
            </div>
          </div>
          {/* the audio file */}
          <audio ref={audioRef} src={audio}></audio>
          <button onClick={handlePlay} className="text-lg">
            {isPlaying ? <FaPause className='text-blue-900 text-xl' /> : <FaPlay className='text-blue-900'/>}
          </button>
        </div>
      </div>}

           {/* showing details */}

      <div
        className={`${
          showDetails ? "flex" : "hidden"
        } h-full w-full absolute bottom-0 flex-col justify-end items-center backdrop-blur-xs`}
      >
        <button
          onClick={() => setShowDetails(false)}
          className="font-semibold text-lg bg-white rounded-full p-2 gridCenter"
        >
          <FaTimes />
        </button>
        <div className="p-6 rounded-3xl bg-white h-[75%] w-full mt-8 flex flex-col gap-4">
          <img src={image} alt="" className="rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.3)]" />
          <div className="flex flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-bold text-[#050551] text-lg max-w-[200px] truncate">
                {name}
              </h3>
              <h5 className="text-gray-400 text-xs font-semibold max-w-[200px] truncate">{artist_name}</h5>
            </div>
            <button className="text-lg">❤</button>
          </div>
          {/* the audio file */}
          <audio ref={audioRef} src={audio}></audio>
          <div className="overflow-hidden">
            <div className="flex flex-row items-center gap-4">
              <button
                onClick={() => (audioRef.current.currentTime -= 10)}
                className="mt-4 text-gray-600 text-xl"
              >
                <TbRewindBackward10 />
              </button>
              <div
                onClick={handleProgressBar}
                ref={progressBarRef}
                className="w-full h-2 bg-gray-300 rounded-full  mt-3 cursor-pointer"
              >
                <div
                  style={{ width: progress + "%" }}
                  className="progress relative h-full bg-[#3549bbe1] rounded-full"
                ></div>
              </div>
              <button
                onClick={() => (audioRef.current.currentTime += 10)}
                 className="text-gray-600 text-xl mt-4"
              >
                <TbRewindForward10/>
              </button>
            </div>
            {/* <input
              onChange={handleSeek}
              min={0}
              max={duration}
              type="range"
              className="w-full "
              
            /> */}
            <div className="flex items-center justify-between text-gray-500 px-8 font-semibold text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex flex-row items-center self-center gap-4">
            <button className='text-gray-600 text-xl' onClick={handlePrev}>
              <IoPlayBack/>
            </button>
            <button onClick={handlePlay} className='text-blue-900 text-xl' >
              {isPlaying ? <FaPause /> : <FaPlay/>}
            </button>
            <button className='text-gray-600 text-xl' onClick={handleNext}>
              <IoPlayForward/>
            </button>
          </div>
        </div>
      </div>
    </>
   
  );
};

export default CurrentSong;
