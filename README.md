## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Chapter 1 Getting Started

- Recommend using `pnpm` package manager.
- Project structure:
  - `/app`: Contains **routes**, **components**, and **logic**.
  - `/app/lib`: Contains reusable **utility/helper functions**, such as placeholder data.
  - `/app/ui`: UI components, such as cards, tables, and forms.
  - `/public/`: Static assets
  - Config files are at the app root.
- Can use placeholder data or [mockAPI](https://mockapi.io/) (3rd party) to mock API.

## Chapter 2 CSS Styling

- Global CSS file - `global.css`
  - CSS rules to all routes, such as site-wide styles.
  - Import it to top-level component (root layout).
  ```js
  // /app/layout.tsx
  import "@/app/ui/global.css";
  ```
- Two ways of styling:
  - **Tailwind**
  - **CSS modules** (traditional, styles separate from JSX).
    - Can scope CSS to a component by creating unique class names to avoid collisions.
- **Conditionally** add/toggle class names - `clsx`.
  - [Documentation](https://github.com/lukeed/clsx)

## Chapter 3 Optimizing Fonts and images

- Add custom fonts - `next/font`
  - Loaded from files.
  - E.g. Google font
- Add images - `next/image`
  - `<Image>` comes with automatic image optimization.
    - Prevent layout shift.
    - Resize image based on viewport.
    - Lazy loading images outside of viewport.
    - Serving in modern format, such as WebP and AVIF, when browser supports it.
  - Set the `width` and `height` to avoid layout shift.
- How fonts and images are optimized.

## Chapter 4 Creating Layouts and Pages

- Create **routes** with **layouts** and **pages**.
- File-system routing - folders, files.
  - Each folder represents route segment.
  - Create UIs for each route using `layout.tsx` and `page.tsx` (required for the route).
- Use `layout.tsx` to create UI that is shared between multiple pages, such as navigation.
  - `children` prop can either be a page or another layout.
  - Partial rendering - Page components update won't re-render layout.
  - Root layout - `app/layout.tsx`
    - Like an entry point.
    - It is required.
    - UI components in this layout are shared across all pages.
    - Use to modify `<html>`, `<body>` and add metadata.

## Chapter 5 Navigating Between Pages

- Use `nex/link` component (`<Link>`) to create links (optimize).
  - `<a>` triggers full page refresh.
  - `<Link>` performs client-side navigation (NO full page refresh).
  - Usage of `<Link>` is similar to `<a>`.
- Automatic code-splitting and prefetching
  - Next.js automatically code splits your app by route segments, so they can be loaded separately.
  - In traditional React SPA, the browser loads all your app code on initial load.
  - Pages become isolated. An error thrown by a page wouldn't crash the entire app.
  - In production, when `<Link>` components appear in the viewport, Next.js prefetches the code for the linked route in the background.
- Pattern: Showing active links
  - To indicate to the user what page they are currently on.
  - By matching the user's current path from the URL.
  - Use `usePathname()` hook to implement this pattern.
  - Note: Hooks can only be used in client components. Set `"use client"` directive.
- How navigation works.

## Chapter 7 Fetching Data

- Ways: API, ORM (Kysely, Prisma, Drizzle), SQL
- In Next.js, you can create API endpoints using **Route Handlers**.
- **Server components**
  - Can access **back-end resources** more securely.
  - Support **promises**. Can use `async`/`await`. So, no need to use `useEffect`, `useState` or data fetching libraries.
  - No API layer needed.
- Parallel data fetching using a JavaScript Pattern.

## Chapter 8 Static and Dynamic Rendering

- Static rendering - Data fetching and rendering happens on the server at **build time**.
  - Can be cached using CDNs
  - Reduced server load
  - Useful for UI with no data or shared/public data.
- Dynamic rendering
  - Content is rendered on the server at request time.
  - Benefits:
    - To display real-time/up-to-date data.
    - User-specific or personalized content
    - To obtain request time information (cookies, query string)
- Slow data fetch block UI from showing.

## Chapter 9 Steaming

- Use in conjunction with Server Components.
- Streaming is a data transfer technique to break down a route into smaller "chunks".
- Prevent slow data requests from blocking your whole page.
- Each Rect component can be considered a _chunk_.
- Two ways to implement:
  1. At the page level, with the `loading.tsx` file.
     - Streaming a whole page.
     - `loading.tsx` is a special file built on top of Suspense.
     - Interrupt-able navigation - Can navigate away before finish loading.
  2. For specific components, with `<Suspense>`.
     - To defer rendering parts of your app until some condition is met.
     - Wrap dynamic components in Suspense.
     - Good practice: Move your data fetches down to the components that need it, and then wrap those components in Suspense.
- Routes groups
  - Organize files into logical groups without affecting the URL path structure.
  - Folders with parentheses, such as `(overview)`. The name won't be included in the URL path.
  - Can use it to separate your app into sections, such as `(marketing)` and `(shop)`.

## Chapter 10 Partial Prerendering (Experimental)

- To combine the benefits of static rendering, dynamic rendering, and streaming in the same route.
- Calling dynamic functions in a route (e.g. query DB) make it dynamic.
- But, most routes are not fully static or dynamic.
  - Static - product info
  - Dynamic - personalized content (user's cart, recommended products).
- When a user visits a route:
  1. Serve the static route shell (e.g. navbar, product info).
  2. Shell leaves holes where dynamic content (e.g. cart, recommended products) will load in asynchronously using Suspense.
     - Suspense fallback is embedded into the initial HTML file.
     - Suspense is used as a boundary between your static and dynamic code.
  3. Stream dynamic content in parallel.
- Static content is **prerendered** at build time. Whereas, dynamic content is **postponed** until the user request time.
- Don't need to change your code to use PPR as long as you're using Suspense.
