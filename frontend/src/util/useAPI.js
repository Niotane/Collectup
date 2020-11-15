import { useCallback, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const useAPI = () => {
  const BACKEND_ADDRESS = 'http://localhost:5000';
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const activeRequests = useRef([]);

  const sendRequest = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setIsLoading(true);

      if (body) {
        body = JSON.stringify(body);
      }

      const httpAbortController = new AbortController();
      activeRequests.current.push(httpAbortController);

      // data to be sent to backend
      let requestData = {
        method,
        body,
        headers,
        //signal: httpAbortController.signal,
      };
      try {
        let response = await fetch(BACKEND_ADDRESS + url, requestData);
        const responseData = await response.json();

        if (!response.ok || !responseData) {
          throw new Error('Error while fetching data from backend');
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        throw err;
      }
    },
    [history]
  );

  useEffect(() => {
    return () => {
      activeRequests.current.forEach((request) => {
        request.abort();
      });
    };
  }, []);

  return [sendRequest, isLoading];
};
