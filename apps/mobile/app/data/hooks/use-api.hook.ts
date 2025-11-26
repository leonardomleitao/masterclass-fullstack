import { useCallback } from "react";
import useSession from "./use-session.hook";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useAPI() {
  const { token } = useSession();

  const httpGet = useCallback(
    async function (path: string) {
      const uri = path.startsWith("/") ? path : `/${path}`;
      const fullUrl = `${BASE_URL}${uri}`;

      const response = await fetch(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return extractData(response);
    },
    [token]
  );

  const httpPost = useCallback(
    async function (path: string, body: any) {
      const uri = path.startsWith("/") ? path : `/${path}`;
      const fullUrl = `${BASE_URL}${uri}`;

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      return extractData(response);
    },
    [token]
  );

  const httpDelete = useCallback(
    async function (path: string) {
      const uri = path.startsWith("/") ? path : `/${path}`;
      const fullUrl = `${BASE_URL}${uri}`;
      const response = await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return extractData(response);
    },
    [token]
  );

  async function extractData(response: Response) {
    let content: any;
    try {
      content = await response.text();
      content = JSON.parse(content);
      if (content?.statusCode >= 400) throw content;
      return content;
    } catch {
      if (content?.statusCode >= 400) throw content;
      return content;
    }
  }

  return { httpGet, httpPost, httpDelete };
}
