import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    rules:{
      'react/react-in-jsx-scope': 'off',
      //React 17 버전 이후로는 React를 import 하지 않아도 JSX 문법을 사용할 수 있기 때문에,
      //해당 규칙을 끄는 설정입니다.
      'react/prop-types': 'off',
    }
  }
]);
