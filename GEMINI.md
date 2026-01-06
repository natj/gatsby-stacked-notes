## 3. Comments
- **Goal:** Code must be understandable to a developer unfamiliar with the specific libraries used.
- **Requirement:** Add concise, descriptive comments to explain **why** logic is implemented a certain way.
- **React/Gatsby Context:** Always explain React hooks (e.g., `useEffect`, `useContext`), Gatsby lifecycle APIs (e.g., `createPages`), and specific package functionality (e.g., `mdxOptions`). Assume the reader is a generalist programmer, not a framework specialist.
- **Style:** Avoid filler phrases ("This function..."). Focus on the intent and the architectural role of the code block.

## Code Style Preferences

Please follow these guidelines for code style:

1.  **Capitalization for Objects:** Only objects (classes, constructors, React components) should start with a capital letter.
2.  **CamelCase for Objects & Hooks:** Use CamelCase (e.g., `MyObject`, `ReactComponent`, `useStack`, `useTheme`) for object names and React Custom Hooks. **React Hooks must start with `use`.**
3.  **snake_case for Everything Else:** Use `snake_case` (e.g., `my_variable`, `function_name`) for all other variables, functions, and file names (except hook files which should match the hook name).
4.  **Short, Self-Explanatory Variable Names:** Use concise, clear variable names that are standard and self-explanatory (e.g., `i` for loop counters, `idx` for index, `len` for length, `num` for number). Avoid overly verbose names like `stack_index`.
5.  **No Single-Line Definitions:** Avoid defining multiple variables on a single line (e.g., `float x=1,y=2;`). Each variable definition should have its own line for clarity.
6.  **External Styling:** Styling should always be defined in external CSS files (e.g., `global.css`) using semantic classes. Avoid inline styles and minimize the use of utility classes (like Tailwind) within component files to keep the markup clean and styling centralized.
7.  **Modern Ecosystem & ESM:**
    - Prefer the **latest, modern versions** of libraries (e.g., Gatsby v5+, React 18+).
    - Embrace **ES Modules (ESM)**. Since Gatsby v5 and MDX v2 enforce strict ESM compliance for plugins (like `remark` and `rehype` ecosystem), configuration files (`gatsby-config.js`, `gatsby-node.js`) should eventually be migrated to `.mjs` or refactored to handle ESM imports properly.
    - When adding functionalities (like LaTeX), choose modern, performance-oriented libraries (e.g., `KaTeX` over `MathJax`) and ensure their plugins are compatible with the MDX v2 AST.
8.  **Verification after Major Revisions:** After significant code changes—such as renaming files, large logic rewrites, or structural updates—always verify compilation and runtime stability. The standard procedure is to execute `npm run clean` followed by `npm run develop` (or `npm run build`) to ensure the cache is purged and the system boots correctly with the new changes.
9.  **No Emoticons:** Absolutely no emoticons (emojis, smiley faces, etc.) are allowed in the HTML, source code, comments, or any other project files. Maintain a strictly professional and clean text-only environment.
