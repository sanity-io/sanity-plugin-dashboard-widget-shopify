import type { SanityDocument } from '@sanity/client'

export type ManualSyncStatus = {
  completedAt: string
  count: {
    products: number
    variants: number
  }
  error?: string
  startedAt: string
  status: string
}

export type SyncStatusDocument = SanityDocument & {
  log: {
    documentId?: string
    error?: string
    productId: number
    timestamp: string
    type: string
  }[]
  status?: 'created' | 'failed' | 'success'
  store: string
}
