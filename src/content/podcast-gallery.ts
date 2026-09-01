export type PodcastGalleryItem = {
  src: string;
  alt: string;
  guest?: string;
  program?: string;
  year?: number;
  category: "influenciador" | "artista" | "politico" | "personalidade" | "criador" | "corporativo";
};

// TODO: adicionar imagens autorizadas em public/images/podcast e informar nomes/categorias.
export const podcastGallery: PodcastGalleryItem[] = [];
