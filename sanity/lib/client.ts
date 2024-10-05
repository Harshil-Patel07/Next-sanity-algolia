import { createClient } from 'next-sanity'

import { algoliaApiKey, algoliaAppId, apiVersion, dataset, projectId } from '../env'
import { algoliasearch } from 'algoliasearch'

export const SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const AlgoliaClient:any = algoliasearch(
  algoliaAppId,
  algoliaApiKey
)

