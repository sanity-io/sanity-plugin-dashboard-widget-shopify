import type { SanityDocument } from '@sanity/client'

export type ManualSyncStatus = {
  completedAt: string
  count: {
    products: number
    variants: number
  }
  error?: string
  startedAt: string
  status: 'created' | 'failed' | 'success'
}

export type ProductUpdate = {
  documentId?: string
  error?: string
  productId: number
  timestamp: string
  type: string
}

export type SyncStatusDocument = SanityDocument & {
  log: ProductUpdate[]
  status?: ManualSyncStatus
  store: string
}
