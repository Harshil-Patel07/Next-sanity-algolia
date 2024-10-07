import { AlgoliaClient, SanityClient } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import indexer from "sanity-algolia";

async function readRequestBody(request: NextRequest) {
  const reader = request.body?.getReader();
  const chunks = [];
  let done = false;

  if (reader) {
    while (!done) {
      const { done: readerDone, value } = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }
    const body = Buffer.concat(chunks);
    return JSON.parse(body.toString());
  }

  return {};
}

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
    const requestBody = await readRequestBody(req);
    await sanityAlgolia.webhookSync(SanityClient, requestBody);
    console.log('Synced successfully');
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
