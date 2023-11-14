import { parseStringPromise } from "xml2js";

type Headers = { [key: string]: string };

type FetchOptions = {
  url: string;
  method?: string;
  headers?: Headers;
  body?: any;
  options?: Object;
};

const ApiClient = {
  post: async (fetchOptions: FetchOptions) => {
    const {
      url,
      method = "POST",
      headers = { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    } = fetchOptions;

    const response = await fetch(`${url}`, {
      method,
      headers: { ...headers },
      body: new URLSearchParams(body),
      ...fetchOptions.options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await parseStringPromise(await response.text(), {
      normalize: true,
      explicitArray: false,
    });
  },
};

export default ApiClient;
