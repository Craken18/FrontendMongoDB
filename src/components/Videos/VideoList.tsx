import React, { useEffect, useState } from "react";
import { Ivideo } from './Video'
import { getVideos } from './VideoService'
import VideoItem from './VideoItem'

const VideoList = () => {
  const [Videos, setVideos] = useState<Ivideo[]>([]);

  const loadVideos = async () => {
    const res = await getVideos()

    const formatedVideos = res.data.map((video) => {
      return{
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
        updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date()
      }
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setVideos(formatedVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {Videos.map((video) => {
        return (
          <VideoItem Video = {video} key={video._id} loadVideos={loadVideos}/>
        );
      })}
    </div>
  );
};

export default VideoList;
