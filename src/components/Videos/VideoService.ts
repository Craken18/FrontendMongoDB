import axios from "axios";
import { Ivideo } from "./Video";

const API = "http://localhost:4000/videos"

export const getVideos = async () => {
  return await axios.get<Ivideo[]>(API);
}

export const getVideo = async (id: string) => {
  return await axios.get<Ivideo>(`${API}/${id}`);
}

export const createVideo = async (video: Ivideo) => {
  return await axios.post<Ivideo>(API, video)
}

export const updateVideo = async (id: string, video: Ivideo) => {
  return await axios.put<Ivideo>(`${API}/${id}`, video)
};

export const deleteVideo = async (id: string) =>{
  return await axios.delete<Ivideo>(`${API}/${id}`)
}