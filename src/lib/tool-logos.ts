// Tool logo URLs using Google Favicon API for real logos
const TOOL_DOMAINS: Record<string, string> = {
  Claude: "claude.ai",
  ChatGPT: "chat.openai.com",
  "Google Docs": "docs.google.com",
  "Google Sheets": "sheets.google.com",
  Notion: "notion.so",
  Slack: "slack.com",
  HubSpot: "hubspot.com",
  Canva: "canva.com",
  Figma: "figma.com",
  Gmail: "gmail.com",
  Excel: "office.com",
  Salesforce: "salesforce.com",
  Zoom: "zoom.us",
  Linear: "linear.app",
};

export function getToolLogoUrl(tool: string, size: number = 32): string {
  const domain = TOOL_DOMAINS[tool];
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function getToolDomain(tool: string): string | undefined {
  return TOOL_DOMAINS[tool];
}

export function hasLogo(tool: string): boolean {
  return tool in TOOL_DOMAINS;
}
