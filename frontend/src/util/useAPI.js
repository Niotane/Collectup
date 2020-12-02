import { useCallback, useEffect, useRef } from 'react';

const useAPI = () => {
  const BACKEND_ADDRESS = 'https://oxford-hackathon.el.r.appspot.com';
  // const BACKEND_ADDRESS = 'http://localhost:8080';
  const activeRequests = useRef([]);

  const sendRequest = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
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
        signal: httpAbortController.signal,
      };
      try {
        let response = await fetch(BACKEND_ADDRESS + url, requestData);
        const responseData = await response.json();

        if (!response.ok || !responseData) {
          throw new Error('Error while fetching data from backend');
        }

        return responseData;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    const curr = activeRequests.current;
    return () => {
      curr.forEach((request) => {
        request.abort();
      });
    };
  }, []);

  return [sendRequest];
};

export default useAPI;
