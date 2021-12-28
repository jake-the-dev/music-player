import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
  // UseEffect
  useEffect(() => {
    const newSongs = props.songs.map((song) => {
      if (song.id === props.currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    props.setSongs(newSongs);
  }, [props.currentSong]);

  // Event Handlers
  const playSongHandler = () => {
    if (props.isPlaying) {
      props.audioRef.current.pause();
      props.setIsPlaying(!props.isPlaying);
    } else {
      props.audioRef.current.play();
      props.setIsPlaying(!props.isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    props.audioRef.current.currentTime = e.target.value;
    props.setSongInfo({ ...props.songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = props.songs.findIndex(
      (song) => song.id === props.currentSong.id
    );
    if (direction === "skip-forward") {
      await props.setCurrentSong(
        props.songs[(currentIndex + 1) % props.songs.length]
      );
    }
    if (direction === "skip-backward") {
      if ((currentIndex - 1) % props.songs.length === -1) {
        await props.setCurrentSong(props.songs[props.songs.length - 1]);
        if (props.isPlaying) props.audioRef.current.play();
        return;
      }
      await props.setCurrentSong(
        props.songs[(currentIndex - 1) % props.songs.length]
      );
    }
    if (props.isPlaying) props.audioRef.current.play();
  };

  // Add styles
  const trackAnimation = {
    transform: `translateX(${props.songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(props.songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${props.currentSong.color[0]}, ${props.currentSong.color[1]} )`,
          }}
        >
          <input
            min={0}
            max={props.songInfo.duration || 0}
            value={props.songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        <p>
          {getTime(props.songInfo.currentTime > 0)
            ? getTime(props.songInfo.remainingTime || 0)
            : getTime(props.songInfo.duration)}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-backward")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={props.isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
