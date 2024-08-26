import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import stylistic from "@stylistic/eslint-plugin"

export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    "indent": 2,
    "quotes": "double",
    "semi": false,
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "skipBlankLines": true,
  }),
]
