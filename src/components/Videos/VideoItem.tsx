import React from "react";
import { Ivideo } from "./Video";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { deleteVideo } from "./VideoService";

import "./VideoItem.css";

interface Props {
  Video: Ivideo;
  loadVideos: () => void;
}

const VideoItem = ({ Video, loadVideos }: Props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/update/${Video._id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteVideo(id);
    loadVideos();
  };

  return (
    <div className="col-md-4">
      <div className="card card-body bg-light video-card">
        <div className="d-flex justify-content-between">
          <h1 className="update" onClick={handleClick}>
            {Video.title}
          </h1>
          <span
            className="delete"
            onClick={() => Video._id && handleDelete(Video._id)}
          >
            X
          </span>
        </div>
        <p>{Video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer url={Video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
