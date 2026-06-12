export type NewsSourceKind = "Official" | "Industry";

export type NewsSource = {
  id: string;
  name: string;
  homepage: string;
  kind: NewsSourceKind;
};

export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  href: string;
  publishedAt: string;
  source: NewsSource;
  author?: string;
  category?: string;
};

export type NewsFeedResult = {
  articles: NewsArticle[];
  availableSources: NewsSource[];
  unavailableSources: NewsSource[];
  updatedAt: string;
};
