import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Ivideo } from "./Video";
import { createVideo, getVideo, updateVideo } from "./VideoService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

interface Params {
  id: string;
}

const VideoForm = () => {
  const history = useHistory();
  const params: Params = useParams();

  const [video, setVideo] = useState<Ivideo>({
    title: "",
    url: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!params.id){
      await createVideo(video);
      toast.success("Video Agregado")
    }
    else{
      await updateVideo(params.id, video)
      toast.success("Video Actualizado");
    }

    history.push("/");
  };

  const getAnVideo = async (id: string) => {
    const res = await getVideo(id);
    const { title, description, url } = res.data;
    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) getAnVideo(params.id);
  },[]);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>Nuevo Video</h3>

            <form onSubmit={handleSumbit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Agrega el Titulo del Video"
                  className="form-control"
                  autoFocus
                  onChange={handleChange}
                  value={video.title}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="Agrega la URL del Video"
                  className="form-control"
                  onChange={handleChange}
                  value={video.url}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  className="form-control"
                  rows={3}
                  placeholder="Agrega una Descripcion del Video"
                  onChange={handleChange}
                  value={video.description}
                ></textarea>
              </div>
              {params.id ? (
                <button className="btn btn-success">Actualizar Video</button>
              ) : (
                <button className="btn btn-primary">Agregar Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
