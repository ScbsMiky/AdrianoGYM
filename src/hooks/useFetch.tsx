import { Request } from "../libs/request";

import { useEffect, useState } from "react";

export type UseRequestResponse<T> = {
  data: T;
  error: string;
  loading: boolean;
  setLoading: (data: boolean) => void;
  fetch: (options?: Partial<Request.RequestOptions>) => Promise<void>;
};

export default function useRequest<T>(options: Request.RequestOptions & { initializer: T, autoFetch?: boolean }): UseRequestResponse<T> {
  const [error, setError] = useState("");
  const [data, setData] = useState<T>(options.initializer as T);

  const [loading, setLoading] = useState(true);

  const handleFetch = async (options: Request.RequestOptions) => {
    setError("");
    setLoading(true);

    return Request.request(options).then((data) => {
      if(data.error) {
        setError(data.error);

        return;
      };

      setData(data);
    }).catch((error) => {
      setError(error.message);
    }).finally(( ) => setLoading(false));
  };
  
  useEffect(( ) => {
    if(options.autoFetch) {
      handleFetch(options)
    };
  }, []);

  return {
    data,
    error,
    loading,
    setLoading: (data) => setLoading(data),
    fetch: (_options = { }) => handleFetch({ ...options, ..._options })
  };
};
