## Code Comment Guidelines

To maintain code readability and conciseness, please adhere to the following guidelines when adding comments:

1.  **Short and Descriptive:** Comments should be brief but clearly explain the *why* and *what* of the code.
2.  **Avoid Redundancy:** Do not state the obvious. The code should speak for itself where possible.
3.  **No Unnecessary Phrases:** Avoid filler phrases such as:
    *   "This is a simple module for..." (Instead, just "A simple module for...")
    *   "This function is used to..." (Instead, "Calculates X by doing Y.")
    *   "Here we are checking for..." (Instead, "Checks for...")
    *   "The following code does..." (Instead, directly explain what it does.)
4.  **Focus on Logic:** Explain complex logic, edge cases, or design decisions that are not immediately apparent from the code itself.
5.  **Maintain React Context (if applicable):** When explaining React components, hooks, or context, briefly describe their purpose and how they integrate into the React lifecycle or component tree.

## Code Style Preferences

Please follow these guidelines for code style:

1.  **Capitalization for Objects:** Only objects (classes, constructors, React components) should start with a capital letter.
2.  **CamelCase for Objects & Hooks:** Use CamelCase (e.g., `MyObject`, `ReactComponent`, `useStack`, `useTheme`) for object names and React Custom Hooks. **React Hooks must start with `use`.**
3.  **snake_case for Everything Else:** Use `snake_case` (e.g., `my_variable`, `function_name`) for all other variables, functions, and file names (except hook files which should match the hook name).
4.  **Short, Self-Explanatory Variable Names:** Use concise, clear variable names that are standard and self-explanatory (e.g., `i` for loop counters, `idx` for index, `len` for length, `num` for number). Avoid overly verbose names like `stack_index`.
5.  **No Single-Line Definitions:** Avoid defining multiple variables on a single line (e.g., `float x=1,y=2;`). Each variable definition should have its own line for clarity.
