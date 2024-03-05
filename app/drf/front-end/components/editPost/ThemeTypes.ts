import { Album, Asset } from 'expo-media-library';

export interface HeaderData {
  view: 'album' | 'gallery';
  goToAlbum?: () => void;
  imagesPicked: number;
  multiple: boolean;
  picked: boolean;
  album?: Album;
  noAlbums: boolean;
  totalAllowed: number;
  save?: () => void;
  cancel?: () => void; 
}

export interface AlbumData {
  thumb: Asset;
  album: Album;
  goToGallery: (album: Album) => void;
}
