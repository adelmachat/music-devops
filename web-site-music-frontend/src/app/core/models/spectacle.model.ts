export interface Photo {
  id: number;
  url: string;
  legende: string;
  ordre: number;
}

export interface Reel {
  id: number;
  url: string;
  titre: string;
  type: string;
}

export interface Spectacle {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  description: string;
  afficheUrl: string;
  photos: Photo[];
  reels: Reel[];
}