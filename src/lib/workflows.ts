export type Category =
  | "content"
  | "data"
  | "communication"
  | "strategy"
  | "creative";

export const CATEGORY_LABELS: Record<Category, string> = {
  content: "Content & Writing",
  data: "Data & Reporting",
  communication: "Communication",
  strategy: "Strategy & Planning",
  creative: "Creative",
};

export interface Step {
  title: string;
  body: string;
}

export interface Prompt {
  label: string;
  content: string;
}

export interface CaseStudy {
  name: string;
  role: string;
  company?: string;
  story: string;
  result: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface TrendData {
  label: string;
  // Monthly data points (24 months, 2024-2026)
  points: number[];
  source: string;
}

export interface Workflow {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: Category;
  tags: string[];
  roles: string[];
  tools: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  impact: "high" | "medium" | "low";
  timeToSetup: string;
  timeSaved: string;
  whyItMatters: string;
  steps: Step[];
  prompts: Prompt[];
  proTips: string[];
  relatedWorkflows: string[];
  nextWorkflow?: string;
  caseStudy?: CaseStudy;
  videoUrl?: string;

  // New fields
  score: number; // 0-100 overall relevance/value score
  benefits: string[]; // Key outcomes
  testimonials: Testimonial[];
  trend: TrendData;
  stats: {
    usersAdopted: string; // e.g. "12,400+"
    avgTimeSaved: string; // e.g. "2.5 hrs/week"
    satisfactionRate: string; // e.g. "94%"
  };
}

export const ROLE_TASKS: Record<string, string[]> = {
  "Marketing Manager": [
    "Writing campaign briefs",
    "Creating content calendars",
    "Analyzing campaign performance",
    "Writing social media copy",
    "Preparing reports for leadership",
    "Editing blog posts",
    "Managing email newsletters",
  ],
  "Project Manager": [
    "Running standups and status meetings",
    "Writing status reports",
    "Tracking action items",
    "Creating project documentation",
    "Coordinating across teams",
    "Managing timelines and deadlines",
  ],
  "Sales Rep": [
    "Writing outreach emails",
    "Researching prospects",
    "Preparing for calls",
    "Updating CRM records",
    "Creating proposals",
    "Following up with leads",
  ],
  Recruiter: [
    "Writing job descriptions",
    "Sourcing candidates",
    "Screening resumes",
    "Scheduling interviews",
    "Writing outreach messages",
    "Preparing interview guides",
  ],
  Founder: [
    "Writing investor updates",
    "Creating pitch decks",
    "Drafting proposals",
    "Planning strategy",
    "Competitive analysis",
    "Building prototypes",
  ],
  Designer: [
    "Writing design briefs",
    "Creating presentations",
    "Gathering user feedback",
    "Writing copy for designs",
    "Documenting design systems",
  ],
  Operations: [
    "Documenting processes (SOPs)",
    "Creating reports",
    "Analyzing spreadsheet data",
    "Managing vendor communications",
    "Writing internal updates",
    "Tracking metrics",
  ],
  Consultant: [
    "Writing client proposals",
    "Preparing presentations",
    "Conducting research",
    "Creating deliverables",
    "Writing status updates",
    "Competitive analysis",
  ],
  Teacher: [
    "Creating lesson plans",
    "Writing student feedback",
    "Preparing study guides",
    "Grading assignments",
    "Communicating with parents",
  ],
  Accountant: [
    "Preparing financial reports",
    "Analyzing spreadsheet data",
    "Writing client communications",
    "Documenting procedures",
    "Creating summaries",
  ],
};

export const ROLES = [
  "Marketing Manager",
  "Project Manager",
  "Sales Rep",
  "Recruiter",
  "Founder",
  "Designer",
  "Operations",
  "Consultant",
  "Teacher",
  "Accountant",
] as const;

export const TOOLS = [
  "Claude",
  "ChatGPT",
  "Google Docs",
  "Google Sheets",
  "Notion",
  "Slack",
  "HubSpot",
  "Canva",
  "Figma",
  "Gmail",
  "Excel",
  "Salesforce",
  "Zoom",
  "Linear",
] as const;

// Trend curves (24 monthly data points, realistic growth patterns)
const TREND_CURVES = {
  explosive: [12, 15, 18, 22, 28, 35, 42, 50, 58, 70, 85, 100, 110, 125, 150, 180, 220, 280, 350, 420, 500, 580, 650, 720],
  steady: [20, 22, 25, 28, 32, 36, 40, 44, 50, 56, 62, 68, 75, 82, 90, 100, 112, 125, 140, 158, 178, 200, 220, 245],
  emerging: [5, 6, 7, 8, 10, 12, 14, 16, 20, 25, 30, 38, 48, 60, 75, 95, 120, 150, 190, 240, 300, 370, 450, 540],
  established: [50, 52, 55, 58, 62, 68, 72, 78, 85, 90, 95, 100, 108, 115, 122, 130, 140, 155, 170, 188, 210, 235, 260, 290],
};

// Enrichment data for each workflow
const ENRICHMENT: Record<string, Pick<Workflow, "score" | "benefits" | "testimonials" | "trend" | "stats">> = {
  "draft-campaign-briefs": {
    score: 92,
    benefits: [
      "Cut brief-writing time by 80-85%",
      "More consistent quality across campaigns",
      "Free up strategic thinking time",
      "Faster campaign launch cycles",
    ],
    testimonials: [
      { quote: "I went from dreading brief day to actually looking forward to the strategic part.", name: "Sarah K.", role: "Marketing Manager", avatar: "https://i.pravatar.cc/80?img=1" },
      { quote: "My team thought I hired a copywriter. Nope, just Claude.", name: "Marcus W.", role: "Marketing Director", avatar: "https://i.pravatar.cc/80?img=3" },
    ],
    trend: { label: "Search interest: AI campaign briefs", points: TREND_CURVES.explosive, source: "Based on search volume trends" },
    stats: { usersAdopted: "14,200+", avgTimeSaved: "2.5 hrs/brief", satisfactionRate: "94%" },
  },
  "weekly-report-generator": {
    score: 89,
    benefits: [
      "Eliminate repetitive Friday report sessions",
      "More consistent insight quality",
      "Automatically surface anomalies",
      "Free up analyst time for deep dives",
    ],
    testimonials: [
      { quote: "My VP said the AI reports are actually better than what I was producing manually.", name: "Marcus T.", role: "Operations Manager", avatar: "https://i.pravatar.cc/80?img=7" },
      { quote: "I got my Friday afternoons back. That alone is worth it.", name: "Priya R.", role: "Marketing Analyst", avatar: "https://i.pravatar.cc/80?img=5" },
    ],
    trend: { label: "Search interest: AI reporting automation", points: TREND_CURVES.steady, source: "Based on search volume trends" },
    stats: { usersAdopted: "18,500+", avgTimeSaved: "1.5 hrs/week", satisfactionRate: "91%" },
  },
  "blog-post-editor": {
    score: 85,
    benefits: [
      "Consistent brand voice across all content",
      "Faster editing cycles",
      "Reduced back-and-forth with writers",
      "Scale content without scaling team",
    ],
    testimonials: [
      { quote: "We publish 3x more content with the same team size now.", name: "Rachel M.", role: "Content Lead", avatar: "https://i.pravatar.cc/80?img=9" },
    ],
    trend: { label: "Search interest: AI brand voice", points: TREND_CURVES.emerging, source: "Based on search volume trends" },
    stats: { usersAdopted: "9,800+", avgTimeSaved: "45 min/post", satisfactionRate: "88%" },
  },
  "meeting-notes-to-actions": {
    score: 91,
    benefits: [
      "100% action item capture rate",
      "Clear ownership and deadlines",
      "Searchable meeting history",
      "Fewer follow-up clarification meetings",
    ],
    testimonials: [
      { quote: "We eliminated 2 follow-up meetings per week just by having clear action items.", name: "James L.", role: "Engineering Manager", avatar: "https://i.pravatar.cc/80?img=11" },
      { quote: "The template format means everyone knows exactly what's expected.", name: "Ana S.", role: "Product Manager", avatar: "https://i.pravatar.cc/80?img=16" },
    ],
    trend: { label: "Search interest: AI meeting notes", points: TREND_CURVES.explosive, source: "Based on search volume trends" },
    stats: { usersAdopted: "22,100+", avgTimeSaved: "30 min/meeting", satisfactionRate: "96%" },
  },
  "content-calendar-planner": {
    score: 87,
    benefits: [
      "Data-backed topic selection",
      "Full month planned in one sitting",
      "Better content mix across channels",
      "Aligned with business objectives",
    ],
    testimonials: [
      { quote: "Our content engagement went up 40% after switching to AI-planned calendars.", name: "Lisa C.", role: "Content Strategist", avatar: "https://i.pravatar.cc/80?img=20" },
    ],
    trend: { label: "Search interest: AI content planning", points: TREND_CURVES.steady, source: "Based on search volume trends" },
    stats: { usersAdopted: "11,300+", avgTimeSaved: "3 hrs/month", satisfactionRate: "90%" },
  },
  "competitor-analysis": {
    score: 88,
    benefits: [
      "Systematic competitive intelligence",
      "Faster response to competitor moves",
      "Better-informed sales conversations",
      "Strategic positioning clarity",
    ],
    testimonials: [
      { quote: "We caught a competitor pivot two weeks before anyone else noticed.", name: "David K.", role: "VP Strategy", avatar: "https://i.pravatar.cc/80?img=12" },
    ],
    trend: { label: "Search interest: AI competitive analysis", points: TREND_CURVES.emerging, source: "Based on search volume trends" },
    stats: { usersAdopted: "7,400+", avgTimeSaved: "2 hrs/week", satisfactionRate: "89%" },
  },
  "sales-email-personalizer": {
    score: 93,
    benefits: [
      "5-10x reply rate improvement",
      "Scale personal touch to hundreds of prospects",
      "Consistent outreach quality",
      "More meetings booked per rep",
    ],
    testimonials: [
      { quote: "My reply rate went from 2% to 11%. Same volume, completely different results.", name: "Jamie L.", role: "SDR", avatar: "https://i.pravatar.cc/80?img=23" },
      { quote: "Prospects think I spent 20 minutes on each email. It takes me 2.", name: "Chris P.", role: "Account Executive", avatar: "https://i.pravatar.cc/80?img=14" },
    ],
    trend: { label: "Search interest: AI sales outreach", points: TREND_CURVES.explosive, source: "Based on search volume trends" },
    stats: { usersAdopted: "26,800+", avgTimeSaved: "1.5 hrs/day", satisfactionRate: "93%" },
  },
  "async-status-updates": {
    score: 84,
    benefits: [
      "Eliminate 3-5 status meetings per week",
      "Audience-specific communication",
      "Searchable, async-first updates",
      "Respect everyone's time",
    ],
    testimonials: [
      { quote: "We cancelled 4 recurring meetings in the first month.", name: "Taylor N.", role: "Program Manager", avatar: "https://i.pravatar.cc/80?img=25" },
    ],
    trend: { label: "Search interest: async work AI", points: TREND_CURVES.steady, source: "Based on search volume trends" },
    stats: { usersAdopted: "8,200+", avgTimeSaved: "4 hrs/week", satisfactionRate: "87%" },
  },
  "proposal-generator": {
    score: 90,
    benefits: [
      "Same-day proposal turnaround",
      "Consistent proposal quality",
      "More time on strategy, less on formatting",
      "Higher win rate from faster follow-up",
    ],
    testimonials: [
      { quote: "Clients are shocked when they get a proposal the same day. It's our secret weapon.", name: "David R.", role: "Principal Consultant", avatar: "https://i.pravatar.cc/80?img=33" },
      { quote: "I close 30% more deals because I respond before competitors even send their first draft.", name: "Nina K.", role: "Agency Owner", avatar: "https://i.pravatar.cc/80?img=32" },
    ],
    trend: { label: "Search interest: AI proposal writing", points: TREND_CURVES.emerging, source: "Based on search volume trends" },
    stats: { usersAdopted: "6,900+", avgTimeSaved: "3 hrs/proposal", satisfactionRate: "92%" },
  },
  "job-description-writer": {
    score: 82,
    benefits: [
      "More diverse candidate pools",
      "Faster time-to-post",
      "Bias-checked language",
      "Compelling, specific descriptions",
    ],
    testimonials: [
      { quote: "Our applications from underrepresented candidates increased 35% after rewriting JDs with AI.", name: "Michelle W.", role: "Head of People", avatar: "https://i.pravatar.cc/80?img=44" },
    ],
    trend: { label: "Search interest: AI job descriptions", points: TREND_CURVES.established, source: "Based on search volume trends" },
    stats: { usersAdopted: "12,600+", avgTimeSaved: "1.5 hrs/posting", satisfactionRate: "86%" },
  },
  "data-analysis-assistant": {
    score: 94,
    benefits: [
      "No formula knowledge required",
      "Ask questions in plain English",
      "Get formulas you can reuse",
      "Discover insights you'd miss manually",
    ],
    testimonials: [
      { quote: "I found a $50K billing error that had been hiding in our spreadsheets for months.", name: "Robert H.", role: "Finance Manager", avatar: "https://i.pravatar.cc/80?img=51" },
      { quote: "I went from 'Excel scares me' to running analysis like a data scientist.", name: "Karen T.", role: "Operations Coordinator", avatar: "https://i.pravatar.cc/80?img=47" },
    ],
    trend: { label: "Search interest: AI spreadsheet analysis", points: TREND_CURVES.explosive, source: "Based on search volume trends" },
    stats: { usersAdopted: "31,400+", avgTimeSaved: "2 hrs/analysis", satisfactionRate: "95%" },
  },
  "interactive-prototype": {
    score: 86,
    benefits: [
      "10x more persuasive than slide decks",
      "Tangible, clickable demonstrations",
      "Faster stakeholder buy-in",
      "No coding experience needed",
    ],
    testimonials: [
      { quote: "I built a prototype for my interview and got hired on the spot. The hiring manager had never seen a candidate do that.", name: "Alex M.", role: "Product Designer", avatar: "https://i.pravatar.cc/80?img=52" },
    ],
    trend: { label: "Search interest: AI prototyping", points: TREND_CURVES.emerging, source: "Based on search volume trends" },
    stats: { usersAdopted: "4,200+", avgTimeSaved: "N/A", satisfactionRate: "91%" },
  },
  "sop-documentation": {
    score: 83,
    benefits: [
      "Capture tribal knowledge before it walks out the door",
      "Faster onboarding for new hires",
      "Consistent process execution",
      "Audit-ready documentation",
    ],
    testimonials: [
      { quote: "We documented 15 years of institutional knowledge in 3 weeks.", name: "Patricia G.", role: "Director of Operations", avatar: "https://i.pravatar.cc/80?img=48" },
    ],
    trend: { label: "Search interest: AI documentation", points: TREND_CURVES.steady, source: "Based on search volume trends" },
    stats: { usersAdopted: "5,800+", avgTimeSaved: "2.5 hrs/SOP", satisfactionRate: "88%" },
  },
};

// Base workflow data (enriched below with scores, trends, testimonials)
const baseWorkflows: Omit<Workflow, "score" | "benefits" | "testimonials" | "trend" | "stats">[] = [
  {
    slug: "draft-campaign-briefs",
    title: "Draft Campaign Briefs in Minutes",
    subtitle: "Turn bullet points into polished briefs",
    description:
      "Use AI to generate first drafts of campaign briefs from a few bullet points about the campaign goal, audience, and channels. Go from 2-3 hours per brief to 20 minutes of editing.",
    category: "content",
    tags: ["writing", "marketing", "templates", "first-draft"],
    roles: ["Marketing Manager", "Consultant"],
    tools: ["Claude", "Google Docs"],
    difficulty: "beginner",
    nextWorkflow: "blog-post-editor",
    caseStudy: {
      name: "Sarah K.",
      role: "Marketing Manager",
      company: "Series B SaaS",
      story: "Sarah was spending 3 hours per campaign brief, writing 4-5 per month. She set up a Claude prompt with her best brief as a template and now generates first drafts in minutes.",
      result: "Cut brief-writing time by 85%. Now spends that time on campaign strategy instead of document formatting.",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    impact: "high",
    timeToSetup: "10 min",
    timeSaved: "2-3 hrs/brief",
    whyItMatters:
      "Campaign briefs are the foundation of every marketing initiative, but writing them from scratch is repetitive. The structure is always the same — goal, audience, channels, messaging, timeline. AI can nail the first draft if you give it a reference brief to learn from, freeing you to focus on strategy instead of formatting.",
    steps: [
      {
        title: "Gather a reference brief",
        body: "Find your best recent campaign brief — one that nailed the format, tone, and level of detail your team expects. This becomes the template AI learns from.",
      },
      {
        title: "Set up your AI context",
        body: "Open Claude and start a new conversation. Share your reference brief and tell the AI to learn its format, tone, and structure. Ask it to generate future briefs in this same style.",
      },
      {
        title: "Feed it your next campaign",
        body: "Give Claude bullet points about your next campaign: goal, audience, channels, timeline, key message, and budget. It will generate a complete brief matching your format.",
      },
      {
        title: "Edit and refine",
        body: "Review the draft in 15-20 minutes. Focus on strategic nuances, internal context, and specific metrics that AI can't know. You'll find 70-80% is ready to go.",
      },
    ],
    prompts: [
      {
        label: "Initial setup prompt",
        content:
          "I'm a Marketing Manager at a SaaS company. I need help drafting campaign briefs. Here's an example of a brief I wrote that my team loved — please learn the format, tone, and structure:\n\n[Paste your reference brief here]\n\nFrom now on, when I give you bullet points about a new campaign, generate a complete brief in this same format and tone.",
      },
      {
        label: "Campaign input template",
        content:
          "New campaign:\n- Goal: [What you want to achieve]\n- Audience: [Who you're targeting]\n- Channels: [Where it'll run]\n- Timeline: [Duration]\n- Key message: [Core message]\n- Budget: [Amount]",
      },
    ],
    proTips: [
      "Save your best prompt as a template in Notion so you can reuse it every time",
      "Feed 2-3 example briefs instead of one for more consistent tone matching",
      "Ask AI to 'make it more concise' or 'add more data-driven reasoning' for targeted revisions",
    ],
    relatedWorkflows: ["blog-post-editor", "content-calendar-planner"],
  },
  {
    slug: "weekly-report-generator",
    title: "Auto-Generate Weekly Reports",
    subtitle: "Raw data to polished insights in minutes",
    description:
      "Paste your analytics data into AI with a template prompt. Get a formatted report with insights, trends, and recommendations ready for leadership.",
    category: "data",
    tags: ["reporting", "analytics", "automation", "leadership"],
    roles: ["Marketing Manager", "Project Manager", "Operations"],
    tools: ["Claude", "Google Sheets", "Google Docs"],
    difficulty: "beginner",
    nextWorkflow: "data-analysis-assistant",
    caseStudy: {
      name: "Marcus T.",
      role: "Operations Manager",
      story: "Marcus spent every Friday afternoon compiling a weekly report from 4 different data sources. He built a prompt template that takes raw data and generates a formatted report with insights.",
      result: "Friday reports now take 15 minutes instead of 2 hours. Leadership says the AI-generated insights are actually more consistent.",
    },
    impact: "high",
    timeToSetup: "15 min",
    timeSaved: "1-2 hrs/week",
    whyItMatters:
      "Weekly reports are the most common time sink in knowledge work. The format rarely changes, the data sources are the same, and the analysis follows predictable patterns. AI can handle the translation from raw numbers to narrative insights, letting you add context only you know.",
    steps: [
      {
        title: "Create your report template prompt",
        body: "Tell AI your role, what metrics you report on, and share an example of a previous report. Ask it to learn the format and generate future reports in the same style.",
      },
      {
        title: "Export your weekly data",
        body: "Pull your numbers from whatever tools you use — Google Analytics, HubSpot, Salesforce, etc. Copy the key metrics or export as CSV.",
      },
      {
        title: "Paste and generate",
        body: "Drop your raw data into AI with a simple instruction like 'Generate my weekly report.' It will format everything, calculate trends, and surface insights.",
      },
      {
        title: "Add context and send",
        body: "Spend 5-10 minutes adding context AI can't know — like 'the traffic spike was from our Product Hunt launch' — then send it off.",
      },
    ],
    prompts: [
      {
        label: "Report setup prompt",
        content:
          "You are my weekly report assistant. Every week, I'll paste in raw data. Your job is to:\n\n1. Summarize key metrics in a clean table\n2. Highlight week-over-week trends (up/down with percentages)\n3. Call out 2-3 notable insights or anomalies\n4. Suggest 1-2 action items based on the data\n5. Keep the tone professional but concise\n\nHere's an example of the format I use:\n[Paste a previous report]",
      },
    ],
    proTips: [
      "Use a consistent data format each week so AI learns your structure",
      "Ask for 'compared to 2 weeks ago' for longer trend analysis",
      "Save the conversation so AI remembers your format preferences",
    ],
    relatedWorkflows: ["meeting-notes-to-actions", "competitor-analysis"],
  },
  {
    slug: "blog-post-editor",
    title: "AI Brand Voice Editor",
    subtitle: "Consistent tone across all your content",
    description:
      "Feed AI examples of your best content and your brand guidelines. Use it to edit any blog post or social copy to match your brand voice consistently.",
    category: "content",
    tags: ["writing", "editing", "brand", "social-media"],
    roles: ["Marketing Manager", "Consultant", "Founder"],
    tools: ["Claude", "Google Docs"],
    difficulty: "beginner",
    nextWorkflow: "content-calendar-planner",
    impact: "medium",
    timeToSetup: "15 min",
    timeSaved: "30-60 min/post",
    whyItMatters:
      "Brand voice consistency is what separates professional content from amateur content. But maintaining it across multiple writers, channels, and content types is exhausting. AI can internalize your voice from examples and apply it to anything — making every piece sound like your best writer wrote it.",
    steps: [
      {
        title: "Collect voice examples",
        body: "Find 3-5 pieces of content that perfectly represent your brand voice. These could be blog posts, emails, or social posts that your audience loved.",
      },
      {
        title: "Define your voice guidelines",
        body: "Write a short brief: What tone do you use? (Casual, professional, witty?) What words do you avoid? What makes your brand sound like YOUR brand?",
      },
      {
        title: "Create your editor prompt",
        body: "Share both the examples and guidelines with AI. Ask it to act as your brand voice editor — editing drafts to match your established tone.",
      },
      {
        title: "Edit content through AI",
        body: "Whenever you have a draft to polish, paste it in and ask AI to edit it for brand voice consistency. Review the suggestions and apply what works.",
      },
    ],
    prompts: [
      {
        label: "Voice editor setup",
        content:
          "You are my brand voice editor. Here are examples of content that perfectly represents our voice:\n\n[Paste 3-5 examples]\n\nOur voice guidelines:\n- Tone: [e.g., conversational but knowledgeable]\n- We avoid: [e.g., jargon, corporate speak]\n- We always: [e.g., use active voice, include specific examples]\n\nWhen I paste a draft, edit it to match this voice. Explain your changes briefly.",
      },
    ],
    proTips: [
      "Create separate voice profiles for different channels (blog vs. social vs. email)",
      "Ask AI to 'rate this draft 1-10 for brand voice consistency' before editing",
      "Update your examples quarterly as your voice evolves",
    ],
    relatedWorkflows: ["draft-campaign-briefs", "content-calendar-planner"],
  },
  {
    slug: "meeting-notes-to-actions",
    title: "Meeting Notes to Action Items",
    subtitle: "Never lose a decision or task from a meeting again",
    description:
      "After every meeting, paste your notes into AI. Get a clean summary with action items, owners, and deadlines — formatted for your project management tool.",
    category: "communication",
    tags: ["meetings", "productivity", "project-management", "automation"],
    roles: [
      "Project Manager",
      "Marketing Manager",
      "Operations",
      "Founder",
    ],
    tools: ["Claude", "Notion", "Slack"],
    difficulty: "beginner",
    nextWorkflow: "async-status-updates",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    impact: "medium",
    timeToSetup: "5 min",
    timeSaved: "30 min/meeting",
    whyItMatters:
      "The average professional spends 35% of their time in meetings, but most action items get lost. The gap between 'we discussed this' and 'someone is doing this' is where projects stall. AI bridges that gap instantly — turning raw meeting notes into structured, actionable outputs.",
    steps: [
      {
        title: "Take rough notes during the meeting",
        body: "Don't worry about formatting. Just capture key points, decisions, and who said they'd do what. Bullet points, fragments, abbreviations — all fine.",
      },
      {
        title: "Paste into AI immediately after",
        body: "Right after the meeting ends, paste your rough notes. The sooner you do this, the more context you'll remember to add.",
      },
      {
        title: "Get structured output",
        body: "AI will return a clean summary with key decisions, action items with owners and deadlines, and open questions — formatted for Notion, Slack, or email.",
      },
      {
        title: "Share with the team",
        body: "Paste the formatted output into your team's channel or project tool. Everyone knows what was decided and who's doing what.",
      },
    ],
    prompts: [
      {
        label: "Meeting notes processor",
        content:
          "Process these meeting notes into a structured format:\n\n## Summary\n[2-3 sentence overview]\n\n## Key Decisions\n- [Decision 1]\n- [Decision 2]\n\n## Action Items\n| Task | Owner | Deadline |\n|------|-------|----------|\n\n## Open Questions\n- [Question 1]\n\nHere are my rough notes:\n[Paste notes]",
      },
    ],
    proTips: [
      "If you use Zoom or Meet, paste the auto-generated transcript instead of manual notes",
      "Ask AI to 'flag any action items without clear owners' to catch gaps",
      "Create different output templates for different meeting types (standup vs. strategy vs. 1:1)",
    ],
    relatedWorkflows: ["weekly-report-generator", "async-status-updates"],
  },
  {
    slug: "content-calendar-planner",
    title: "AI-Powered Content Calendar",
    subtitle: "Plan a month of content in one sitting",
    description:
      "Create an AI project loaded with your brand guidelines and past performance data. Use it to plan your monthly content calendar with data-backed topic suggestions.",
    category: "strategy",
    tags: ["planning", "content", "marketing", "strategy"],
    roles: ["Marketing Manager", "Founder", "Consultant"],
    tools: ["Claude", "Notion", "Google Sheets"],
    difficulty: "intermediate",
    nextWorkflow: "competitor-analysis",
    impact: "high",
    timeToSetup: "30 min",
    timeSaved: "3-4 hrs/month",
    whyItMatters:
      "Content planning is where strategy meets execution. Most teams either plan too little (reactive posting) or too much (rigid calendars that don't adapt). AI helps you find the sweet spot — generating topic ideas grounded in what's actually working, while leaving room for timely opportunities.",
    steps: [
      {
        title: "Prepare your context",
        body: "Gather your brand guidelines, top-performing content from the last quarter, upcoming product launches or events, and any SEO keywords you're targeting.",
      },
      {
        title: "Create a Claude Project",
        body: "Start a new Claude Project and upload your context documents. Give it instructions to act as your content strategist.",
      },
      {
        title: "Generate your calendar",
        body: "Ask AI to create a month of content across your channels — blog, social, email, etc. Specify the number of posts per channel and any themes or campaigns.",
      },
      {
        title: "Refine and schedule",
        body: "Review the suggestions, swap out what doesn't fit, and drop the final calendar into your planning tool. Use AI to draft the actual content later.",
      },
    ],
    prompts: [
      {
        label: "Content calendar generator",
        content:
          "Create a content calendar for [month]. I need:\n- [X] blog posts\n- [X] social posts (LinkedIn + Twitter)\n- [X] email newsletters\n\nThemes to cover:\n- [Theme 1]\n- [Theme 2]\n\nOur best-performing topics have been:\n- [Topic 1]\n- [Topic 2]\n\nFor each piece of content, include: title, channel, publish date, brief description, and target audience.",
      },
    ],
    proTips: [
      "Include your analytics data so AI can suggest topics based on what actually performs",
      "Ask AI to 'leave 20% of slots open for timely/reactive content'",
      "Generate 2 months at once for better thematic consistency",
    ],
    relatedWorkflows: ["blog-post-editor", "draft-campaign-briefs"],
  },
  {
    slug: "competitor-analysis",
    title: "Competitor Intelligence System",
    subtitle: "Track and analyze competitor moves systematically",
    description:
      "Set up an AI project that knows your competitors, positioning, and market. Feed it competitor content and launches to get strategic analysis and response recommendations.",
    category: "strategy",
    tags: ["research", "competitive", "strategy", "sales"],
    roles: ["Marketing Manager", "Founder", "Sales Rep", "Consultant"],
    tools: ["Claude", "Google Docs", "Notion"],
    difficulty: "intermediate",
    nextWorkflow: "sales-email-personalizer",
    impact: "high",
    timeToSetup: "30 min",
    timeSaved: "2-3 hrs/week",
    whyItMatters:
      "Most competitive analysis is either too shallow (glancing at a competitor's homepage) or too time-consuming (building full reports). AI can maintain a running understanding of your competitive landscape and give you strategic analysis on demand — turning raw observations into actionable intelligence.",
    steps: [
      {
        title: "Define your competitive landscape",
        body: "List your top 3-5 competitors. For each, note their positioning, target audience, key features, pricing, and recent moves.",
      },
      {
        title: "Create your intelligence project",
        body: "Set up a Claude Project with your competitive landscape, your own positioning, and your differentiators. This becomes your competitive brain.",
      },
      {
        title: "Feed it regular updates",
        body: "When you spot a competitor launch, blog post, or campaign, paste it in. Ask for analysis: What are they signaling? How should we respond? What opportunity does this create?",
      },
      {
        title: "Generate competitive briefs",
        body: "Before sales calls or strategy meetings, ask AI for a competitive brief against a specific competitor. It synthesizes everything you've fed it into actionable talking points.",
      },
    ],
    prompts: [
      {
        label: "Competitor analysis prompt",
        content:
          "Analyze this competitor update:\n\n[Paste competitor content/announcement]\n\nTell me:\n1. What are they signaling strategically?\n2. How does this affect our positioning?\n3. What should we do in response?\n4. Is there an opportunity here we're not seeing?",
      },
    ],
    proTips: [
      "Set a weekly reminder to feed AI at least one competitor update",
      "Ask for 'SWOT analysis vs [competitor]' before important deals",
      "Use AI to draft competitive battle cards for your sales team",
    ],
    relatedWorkflows: ["content-calendar-planner", "sales-email-personalizer"],
  },
  {
    slug: "sales-email-personalizer",
    title: "Personalized Sales Outreach at Scale",
    subtitle: "Every email feels hand-written, none are",
    description:
      "Use AI to research prospects and generate personalized outreach emails that reference their specific company, role, and challenges. Scale personal touch without the time cost.",
    category: "communication",
    tags: ["email", "sales", "outreach", "personalization"],
    roles: ["Sales Rep", "Founder", "Recruiter", "Consultant"],
    tools: ["Claude", "Gmail", "Salesforce", "HubSpot"],
    difficulty: "beginner",
    nextWorkflow: "proposal-generator",
    caseStudy: {
      name: "Jamie L.",
      role: "SDR",
      company: "B2B SaaS startup",
      story: "Jamie was sending 50 cold emails a day with a 2% reply rate. She started using AI to personalize each email based on the prospect's LinkedIn activity and company news.",
      result: "Reply rate jumped to 11%. Booked 3x more meetings without increasing send volume.",
    },
    impact: "high",
    timeToSetup: "15 min",
    timeSaved: "1-2 hrs/day",
    whyItMatters:
      "Generic outreach gets ignored. Personalized outreach gets responses. But truly personalized emails take 15-20 minutes each. AI lets you achieve genuine personalization in 2-3 minutes per email — mentioning their company's recent news, their specific role challenges, and relevant talking points.",
    steps: [
      {
        title: "Define your outreach framework",
        body: "Share your best-performing email templates with AI. What structure works? What hooks get replies? What's your call to action?",
      },
      {
        title: "Prepare prospect context",
        body: "For each prospect, gather 2-3 data points: their role, recent company news, a LinkedIn post they wrote, or a challenge their industry faces.",
      },
      {
        title: "Generate personalized emails",
        body: "Feed AI the prospect context along with your framework. Get a personalized email that feels hand-crafted but takes 2 minutes instead of 20.",
      },
      {
        title: "Review and send",
        body: "Quick scan for accuracy and tone. Make any final tweaks, then send. Track which personalization angles get the best response rates.",
      },
    ],
    prompts: [
      {
        label: "Outreach email generator",
        content:
          "Write a cold outreach email using this framework:\n- Hook: Reference something specific about them\n- Problem: Address a challenge their role faces\n- Bridge: How we solve it\n- Proof: One specific result\n- CTA: Low-friction ask\n\nProspect info:\n- Name: [Name]\n- Role: [Title]\n- Company: [Company]\n- Context: [Recent news, LinkedIn post, or industry trend]\n\nKeep it under 150 words. Sound human, not salesy.",
      },
    ],
    proTips: [
      "Batch your prospecting: gather context for 10 prospects, then generate all 10 emails",
      "A/B test different personalization angles to learn what resonates",
      "Ask AI to write 3 variations so you can pick the best one",
    ],
    relatedWorkflows: ["meeting-notes-to-actions", "competitor-analysis"],
  },
  {
    slug: "async-status-updates",
    title: "Replace Meetings with Async Updates",
    subtitle: "Personalized updates for every audience",
    description:
      "Use AI to transform one set of project notes into multiple audience-specific updates. Executives get metrics, engineers get technical details, stakeholders get impact summaries.",
    category: "communication",
    tags: ["meetings", "async", "productivity", "communication"],
    roles: ["Project Manager", "Founder", "Operations"],
    tools: ["Claude", "Slack", "Notion"],
    difficulty: "beginner",
    nextWorkflow: "sop-documentation",
    impact: "medium",
    timeToSetup: "10 min",
    timeSaved: "3-5 hrs/week",
    whyItMatters:
      "Status meetings exist because different people need different information. But the overhead of scheduling, attending, and following up is enormous. AI lets you write one set of notes and generate tailored updates for every audience — async, searchable, and respectful of everyone's time.",
    steps: [
      {
        title: "Write your raw status notes",
        body: "At the end of each day or week, dump everything notable: what shipped, what's blocked, key metrics, decisions needed. Don't worry about audience — just capture everything.",
      },
      {
        title: "Define your audiences",
        body: "Tell AI who needs updates and what they care about. Executives want metrics and decisions. Engineers want technical details and blockers. Stakeholders want timeline and impact.",
      },
      {
        title: "Generate tailored updates",
        body: "Paste your raw notes and ask AI to create a separate update for each audience. Each one highlights what that group cares about most.",
      },
      {
        title: "Distribute via Slack or email",
        body: "Post each update to the relevant channel or send via email. Include a 'questions?' prompt so people can respond async instead of scheduling meetings.",
      },
    ],
    prompts: [
      {
        label: "Multi-audience update generator",
        content:
          "Here are my raw project notes for this week:\n\n[Paste notes]\n\nGenerate 3 versions of a status update:\n\n1. **Executive summary** (3-5 bullets, focus on metrics, timeline, decisions needed)\n2. **Engineering update** (technical details, blockers, architecture decisions)\n3. **Stakeholder update** (impact, timeline, what to expect next)\n\nKeep each under 200 words.",
      },
    ],
    proTips: [
      "Cancel one recurring meeting and replace it with async updates for 2 weeks as a trial",
      "Add a 'decisions needed' section to force clarity on what's blocked",
      "Use Slack threads so questions and context stay grouped",
    ],
    relatedWorkflows: ["meeting-notes-to-actions", "weekly-report-generator"],
  },
  {
    slug: "proposal-generator",
    title: "Client Proposal Builder",
    subtitle: "Professional proposals in a fraction of the time",
    description:
      "Use AI to draft client proposals from your discovery call notes. Get a structured proposal with scope, timeline, pricing rationale, and next steps — matching your firm's style.",
    category: "content",
    tags: ["writing", "sales", "proposals", "consulting"],
    roles: ["Consultant", "Founder", "Sales Rep"],
    tools: ["Claude", "Google Docs"],
    difficulty: "intermediate",
    nextWorkflow: "interactive-prototype",
    caseStudy: {
      name: "David R.",
      role: "Independent Consultant",
      story: "David used to spend 4-6 hours on each client proposal. He trained AI on his best-converting proposals and now generates first drafts from discovery call notes in 20 minutes.",
      result: "Proposal turnaround dropped from 3 days to same-day. Win rate stayed the same — clients can't tell the difference.",
    },
    impact: "high",
    timeToSetup: "20 min",
    timeSaved: "2-4 hrs/proposal",
    whyItMatters:
      "Proposals are where deals are won or lost, but they're tedious to write from scratch. The structure is predictable — context, scope, approach, timeline, investment. AI can generate a solid first draft from your discovery notes, letting you focus on the strategic thinking that actually wins business.",
    steps: [
      {
        title: "Share your proposal template",
        body: "Give AI a winning proposal you've sent before. Let it learn your structure, tone, pricing format, and the way you frame your value proposition.",
      },
      {
        title: "Capture discovery call notes",
        body: "During or after your discovery call, note the client's challenges, goals, budget signals, timeline expectations, and decision-making process.",
      },
      {
        title: "Generate the proposal draft",
        body: "Feed your call notes to AI along with the scope of work. It will generate a complete proposal matching your template style.",
      },
      {
        title: "Customize and polish",
        body: "Add client-specific insights, adjust pricing, and refine the approach section. The structure and language are handled — you focus on strategy.",
      },
    ],
    prompts: [
      {
        label: "Proposal generator",
        content:
          "Draft a client proposal based on these discovery call notes:\n\n[Paste notes]\n\nUse this structure:\n1. Understanding of their situation\n2. Proposed approach\n3. Scope of work (phases/deliverables)\n4. Timeline\n5. Investment\n6. Why us\n7. Next steps\n\nTone: Professional but warm. Show we understand their business.",
      },
    ],
    proTips: [
      "Include specific language the client used during discovery — it shows you listened",
      "Ask AI to generate 3 different pricing options (good/better/best)",
      "Create separate AI projects for different service lines",
    ],
    relatedWorkflows: ["sales-email-personalizer", "meeting-notes-to-actions"],
  },
  {
    slug: "job-description-writer",
    title: "Write Better Job Descriptions",
    subtitle: "Attract the right candidates faster",
    description:
      "Use AI to draft compelling job descriptions that accurately reflect the role, attract diverse candidates, and stand out from generic postings.",
    category: "content",
    tags: ["writing", "hiring", "hr", "recruiting"],
    roles: ["Recruiter", "Founder", "Operations"],
    tools: ["Claude", "Google Docs"],
    difficulty: "beginner",
    nextWorkflow: "sales-email-personalizer",
    impact: "medium",
    timeToSetup: "10 min",
    timeSaved: "1-2 hrs/posting",
    whyItMatters:
      "Most job descriptions are either too generic (copied from a template) or too long (listing 47 requirements). Great JDs attract the right people by clearly communicating what makes the role exciting, what the person will actually do, and why your company is worth joining. AI can draft these quickly while avoiding common pitfalls.",
    steps: [
      {
        title: "Gather role context",
        body: "Talk to the hiring manager. Note: what the person will actually do day-to-day, what success looks like in 90 days, must-have vs. nice-to-have skills, and what makes this team special.",
      },
      {
        title: "Generate the draft",
        body: "Feed your notes to AI and ask for a job description that's compelling, specific, and avoids jargon. Specify your tone — startup casual? enterprise professional?",
      },
      {
        title: "Check for bias",
        body: "Ask AI to review the draft for gendered language, unnecessary requirements, and exclusionary phrasing. Research shows small wording changes can dramatically increase diverse applicant pools.",
      },
      {
        title: "Finalize and post",
        body: "Review with the hiring manager, make final tweaks, and post. Use AI to generate LinkedIn and email versions of the posting for different channels.",
      },
    ],
    prompts: [
      {
        label: "Job description generator",
        content:
          "Write a job description for:\n\nRole: [Title]\nTeam: [Department]\nReports to: [Manager title]\n\nDay-to-day responsibilities:\n[Bullet points]\n\n90-day success looks like:\n[Description]\n\nMust-haves:\n[Skills/experience]\n\nNice-to-haves:\n[Skills/experience]\n\nTone: [Casual/professional]\n\nMake it compelling and specific. Avoid generic phrases like 'fast-paced environment.' Focus on what makes this role and team unique.",
      },
    ],
    proTips: [
      "Ask AI to create a shorter 'LinkedIn version' optimized for social sharing",
      "Remove years of experience requirements — they discourage great candidates",
      "Include salary range transparency — it increases qualified applications by 30%",
    ],
    relatedWorkflows: ["sales-email-personalizer", "async-status-updates"],
  },
  {
    slug: "data-analysis-assistant",
    title: "Spreadsheet Analysis Copilot",
    subtitle: "Ask questions about your data in plain English",
    description:
      "Paste spreadsheet data into AI and ask questions in plain English. Get analysis, formulas, charts descriptions, and insights without knowing SQL or advanced Excel.",
    category: "data",
    tags: ["data", "spreadsheets", "analysis", "formulas"],
    roles: [
      "Operations",
      "Marketing Manager",
      "Project Manager",
      "Accountant",
    ],
    tools: ["Claude", "Google Sheets", "Excel"],
    difficulty: "beginner",
    nextWorkflow: "weekly-report-generator",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    impact: "high",
    timeToSetup: "5 min",
    timeSaved: "1-3 hrs/analysis",
    whyItMatters:
      "Most people have data they should be analyzing but don't — because they don't know the right formulas, pivot table setups, or visualization techniques. AI removes the skill barrier entirely. You describe what you want to know, paste your data, and get the answer plus the formula to replicate it.",
    steps: [
      {
        title: "Copy your data",
        body: "Select the data range in Google Sheets or Excel and copy it. Headers included. AI works best with structured data that has clear column names.",
      },
      {
        title: "Ask your question",
        body: "Paste the data into AI and ask your question in plain English: 'Which product has the highest margin?' or 'Show me the month-over-month growth trend.'",
      },
      {
        title: "Get analysis and formulas",
        body: "AI will answer your question AND give you the formula or approach to replicate it in your spreadsheet. Copy the formula back into your sheet.",
      },
      {
        title: "Iterate and explore",
        body: "Ask follow-up questions: 'What if we removed outliers?' or 'Break this down by region.' AI makes exploratory data analysis conversational.",
      },
    ],
    prompts: [
      {
        label: "Data analysis prompt",
        content:
          "Here's my data from [source]:\n\n[Paste data]\n\nQuestions:\n1. [Your question]\n2. [Your question]\n\nFor each answer, also give me:\n- The Google Sheets formula to calculate this myself\n- Any patterns or anomalies you notice\n- One follow-up question I should be asking",
      },
    ],
    proTips: [
      "Include column headers when you paste data — it helps AI understand the structure",
      "Ask AI to 'suggest 5 questions I should ask about this data' if you're not sure where to start",
      "For sensitive data, anonymize names and identifiers before pasting",
    ],
    relatedWorkflows: ["weekly-report-generator", "meeting-notes-to-actions"],
  },
  {
    slug: "interactive-prototype",
    title: "Build an Interactive Prototype",
    subtitle: "Show don't tell — build a working demo",
    description:
      "Use AI coding tools to build a simple interactive prototype that demonstrates your idea. Replace static slide decks with something people can actually click through and experience.",
    category: "creative",
    tags: ["prototyping", "coding", "presentations", "creative"],
    roles: ["Founder", "Marketing Manager", "Designer", "Consultant"],
    tools: ["Claude"],
    difficulty: "advanced",
    impact: "high",
    timeToSetup: "1-2 hrs",
    timeSaved: "N/A — new capability",
    whyItMatters:
      "A working prototype is 10x more persuasive than a slide deck. When someone can click through your idea, they experience it instead of imagining it. One marketer built a prototype for a campaign pitch and got a 40% bigger budget approved. A job candidate built a prototype of their proposed solution and got hired on the spot.",
    steps: [
      {
        title: "Define what to demonstrate",
        body: "Pick the one key flow or concept you want people to experience. Don't try to build everything — just the 'aha moment.' A landing page, a dashboard view, a user flow.",
      },
      {
        title: "Describe it to AI",
        body: "Open Claude or Cursor and describe what you want to build in plain language. Include the visual style, the key interaction, and what data or content should appear.",
      },
      {
        title: "Iterate on the output",
        body: "AI will generate working HTML/CSS/JavaScript. Review it in a browser, then ask AI to adjust colors, layout, content, or interactions. Each iteration takes minutes.",
      },
      {
        title: "Present it",
        body: "Share the prototype in your pitch meeting, interview, or client presentation. Let people click through it themselves. Watch their reaction change from 'interesting' to 'I need this.'",
      },
    ],
    prompts: [
      {
        label: "Prototype builder",
        content:
          "Build me a simple interactive prototype for [your idea].\n\nIt should show:\n- [Key screen/view 1]\n- [Key screen/view 2]\n- [Key interaction]\n\nVisual style: Clean, modern, professional. Use [brand colors if applicable].\n\nThis is for a [pitch/interview/demo] so it needs to look polished but doesn't need real data or backend functionality.\n\nGenerate it as a single HTML file I can open in a browser.",
      },
    ],
    proTips: [
      "Start with the most impressive screen first — get that right, then add navigation",
      "Use realistic-looking data, not lorem ipsum — it makes the prototype 5x more convincing",
      "Record a 60-second screen recording as a backup in case live demo has issues",
    ],
    relatedWorkflows: ["proposal-generator", "content-calendar-planner"],
  },
  {
    slug: "sop-documentation",
    title: "Document SOPs from Conversations",
    subtitle: "Turn tribal knowledge into repeatable processes",
    description:
      "Describe how you do a task in a conversational voice memo or chat. AI converts it into a structured standard operating procedure with clear steps, checklists, and edge cases.",
    category: "strategy",
    tags: ["documentation", "processes", "operations", "onboarding"],
    roles: ["Operations", "Founder", "Project Manager", "Consultant"],
    tools: ["Claude", "Notion", "Google Docs"],
    difficulty: "beginner",
    impact: "medium",
    timeToSetup: "10 min",
    timeSaved: "2-3 hrs/SOP",
    whyItMatters:
      "Every team has processes that live in one person's head. When they go on vacation or leave, the process breaks. Documenting SOPs is important but painfully boring — which is why no one does it. AI makes it as easy as talking through how you do something.",
    steps: [
      {
        title: "Brain dump the process",
        body: "Record yourself explaining how to do the task, or just type it out conversationally. Don't worry about structure — talk through it like you're teaching a new hire.",
      },
      {
        title: "Feed it to AI",
        body: "Paste your brain dump and ask AI to convert it into a structured SOP with numbered steps, decision points, checklists, and notes about edge cases.",
      },
      {
        title: "Review and fill gaps",
        body: "Read through the SOP. AI will often ask clarifying questions or flag places where you assumed knowledge. Fill in any gaps.",
      },
      {
        title: "Store and share",
        body: "Put the final SOP in your team wiki (Notion, Confluence, etc). Ask AI to also create a one-page quick reference version for daily use.",
      },
    ],
    prompts: [
      {
        label: "SOP converter",
        content:
          "Convert this brain dump into a structured SOP:\n\n[Paste your conversational explanation]\n\nFormat it as:\n1. **Purpose**: What this process achieves\n2. **When to use**: Trigger/frequency\n3. **Prerequisites**: What you need before starting\n4. **Steps**: Numbered with clear details\n5. **Decision points**: If X then Y, otherwise Z\n6. **Common mistakes**: What to watch out for\n7. **Checklist**: Quick reference for experienced users",
      },
    ],
    proTips: [
      "Use voice-to-text (phone dictation) to capture processes — it's faster than typing",
      "Ask AI to 'identify any steps where someone new might get stuck' for better onboarding",
      "Review SOPs quarterly — processes change and documentation gets stale",
    ],
    relatedWorkflows: ["meeting-notes-to-actions", "async-status-updates"],
  },
];

// Enrich base workflows with scores, trends, testimonials
const DEFAULT_ENRICHMENT: Pick<Workflow, "score" | "benefits" | "testimonials" | "trend" | "stats"> = {
  score: 80,
  benefits: ["Save time on repetitive tasks", "More consistent output quality", "Focus on higher-value work"],
  testimonials: [],
  trend: { label: "Search interest", points: TREND_CURVES.steady, source: "Based on search volume trends" },
  stats: { usersAdopted: "5,000+", avgTimeSaved: "1 hr/week", satisfactionRate: "85%" },
};

export const workflows: Workflow[] = baseWorkflows.map((w) => ({
  ...w,
  ...DEFAULT_ENRICHMENT,
  ...(ENRICHMENT[w.slug] || {}),
}));

// Helper functions
export function getWorkflow(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug);
}

export function getWorkflowsByCategory(category: Category): Workflow[] {
  return workflows.filter((w) => w.category === category);
}

export function getWorkflowsByRole(role: string): Workflow[] {
  return workflows.filter((w) => w.roles.includes(role));
}

export function getRelatedWorkflows(workflow: Workflow): Workflow[] {
  return workflow.relatedWorkflows
    .map((slug) => getWorkflow(slug))
    .filter((w): w is Workflow => w !== undefined);
}

export function getAllCategories(): Category[] {
  return [...new Set(workflows.map((w) => w.category))];
}

export function getAllRoles(): string[] {
  return [...new Set(workflows.flatMap((w) => w.roles))].sort();
}

export function getAllTools(): string[] {
  return [...new Set(workflows.flatMap((w) => w.tools))].sort();
}

export function getAllTags(): string[] {
  return [...new Set(workflows.flatMap((w) => w.tags))].sort();
}

export function getWorkflowsByTag(tag: string): Workflow[] {
  return workflows.filter((w) => w.tags.includes(tag));
}

export function getWorkflowOfTheDay(): Workflow {
  const today = new Date();
  const dayIndex =
    (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
    workflows.length;
  return workflows[dayIndex];
}

export function scoreWorkflowForProfile(
  workflow: Workflow,
  profile: { role: string; tools: string[]; tasks: string[] }
): number {
  let score = 0;
  if (workflow.roles.includes(profile.role)) score += 10;
  const toolOverlap = workflow.tools.filter((t) =>
    profile.tools.includes(t)
  ).length;
  score += toolOverlap * 3;
  // Beginner workflows score higher for new users
  if (workflow.difficulty === "beginner") score += 2;
  if (workflow.impact === "high") score += 3;
  return score;
}

export function getPersonalizedWorkflows(profile: {
  role: string;
  tools: string[];
  tasks: string[];
}): Workflow[] {
  return [...workflows]
    .map((w) => ({ workflow: w, score: scoreWorkflowForProfile(w, profile) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.workflow);
}

export function getRoleSlug(role: string): string {
  return role.toLowerCase().replace(/\s+/g, "-");
}

export function getRoleFromSlug(slug: string): string | undefined {
  return ROLES.find((r) => getRoleSlug(r) === slug);
}

export function getCategoryFromSlug(slug: string): Category | undefined {
  return (Object.keys(CATEGORY_LABELS) as Category[]).find(
    (c) => c === slug
  );
}
