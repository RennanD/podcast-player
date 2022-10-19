import { Episode } from "../dtos/EpisodeDto";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      episodes: undefined;
      player: {
        episode: Episode
      };
    }
  }
}