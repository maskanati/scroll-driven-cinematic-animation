module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        'unused-imports',
        'prettier',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        'unused-imports/no-unused-imports': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'import/order': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
