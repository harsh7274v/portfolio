# Harsh Vardhan Prasad - Portfolio & Dynamic Blog Architecture

A modern Next.js portfolio & interactive headless Blog system built with **React 19**, **Next.js App Router**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🏗️ Blog Architecture & Remote CMS Integration

The blog is designed to be **decoupled, interactive, and remote-first**. You can publish articles from an external platform (e.g., Hashnode, Dev.to, Notion, or Sanity CMS) and have them reflect directly on your website **without opening your codebase or re-deploying manual code changes**.

```mermaid
sequenceDiagram
    autonumber
    actor Author as You (External CMS / Mobile / Dev.to / Notion)
    participant CMS as Remote Content Provider (Dev.to / Hashnode / Notion)
    participant NextApp as Next.js Portfolio App (/blog)
    participant LocalStorage as Browser LocalStorage
    actor Visitor as Reader / Portfolio Visitor

    Author->>CMS: 1. Publish / Edit Blog Post externally
    Visitor->>NextApp: 2. Opens website (/blog)
    NextApp->>CMS: 3. Fetches live posts via API (Dev.to / REST / GraphQL)
    CMS-->>NextApp: 4. Returns posts JSON (Title, Author, Body, Photo, Tags)
    NextApp-->>Visitor: 5. Renders interactive Blog UI (Tabs, Author, Likes, Share)

    Visitor->>LocalStorage: 6. Toggle Like / Bookmark Post ("Saved Blogs")
    LocalStorage-->>Visitor: 7. Persists preferences instantly in browser
```

---

## ⚡ How Remote Blog Publishing Works (Without Opening Website)

### 🚀 Option 1: GitHub Repository as Headless CMS (CONFIGURED & ACTIVE)
Simply write or push `.md` files to the `content/blogs/` directory in your GitHub repository (`harsh7274v/portfolio`). Next.js fetches them live via GitHub REST API without requiring code changes or website re-deployments!

1. Create a markdown file in `content/blogs/your-post-title.md`:
   ```markdown
   ---
   title: "Your Article Title"
   slug: "your-article-title"
   summary: "Short description of your article."
   category: "Tech & AI"
   tags: ["Next.js", "GitHub", "CMS"]
   publishedAt: "Aug 12, 2026"
   readTime: "4 min read"
   coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
   authorName: "Harsh Vardhan Prasad"
   authorAvatar: "https://github.com/harsh7274v.png"
   authorRole: "Fullstack & AI Engineer"
   authorGithub: "https://github.com/harsh7274v"
   likesCount: 50
   ---

   ### Introduction

   Write your article content in standard GitHub-Flavored Markdown here...
   ```
2. Commit & Push to GitHub:
   ```bash
   git add content/blogs/your-post-title.md
   git commit -m "Publish new post: Your Article Title"
   git push origin main
   ```
3. Your live website fetches and renders the new article dynamically!

---

### Option B: Dev.to API
1. Write articles on [Dev.to](https://dev.to).
2. Set `NEXT_PUBLIC_DEVTO_USERNAME=YOUR_USERNAME` in `.env.local`.
3. Every time you hit **Publish** on Dev.to, your website displays the post automatically.

### Option C: Notion / Sanity / External Headless CMS
Configure custom GraphQL or REST endpoints in `lib/blogs.ts`.

---

## 📂 Blog Component & Folder Hierarchy

```text
portfolio/
├── app/
│   ├── blog/
│   │   ├── page.tsx               # Blog Hub: Search, Category Tabs, Post Grid
│   │   └── [slug]/
│   │       └── page.tsx           # Blog Detail: Article View, Author Box, Likes, Share
│   ├── globals.css                # Custom theme variables & Tailwind v4 styles
│   └── layout.tsx                 # Root layout with ThemeProvider & Lenis Scroll
├── components/
│   ├── blog/
│   │   ├── BlogNavbar.tsx         # Header navigation with search & back button
│   │   ├── CategoryTabs.tsx       # Field category filter tabs (Tech, Web Dev, Saved, etc.)
│   │   ├── BlogCard.tsx           # Post card displaying author photo, likes, save & share
│   │   └── Toast.tsx              # Toast banner notification for copied share links
│   ├── right/
│   │   └── Navbar.tsx             # Main navbar updated with Blog link
│   └── left/
│       └── Cta.tsx                # Sidebar CTA updated with Blog link
├── lib/
│   ├── types/
│   │   └── blog.ts                # TypeScript interfaces (BlogPost, Author, Category)
│   └── blogs.ts                   # Data fetcher layer (Remote API + Fallback Data)
└── README.md                      # Architecture documentation
```

---

## ✨ Features Included

1. **Category Filtering Tabs**: Filter articles by field (`All`, `Tech & AI`, `Web Dev`, `System Design`, `Tutorials`, `Saved`).
2. **Saved Blogs (`localStorage`)**: Click the bookmark icon to save favorite posts locally. Access them anytime under the **Saved** tab.
3. **Author Profile Box**: Every blog card & detail page displays the author's name, photo/avatar, role, and bio.
4. **Interactive Likes Counter**: Readers can click the Heart button to like articles (saved locally per post ID).
5. **Send Link / Link Generator**: Click the Share icon to generate a direct permalink to the blog post, copy it to clipboard, and display a slick confirmation toast.
6. **Search Bar**: Real-time filtering by title, summary, author, or tags.
7. **Dark / Light Theme Sync**: Seamlessly matches your existing portfolio color tokens (`--main`, `--sidebar`, `--surface`, `--accent`).

---

## 🛠️ Getting Started

### 1. Run Development Server
```bash
npm run dev
```

### 2. View Blog Locally
Open `http://localhost:3000/blog` in your browser.

### 3. Connect External CMS (Optional)
To point to your live Dev.to or Hashnode username, update `NEXT_PUBLIC_DEVTO_USERNAME` in `.env.local`:
```env
NEXT_PUBLIC_DEVTO_USERNAME="your_username"
```

---

## 🤖 Future AI & LLM Integrations

For a complete breakdown of futuristic AI & LLM feature updates (RAG Chatbots, AI Article Summarizer, Voice Readers, Semantic Search, Code Explainer), see [AI_FUTURE_ROADMAP.md](file:///Users/harsh/Downloads/portfolio/AI_FUTURE_ROADMAP.md).

