export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-05'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2ft7a5xu",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const algoliaAppId = assertValue(
  process.env.NEXT_PUBLIC_APP_ID || "B7RGPVKO97",
  'Missing environment variable: NEXT_PUBLIC_APP_ID'
)

export const algoliaApiKey = assertValue(
  process.env.NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY || "f7fda8fa379711dadea3382237876069",
  'Missing environment variable: NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
