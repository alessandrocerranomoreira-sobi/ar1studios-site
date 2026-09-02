export type PodcastGalleryItem = {
  src: string;
  alt: string;
  guest?: string;
  program?: string;
  year?: number;
  category: "influenciador" | "artista" | "politico" | "personalidade" | "criador" | "corporativo";
};

export const podcastGallery: PodcastGalleryItem[] = [
  {
    src: "/media/podcast-entrevista-v1.webp",
    alt: "Entrevista gravada em estúdio de podcast",
    category: "corporativo",
    program: "Gravação em estúdio",
  },
  {
    src: "/media/podcast-artista-v1.webp",
    alt: "Artista durante gravação de podcast",
    category: "artista",
    program: "Convidado em gravação",
  },
  {
    src: "/media/podcast-bastidores-camera-v1.webp",
    alt: "Câmera registrando os bastidores de um podcast",
    category: "criador",
    program: "Produção em andamento",
  },
];
