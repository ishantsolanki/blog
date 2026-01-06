declare module "@11ty/eleventy" {
  export interface UserConfig {
    addExtension(
      extension: string,
      options: {
        outputFileExtension?: string;
        useLayouts?: boolean;
        key?: string;
        compile?: (
          this: {
            config: { dir: { includes: string } };
            addDependencies: (inputPath: string, urls: URL[]) => void;
          },
          inputContent: string,
          inputPath: string
        ) => Promise<(() => Promise<string>) | undefined>;
      }
    ): void;
    addTemplateFormats(formats: string | string[]): void;
    addPassthroughCopy(path: string | Record<string, string>): void;
    addFilter(name: string, callback: (...args: unknown[]) => unknown): void;
    addShortcode(name: string, callback: (...args: unknown[]) => string): void;
    addPairedShortcode(
      name: string,
      callback: (content: string, ...args: unknown[]) => string
    ): void;
    addCollection(
      name: string,
      callback: (collectionApi: unknown) => unknown[]
    ): void;
    addPlugin(plugin: unknown, options?: unknown): void;
    setDataDeepMerge(deepMerge: boolean): void;
    dir: {
      input?: string;
      output?: string;
      includes?: string;
      layouts?: string;
      data?: string;
    };
  }
}
