import contentData from "@/content.json";

export type SiteContent = typeof contentData;

export function getContent(): SiteContent {
  return contentData;
}
