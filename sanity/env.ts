export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-05'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const algoliaAppId = assertValue(
  process.env.NEXT_PUBLIC_APP_ID,
  'Missing environment variable: NEXT_PUBLIC_APP_ID'
)

export const algoliaApiKey = assertValue(
  process.env.NEXT_PUBLIC_SEARCH_API_KEY,
  'Missing environment variable: NEXT_PUBLIC_SEARCH_API_KEY'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
