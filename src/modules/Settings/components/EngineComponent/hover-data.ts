export interface IHoverData {
  description: string;
  linkUrl: string;
  wikiUrl: string;
  bangsEngine: string[];
  bangsCategory: string[];
}

export const HOVER_DATA: { [key in string]: IHoverData } = {
  bing: {
    description:
      "Microsoft Bing, commonly referred to as Bing, is a web search engine owned and operated by Microsoft. The service traces its roots back to Microsoft's earlier search engines, including MSN Search, Windows Live Search, and Live Search. Bing offers a broad spectrum of search services, encompassing web, video, image, and map search products, all developed using ASP.NET. (Source: wikipedia)",
    linkUrl: "https://www.bing.com",
    wikiUrl: "wikidata.org/wiki/Q182496",
    bangsEngine: ["!bing", "!bi"],
    bangsCategory: ["!general", "!web"],
  },
  brave: {
    description:
      "Brave is a free and open-source web browser developed by Brave Software, Inc. based on the Chromium web browser. Brave is a privacy-focused browser, which automatically blocks most advertisements and website trackers in its default settings. Users can turn on optional ads that reward them for their attention in the form of Basic Attention Tokens (BAT), which can be used as a cryptocurrency or to make payments to registered websites and content creators. (Source: wikipedia)",
    linkUrl: "https://search.brave.com/",
    wikiUrl: "wikidata.org/wiki/Q22906900",
    bangsEngine: ["!brave", "!br"],
    bangsCategory: ["!general", "!web"],
  },
  duckDuckGo: {
    description:
      "DuckDuckGo is an American software company that offers a number of software products oriented towards helping people protect their privacy online. The company also provides a private search engine, a tracker-blocking browser extension, email protection, and app tracking protection. (Source: wikipedia)",
    linkUrl: "https://duckduckgo.com/",
    wikiUrl: "wikidata.org/wiki/Q12805",
    bangsEngine: ["!duckduckgo", "!ddg"],
    bangsCategory: ["!general", "!web"],
  },
  google: {
    description:
      "Google Search is a search engine operated by Google. It allows users to search for information on the Internet by entering keywords or phrases. Google Search uses algorithms to analyze and rank websites based on their relevance to the search query. It is the most popular search engine worldwide. (Source: wikipedia)",
    linkUrl: "https://google.com/",
    wikiUrl: "wikidata.org/wiki/Q9366",
    bangsEngine: ["!google", "!go"],
    bangsCategory: ["!general", "!web"],
  },
  qwant: {
    description:
      "Qwant is a French search engine that launched in February 2013. Qwant claims to respect the privacy of its users by not tracking them for advertising purposes or reselling their personal data, as well as being unbiased in the display of results. (Source: wikipedia)",
    linkUrl: "https://www.qwant.com/",
    wikiUrl: "wikidata.org/wiki/Q14657870",
    bangsEngine: ["!qwant", "!qw"],
    bangsCategory: ["!general", "!web"],
  },
  yahoo: {
    description:
      "The search engine that helps you find exactly what you're looking for. Find the most relevant information, video, images, and answers from all across the Web. (Source: https://search.yahoo.com/)",
    linkUrl: "https://search.yahoo.com/",
    wikiUrl: "",
    bangsEngine: ["!yahoo", "!yh"],
    bangsCategory: ["!general", "!web"],
  },
};
