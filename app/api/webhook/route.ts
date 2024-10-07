import { AlgoliaClient, SanityClient } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import indexer from "sanity-algolia";


export  async function POST(req: NextRequest) {

  const sanityAlgolia = indexer(
    {
      post: {
        index: AlgoliaClient.initIndex('post'),
      },
    },
    (document) => ({
      title: document.title,
      path: document.slug.current,
      publishedAt: document.publishedAt,
      excerpt: document.excerpt,
    })
  );

  try {
 
    await sanityAlgolia.webhookSync(SanityClient, await req?.body);
    console.log('Synced successfully');
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
