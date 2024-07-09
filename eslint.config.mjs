import globals from "globals";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2018,
      sourceType: "commonjs",
    },
  },
  {
    files: ["*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  prettierConfig,
];
