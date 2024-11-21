import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact, { rules } from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {"rules": {
    "no-unused-vars": "warn",
    "no-invalid-this": "error"
  }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];