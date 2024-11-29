import type { Visibility } from "../types/utils"

export interface PlaylistDTO {
  id: string
  name: string
  visibility: Visibility
  isDefault: boolean
  color: string
  mediasId: string[]
  createdAt: Date
  updatedAt: Date | null | undefined
}

export interface CreatePlaylistDTO {
  name: string
  userId: string
  isDefault?: boolean
  color: string
  visibility: Visibility
}
