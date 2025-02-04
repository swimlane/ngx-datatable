module.exports = {
  root: true,

  ignorePatterns: ['dist/**/*', 'cypress/**/*'],

  extends: ['@swimlane', 'prettier'],

  rules: {},

  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      extends: [
        '@swimlane/eslint-config/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier'
      ],
      rules: {
        // off for demo packages
        'no-console': 'off',

        // fix these in this repo, off for now
        'guard-for-in': 'off',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-output-native': 'off',
        '@angular-eslint/component-class-suffix': 'off',
        '@angular-eslint/directive-class-suffix': 'off',
        '@angular-eslint/no-output-on-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    }
  ]
};
