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

## Chapter 11 Adding Search and Pagination

- Search functionality span the client and the server.
  - Client - Search query from URL params.
  - Server - Data fetching, table re-render.
- Next.js client hooks to use for implementing search:
  - `useSearchParams` - Extract the query string to an object.
  - `usePathName` - Extract the path name.
  - `useRouter` - To navigate route programmatically. Has many methods to use.
- Client component can use event listeners and hooks.
- `URLSearchParams` - Standard Web API that provide utility methods for manipulating the URL query parameters.
- Use `useRouter` and `usePathname` hooks to update the URL.
- URL is updated without reloading the page (Next.js client-side navigation feature).
- `defaultValue` vs `value` (HTML input element) / Uncontrolled vs Controlled
  - Bind state to `value` make it a controlled component.
  - Since the search query is saved to the URL instead of state (uncontrolled component), we then use `defaultValue` to set the initial value.
- For client component, use `useSearchParams()` hook.
- For server component, use `searchParams` prop.
- `use-debounce` - Library for implementing debounce.

## Chapter 12 Mutating Data

- Use React Server Actions to mutate data.
  - Eliminate the need to create API endpoints.
  - To run async code directly on the server.
  - Deeply integrated with Next.js caching.
  - Can also revalidate the associated cache using APIs like `revalidatePath` and `revalidateTag`.
- Work with forms and Server Components.
  - In server component, use `<form>` `action` attribute to invoke action (async function).
  - In React, `action` attribute is a special prop (React builds on top of it)
- Work with the native `formData` object, including type validation.
  - extract the data from the `formData` object.
- Revalidate client cache using `revalidatePath` API.
- Dynamic route segments with specific IDs.
- Steps to CREATE a new invoice.
  1. Create a new route and form
  2. Create a Server Action
     - `"user server"` marks all the exported functions within the file as Server Actions.
     - Create POST API endpoints behind the scenes.
  3. Extract the data from `formData`.
     - Use `.get(name)` or `.entries()` with `Object.fromEntries()`.
  4. Validate and prepare the data
     - Can use `Zod` library for type validation.
  5. Inserting the data into your database
  6. Revalidate and redirect
     - Client-side Router Cache - Store/cache the route segments for a time.
     - Add/update data that is used in other (`invoices`) routes require you to clear the cache using `revalidatePath` function.
- Steps to UPDATE an invoice.
  1. Create a Dynamic Route Segment with the invoice `id`.
     - Create routes based on data.
  2. Read the invoice `id` from page `params`.
     - Page components accept a prop called `params`.
  3. Fetch the specific invoice.
  4. Pass the `id` to the Server Action.
- Further reading: [Security with Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions)

## Chapter 13 Handling Errors

- `error.tsx`
  - Use it to catch **unexpected errors** in your route segments, and show a **fallback UI**.
  - Must be a Client Component.
  - Accepts two props:
    1. `error` object - JS native error object.
    2. `reset` function - To reset the error boundary (try to re-render the route segment).
- Use `notFound` function and `not-found.tsx` file to handle 404 errors.
- How `redirect` works is by throwing an error internally. Hence, they should be called outside of try/catch block to work properly.
- `notFound` will take precedence over `error.tsx`.
- Further reading:
  - [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
  - [error.js (Component) API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/error)
  - [notFound() API Reference](https://nextjs.org/docs/app/api-reference/functions/not-found)
  - [not-found.js (Component) API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)

## Chapter 14 Improving Accessibility

- Use `eslint-plugin-jsx-a11y` to implement accessibility best practices.
  - Accessibility features and some common practice.
- **Server-side form validation** with Server Actions.
- Show form errors using React's `useActionState` hook.

## Chapter 15 Adding Authentication

- Using NextAuth.js
  - Abstracts away the complexity involved in managing sessions, sign-in and sign-out, etc.
  - Generate a secret key to encrypt cookies to ensure the security of user sessions. E.g. `openssl rand -base64 32`
  - Configure using a `auth.config.ts` file.
    - Use `pages` option to specify the route for **custom** sign-in, sign-out, and error pages. (Not required)
    - `authorized` callback is used by Next.js Middleware. `auth` property contains user's session.
    - `providers` option is the list of different login options.
- Use Middleware to redirect users and protect routes.
- Use `bcrypt` library for password hashing. (Can't use directly in Middleware).
- `auth.config.ts` - handle general config and basic authorization logic (e.g. is logged in)
- `auth.js` - handle authentication (login logic), identity providers (Idp) and export sign in, sign out method.
- Use the exported sign in and sign out methods of `auth.js` in Server Actions.

## Chapter 16 Adding Metadata

- Crucial for SEO.
- Metadata like **Open Graph** improves the appearance of shared links on social media.
- Types of metadata:
  - Title
  - Description - often displayed in search engine results.
  - Keyword - helping search engine index the page (comma-separated).
  - Open Graph
    ```html
    <meta property="og:title" content="Title Here" />
    <meta property="og:description" content="Description Here" />
    <meta property="og:image" content="image_url_here" />
    ```
  - Favicon - Site icon.
- Has a Metadata API to define your app metadata.
- Two ways to add:
  1. Config-based - static `metadata` object or dynamic `generateMetadata()` in `layout.tsx` or `page.tsx`.
  2. File-based - special files in `app`
- Use `title.template` field in the `metadata` object (`layout.tsx`) to define a template for your page titles.
