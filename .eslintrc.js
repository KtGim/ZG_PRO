module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures":  {
            "jsx":  true,  // JSX兼容
        },
        "requireConfigFile": false // 配置文件不校验
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "multi-word-component-names": true //必须驼峰
    },
    "settings":  {
        "react":  {
          "version":  'detect',  // 告诉eslint-plugin-react自动检测最新版本的react
        },
    }
}
