import { sanityDataset, sanityProjectId } from './project'

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-15'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? sanityDataset

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? sanityProjectId
