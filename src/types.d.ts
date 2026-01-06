declare module 'remark-wiki-link';
declare module 'slugify';
declare module '*.mdx' {
  import { ReactNode } from 'react';
  let MDXComponent: (props: any) => ReactNode;
  export default MDXComponent;
}
