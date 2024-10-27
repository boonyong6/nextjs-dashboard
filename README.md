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
