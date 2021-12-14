module.exports = {
  root: true,
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        project: [
          "tsconfig.json",
          "tsconfig.app.json",
          "tsconfig.spec.json",
          "cypress/tsconfig.json"
        ],
        tsconfigRootDir: __dirname
      },
      extends: [
        "./eslint-config-angular-typescript-base.json"
      ],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "./eslint-config-angular-template-base.json"
      ],
      rules: {}
    }
  ]
}
