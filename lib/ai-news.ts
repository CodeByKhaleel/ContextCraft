import "server-only";

import { XMLParser } from "fast-xml-parser";
import type { NewsArticle, NewsFeedResult, NewsSource } from "@/types/news";

type FeedDefinition = NewsSource & {
  feedUrl: string;
  format: "rss" | "atom";
};

type UnknownRecord = Record<string, unknown>;

const feeds: FeedDefinition[] = [
  {
    id: "openai",
    name: "OpenAI",
    homepage: "https://openai.com/news/",
    feedUrl: "https://openai.com/news/rss.xml",
    kind: "Official",
    format: "rss",
  },
  {
    id: "google-ai",
    name: "Google AI",
    homepage: "https://blog.google/technology/ai/",
    feedUrl: "https://blog.google/technology/ai/rss/",
    kind: "Official",
    format: "rss",
  },
  {
    id: "hugging-face",
    name: "Hugging Face",
    homepage: "https://huggingface.co/blog",
    feedUrl: "https://huggingface.co/blog/feed.xml",
    kind: "Official",
    format: "rss",
  },
  {
    id: "techcrunch",
    name: "TechCrunch AI",
    homepage: "https://techcrunch.com/category/artificial-intelligence/",
    feedUrl: "https://techcrunch.com/category/artificial-intelligence/feed/",
    kind: "Industry",
    format: "rss",
  },
  {
    id: "venturebeat",
    name: "VentureBeat AI",
    homepage: "https://venturebeat.com/category/ai/",
    feedUrl: "https://venturebeat.com/category/ai/feed/",
    kind: "Industry",
    format: "rss",
  },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  processEntities: true,
});

export async function getLatestAiNews(): Promise<NewsFeedResult> {
  const settledFeeds = await Promise.allSettled(feeds.map(fetchFeed));
  const availableSources: NewsSource[] = [];
  const unavailableSources: NewsSource[] = [];
  const articles: NewsArticle[] = [];

  settledFeeds.forEach((result, index) => {
    const source = toPublicSource(feeds[index]);

    if (result.status === "fulfilled") {
      availableSources.push(source);
      articles.push(...result.value);
    } else {
      unavailableSources.push(source);
      console.error(`AI news feed failed: ${source.name}`, result.reason);
    }
  });

  const uniqueArticles = Array.from(
    new Map(
      articles
        .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        .map((article) => [article.href, article]),
    ).values(),
  ).slice(0, 36);

  return {
    articles: uniqueArticles,
    availableSources,
    unavailableSources,
    updatedAt: new Date().toISOString(),
  };
}

async function fetchFeed(feed: FeedDefinition): Promise<NewsArticle[]> {
  const response = await fetch(feed.feedUrl, {
    headers: {
      Accept: "application/atom+xml, application/rss+xml, application/xml, text/xml",
      "User-Agent": "ContextCraft AI News Reader/1.0",
    },
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const parsed = parser.parse(await response.text()) as UnknownRecord;
  const source = toPublicSource(feed);

  if (feed.format === "atom") {
    const atomFeed = asRecord(parsed.feed);
    return asArray(atomFeed.entry)
      .map((entry, index) => parseAtomEntry(asRecord(entry), source, index))
      .filter(isNewsArticle);
  }

  const channel = asRecord(asRecord(parsed.rss).channel);
  return asArray(channel.item)
    .map((item, index) => parseRssItem(asRecord(item), source, index))
    .filter(isNewsArticle);
}

function parseRssItem(
  item: UnknownRecord,
  source: NewsSource,
  index: number,
): NewsArticle | null {
  const title = cleanText(readText(item.title));
  const href = safeUrl(readText(item.link) || readText(item.guid));
  const publishedAt = parseDate(readText(item.pubDate) || readText(item.date));

  if (!title || !href || !publishedAt) return null;

  return {
    id: `${source.id}-${index}-${publishedAt}`,
    title,
    href,
    publishedAt,
    source,
    description: summarize(
      readText(item.description) || readText(item["content:encoded"]),
    ),
    author: optionalText(readText(item["dc:creator"]) || readText(item.author)),
    category: optionalText(readFirstText(item.category)),
  };
}

function parseAtomEntry(
  entry: UnknownRecord,
  source: NewsSource,
  index: number,
): NewsArticle | null {
  const title = cleanText(readText(entry.title));
  const href = safeUrl(readAtomLink(entry.link));
  const publishedAt = parseDate(readText(entry.published) || readText(entry.updated));

  if (!title || !href || !publishedAt) return null;

  return {
    id: `${source.id}-${index}-${publishedAt}`,
    title,
    href,
    publishedAt,
    source,
    description: summarize(readText(entry.summary) || readText(entry.content)),
    author: optionalText(readText(asRecord(entry.author).name)),
    category: optionalText(readAtomCategory(entry.category)),
  };
}

function readAtomLink(value: unknown): string {
  const links = asArray(value).map(asRecord);
  const preferred =
    links.find((link) => link["@_rel"] === "alternate") ??
    links.find((link) => !link["@_rel"]) ??
    links[0];

  return readText(preferred?.["@_href"]) || readText(value);
}

function readAtomCategory(value: unknown): string {
  const category = asRecord(asArray(value)[0]);
  return readText(category["@_term"]) || readText(category);
}

function readFirstText(value: unknown): string {
  return readText(asArray(value)[0]);
}

function readText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return readText(value[0]);
  }

  if (value && typeof value === "object") {
    const record = value as UnknownRecord;
    return readText(record["#text"] ?? record.__cdata ?? record["@_href"] ?? "");
  }

  return "";
}

function cleanText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#8216;|&#x2018;/gi, "'")
    .replace(/&#8217;|&#x2019;/gi, "'")
    .replace(/&#8220;|&#x201c;/gi, '"')
    .replace(/&#8221;|&#x201d;/gi, '"')
    .replace(/&#8211;|&#x2013;/gi, "-")
    .replace(/&#8212;|&#x2014;/gi, "-")
    .replace(/&#160;|&#x00a0;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function summarize(value: string): string {
  const text = cleanText(value);
  if (text.length <= 220) return text;
  return `${text.slice(0, 217).trimEnd()}...`;
}

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function parseDate(value: string): string {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? "" : new Date(timestamp).toISOString();
}

function optionalText(value: string): string | undefined {
  const text = cleanText(value);
  return text || undefined;
}

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function asArray(value: unknown): unknown[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function isNewsArticle(article: NewsArticle | null): article is NewsArticle {
  return article !== null;
}

function toPublicSource(feed: FeedDefinition): NewsSource {
  return {
    id: feed.id,
    name: feed.name,
    homepage: feed.homepage,
    kind: feed.kind,
  };
}
