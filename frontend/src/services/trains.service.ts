import {axiosService} from "./axios.service";
import {urls} from "../constans";
import {ITrain} from "../interfaces";

export const trainsService = {
    createTrain: (train: ITrain) => axiosService.post(urls.trains, train),
    getTrains: () => axiosService.get<ITrain[]>(urls.trains),
    getTrainsByRoute: (city: string) => axiosService.get<ITrain[]>(urls.trains + `/?city=${city}`),
    getTrainById: (id: string) => axiosService.get<ITrain>(urls.trains + `/${id}`),
    updateTrain: (id: string, train: ITrain) => axiosService.put<ITrain>(urls.trains + `/${id}`, train),
    deleteTrain: (id: string) => axiosService.delete(urls.trains + `/${id}`),
}
