import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrors(null);

      const result = await fetchFunction();

      setData(result);
    } catch (error) {
      setErrors(error instanceof Error ? error : new Error("An error occured"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setErrors(null);
    setData(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, errors, refetch: fetchData, reset };
};

export default useFetch;
