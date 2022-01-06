export default interface Anime {
  slug: string
  sources?: Source[]
  title: string
  type?: string
  episodes?: number
  uploadedEpisodes?: number
  episode?: number
  status?: string
  season?: AnimeSeason
  picture?: string
  thumbnail?: string
  synonyms?: string[]
  tags?: string[]
}

interface Source {
  slug: string
  source: string
}

interface AnimeSeason {
  season?: string
  year?: number
}