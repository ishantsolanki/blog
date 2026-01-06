import path from "path";
import * as sass from "sass";

export default function (eleventyConfig: any) {
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent: string, inputPath: string) {
      let parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async () => {
        return result.css;
      };
    },
  });

  eleventyConfig.addExtension("11ty.ts", {
    key: "11ty.ts",
  });

  eleventyConfig.addTemplateFormats("11ty.ts");

  eleventyConfig.addTemplateFormats("scss");

  // Add date filter for templates
  eleventyConfig.addFilter("date", (dateObj: Date, format: string) => {
    if (format === "%Y-%m-%d") {
      return dateObj.toISOString().split("T")[0];
    }

    if (format === "%B %d, %Y") {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    if (format === "%Y") {
      return dateObj.getFullYear().toString();
    }

    return dateObj.toLocaleDateString();
  });
}
