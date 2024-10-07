"use client";
import React from 'react';

import { AlgoliaClient } from '@/sanity/lib/client';
import { Hits, InstantSearch, RefinementList, SearchBox } from 'react-instantsearch';



const Hit = ({ hit }: any) => (
  <div>
    <h2>{hit.title}</h2>
    <p>{hit.excerpt}</p>
    <a href={`/${hit.path}`}>Read more</a>
  </div>
);

const Search = () => (
  <InstantSearch searchClient={AlgoliaClient} indexName="post">
    <SearchBox />
    <RefinementList attribute="categories" />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

export default Search;
