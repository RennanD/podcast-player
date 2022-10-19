interface File {
  url: string
  duration: number
}

export interface Episode {
  id: string
  title: string
  thumbnail: string
  description: string
  file: File
}