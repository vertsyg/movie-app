type Genre = {
  name: string
}

export type TMovie = {
  id: number,
  name: string,
  alternativeName: string,
  year: number,
  description?: string,
  rating: {
    kp: number,
  }
  poster?: {
    url: string,
    previewUrl: string
  },
  genres?: Array<Genre>,
}