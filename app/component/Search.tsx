"use client";
import React from 'react';
import { AlgoliaClient } from '@/sanity/lib/client';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';

type AlgoliaRecord = {
  hit: {
    firstname: string;
    lastname: string;
    zip_code: number;
    objectID: string;
    _highlightResult: {
      firstname: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
      };
      lastname: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
      zip_code: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
    };
    __position: number;
  };
};

const Hit = ({ hit }: AlgoliaRecord) => {
  const {  lastname, zip_code, _highlightResult } = hit;

  return (
    <tr className='grid grid-cols-4 w-full'>
    
      <td className="px-6 py-4 text-gray-900 font-medium">
        <span dangerouslySetInnerHTML={{ __html: _highlightResult.firstname.value }} />
      </td>

      <td className="px-6 py-4 text-gray-600">
        {lastname}
      </td>

      <td className="px-6 py-4 text-gray-500">
        {zip_code}
      </td>
     
      <td className="px-6 py-4">
        <a href={`/${hit.objectID}`} className="text-blue-600 hover:underline">
          Read more
        </a>
      </td>
    </tr>
  );
};

const Search = () => (
  <InstantSearch searchClient={AlgoliaClient} indexName="data">
    <SearchBox className='bg-transparent text-black !outline-none' />
    <div className="overflow-x-auto">
      <table className=" divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50 w-full ">
          <tr className='grid grid-cols-4 w-full'>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Zip Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 w-full">
          <Hits hitComponent={Hit} />
        </tbody>
      </table>
    </div>
  </InstantSearch>
);

export default Search;
