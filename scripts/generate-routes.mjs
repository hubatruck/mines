import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";

const ROOT = process.cwd();
const ROUTES = path.join(ROOT, "src/routes");
const OUTPUT = path.join(ROOT, "src/generated-routes.ts");

const files = await fg("**/*.{js,jsx,ts,tsx}", {
  cwd: ROUTES,
  onlyFiles: true,
  ignore: ["**/*.test.*", "**/*.spec.*"],
});

function ext(file) {
  return file.replace(/\.(jsx?|tsx?)$/, "");
}

function routePath(file) {
  const name = ext(file.replaceAll("\\", "/"));

  // _index.tsx = index route
  if (name === "_index") {
    return null;
  }

  return name
    .split(".")
    .filter((part) => part !== "_index")
    .map((part) => {
      // $ -> splat
      if (part === "$") {
        return "*";
      }

      // $id -> :id
      if (part.startsWith("$")) {
        return `:${part.slice(1)}`;
      }

      // _foo = pathless (ignore the URL segment)
      if (part.startsWith("_")) {
        return null;
      }

      return part;
    })
    .filter(Boolean)
    .join("/");
}

function isIndex(file) {
  return ext(file).split(".").at(-1) === "_index";
}

const routes = files
  .filter((file) => !file.endsWith("root.tsx"))
  .map((file, i) => ({
    file: file.replaceAll("\\", "/"),
    importName: `Route${i}`,
    path: routePath(file),
    index: isIndex(file),
  }))
  .sort((a, b) => a.file.localeCompare(b.file));

const imports = routes
  .map((r) => {
    const file = r.file.replace(/\.(jsx?|tsx?)$/, "");

    return `import * as ${r.importName} from "./routes/${file}";`;
  })
  .join("\n");

const routeModuleType = `
type RouteModule = {
  default?: React.ComponentType<any>;
  Component?: React.ComponentType<any>;

  loader?: RouteObject["loader"];
  action?: RouteObject["action"];

  ErrorBoundary?: React.ComponentType<any>;
  HydrateFallback?: React.ComponentType<any>;

  shouldRevalidate?: RouteObject["shouldRevalidate"];

  handle?: unknown;
};
`;

const routeFactory = `
function createRoute(module: RouteModule): RouteObject {
  return {
    ...(module.Component
      ? { Component: module.Component }
      : module.default
        ? { Component: module.default }
        : {}),

    ...(module.loader
      ? { loader: module.loader }
      : {}),

    ...(module.action
      ? { action: module.action }
      : {}),

    ...(module.ErrorBoundary
      ? { ErrorBoundary: module.ErrorBoundary }
      : {}),

    ...(module.HydrateFallback
      ? { HydrateFallback: module.HydrateFallback }
      : {}),

    ...(module.shouldRevalidate
      ? { shouldRevalidate: module.shouldRevalidate }
      : {}),

    ...(module.handle
      ? { handle: module.handle }
      : {}),
  };
}
`;

const routeObjects = routes
  .map((r) => {
    const route = r.index
      ? `{
          index: true,
          ...createRoute(${r.importName}),
        }`
      : `{
          path: ${JSON.stringify(r.path)},
          ...createRoute(${r.importName}),
        }`;

    return `      ${route},`;
  })
  .join("\n");

const output = `
// AUTO-GENERATED — DO NOT EDIT

import type { RouteObject } from "react-router";
import Root from "./root";

${imports}

${routeModuleType}

${routeFactory}

export const generatedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Root,
    children: [
${routeObjects}
    ],
  },
];
`;

fs.writeFileSync(OUTPUT, output.trimStart());

console.log(
  `Generated ${routes.length} routes -> ${path.relative(ROOT, OUTPUT)}`
);