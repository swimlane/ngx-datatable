module.exports = {
  root: true,

  ignorePatterns: ['dist/**/*', 'cypress/**/*'],

  extends: ['@swimlane', 'prettier'],

  rules: {},

  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        'allowAutomaticSingleRunInference': true,
        project: [
          'tsconfig.json',
          'tsconfig.app.json',
          'tsconfig.spec.json',
          'cypress/tsconfig.json'
        ],
        tsconfigRootDir: __dirname
      },
      'extends': [
        '@swimlane/eslint-config/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:@typescript-eslint/recommended',
        'prettier'
      ],
      rules: {
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-forward-ref': 'error',
        '@angular-eslint/no-host-metadata-property': [
          'error',
          {
            'allowStatic': true
          }
        ],
        'brace-style': 'off',
        'no-bitwise': 'off',
        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'func-call-spacing': 'off',
        'indent': 'off',
        'keyword-spacing': 'off',
        'no-shadow': 'off',
        'no-duplicate-imports': 'error',
        'no-redeclare': 'off',
        'no-underscore-dangle': 'off',
        '@angular-eslint/directive-selector': [
          'error',
          {
            'type': 'attribute',
            'style': 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            'type': 'element',
            'style': 'kebab-case'
          }
        ],
        '@angular-eslint/no-input-rename': 'off',
        '@angular-eslint/directive-class-suffix': 'off',
        '@angular-eslint/no-output-native': 'off',
        '@angular-eslint/use-component-view-encapsulation': 'off',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/comma-spacing': 'off',
        '@typescript-eslint/func-call-spacing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/keyword-spacing': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-shadow': [
          'error',
          {
            'ignoreTypeValueShadow': true
          }
        ],
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/type-annotation-spacing': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'array-bracket-spacing': 'error',
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': 'off',
        'curly': 'error',
        'jsdoc/newline-after-description': 'off',
        'key-spacing': 'off',
        'no-empty': 'error',
        'no-irregular-whitespace': 'error',
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'object-curly-spacing': ['error', 'always'],
        'prefer-arrow/prefer-arrow-functions': 'off',
        'quote-props': ['error', 'consistent'],
        'semi-spacing': 'off',
        'space-in-parens': 'off',
        'space-infix-ops': 'off',
        'sort-imports': [
          'error',
          {
            'ignoreCase': true,
            'ignoreDeclarationSort': true
          }
        ],
        'prefer-spread': 'off',
        'prefer-rest-params': 'off'
      },
      'settings': {
        'import/ignore': ['node_modules']
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    }
  ]
};
