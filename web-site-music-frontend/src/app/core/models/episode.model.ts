import { Reel } from "./spectacle.model";

export interface Episode {
  id: number;
  numero: number;
  titre: string;
  description: string;
  youtubeUrl: string;
  afficheUrl: string;
  datePublication: string;
  reels: Reel[];
}