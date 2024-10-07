"use client";
import React from 'react';
import { AlgoliaClient } from '@/sanity/lib/client';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';

type AlgoliaRecord = {
  hit: {
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    cast: Array<{
      name: string;
      character: string;
    }>;
    objectID: string;
    _highlightResult: any; 
  };
};

const Hit = ({ hit }: AlgoliaRecord) => {
  const {
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    vote_count,
    cast,
  } = hit;

  return (
    <tr className='grid grid-cols-4 w-full'>
      <td className="px-6 py-4 text-gray-900 font-medium">
        <img src={poster_path} alt={title} className="w-full h-auto" />
      </td>
      <td className="px-6 py-4 text-gray-900">
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{overview}</p>
      </td>
      <td className="px-6 py-4 text-slate-800">
        <p>Release Date: {new Date(release_date).toLocaleDateString()}</p>
        <p>Rating: {vote_average} ({vote_count} votes)</p>
      </td>
      <td className="px-6 py-4">
        <p>Cast:</p>
        <ul>
          {cast.map((actor, index) => (
            <li key={index} className='text-slate-800'>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
       
      </td>
    </tr>
  );
};

const Search = () => (
  <InstantSearch searchClient={AlgoliaClient} indexName="your_index_name">
    <SearchBox className='bg-transparent text-black !outline-none' />
    <div className="">
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr className='grid grid-cols-4 w-full'>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider">
              Poster
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider">
              Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <Hits hitComponent={Hit} />
        </tbody>
      </table>
    </div>
  </InstantSearch>
);

export default Search;
