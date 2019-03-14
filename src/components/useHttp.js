import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetechedData] = useState(null);

  const fetchData = async () => {

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Could not fetch person!');
      }
      const data = await response.json();
      setIsLoading(false);
      setFetechedData(data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, dependencies);


  return [isLoading, fetchedData];

}