"use client"
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { AlgoliaClient } from '@/sanity/lib/client';
import { InstantSearch, RefinementList } from 'react-instantsearch';


const Hit = ({ hit }:any) => (
  <div>
    <h2>{hit.title}</h2>
    <p>{hit.excerpt}</p>
    <a href={`/${hit.path}`}>Read more</a>
  </div>
);

const Search = () => (
  <InstantSearch searchClient={AlgoliaClient} indexName="post">
  <RefinementList attribute="brand" />
</InstantSearch>
);

export default Search;
