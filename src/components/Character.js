import React, { Component, useState, useEffect } from 'react';
import { useHttp } from './useHttp';

import Summary from './Summary';

const Character = props => {

  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar])

  useEffect(() => {
    return () => {
      console.log('destroy');
    }
  }, []);
  console.log('fetchedData:', fetchedData)
  let loadedCharacter = null;
  if (fetchedData) {

    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }


  let content = <p>Loading Character...</p>;
  console.log(props.selectedChar);

  if (!isLoading && loadedCharacter && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && loadedCharacter && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

export default React.memo(Character, (prevProps, nextProps) => {
  console.log('prevProps:', prevProps, 'nextProps: ', nextProps);


  return prevProps.selectedChar === nextProps.selectedChar;
});


/*   shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return (
      nextProps.selectedChar !== this.props.selectedChar ||
      nextloadedCharacter.id !== state.loadedCharacter.id ||
      nextState.isLoading !== state.isLoading
    );
  } */

/* componentDidUpdate(prevProps) {
  console.log('Component did update');
  if (prevProps.selectedChar !== this.props.selectedChar) {
    this.fetchData();
  }
} */
