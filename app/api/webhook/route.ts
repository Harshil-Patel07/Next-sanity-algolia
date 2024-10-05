import { AlgoliaClient, SanityClient } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import indexer from "sanity-algolia";

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sanityAlgolia = indexer(
    {
      post: {
        index: AlgoliaClient.initIndex('post'),
      },
    },
    document => {
      return {
        title: document.title,
        path: document.slug.current,
        publishedAt: document.publishedAt,
        excerpt: document.excerpt,
      };
    }
  );

  try {
    await sanityAlgolia.webhookSync(SanityClient, req.body);
    return res.status(200).send('ok');
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).send('Internal Server Error');
  }
}
