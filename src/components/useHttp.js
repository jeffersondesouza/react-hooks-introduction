import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetechedData] = useState(null);


  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(data => {
        console.log('data:', data)
        setIsLoading(false);
        setFetechedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);


  return [isLoading, fetchedData];

}