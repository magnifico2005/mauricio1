module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/manifest.webmanifest": "manifest.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/.htaccess": ".htaccess" });

  eleventyConfig.addFilter("formatDate", (isoDate) => {
    const d = new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  });

  eleventyConfig.addFilter("isoDate", (isoDate) => isoDate);

  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/blog/*/*.njk").sort((a, b) => {
      return new Date(b.data.datePublished) - new Date(a.data.datePublished);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "xml", "txt"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
