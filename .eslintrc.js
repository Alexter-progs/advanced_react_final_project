module.exports = {
	parser: '@typescript-eslint/parser',
	root: true,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
		project: './tsconfig.json',
		tsconfigRootDir: './',
	},
	plugins: ["boundaries", "@typescript-eslint", "import"],
	settings: {
		'import/resolver': {
			typescript: {}
		},
		react: {
			version: 'detect',
		},
		'boundaries/elements': [
			{ type: 'pages', pattern: 'pages/*' },
			{ type: 'widgets', pattern: 'widgets/*' },
			{ type: 'features', pattern: 'features/*' },
			{ type: 'entities', pattern: 'entities/*' },
			{ type: 'shared', pattern: 'shared/*' },
		],
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:eslint-comments/recommended',
		"plugin:boundaries/recommended"
	],
	rules: {
		semi: [2, 'always'],
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'import/order': [
			'error',
			{
				pathGroups: [
					{ pattern: 'react', group: 'builtin' },
					{ pattern: '~shared/**', group: 'internal' },
					{ pattern: '~entities/**', group: 'internal' },
					{ pattern: '~features/**', group: 'internal' },
					{ pattern: '~widgets/**', group: 'internal' },
					{ pattern: '~pages/**', group: 'internal' },
				],
			},
		],
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: [
							'~shared/*/*/**',
							'~entities/*/**',
							'~features/*/**',
							'~widgets/*/**',
							'~pages/*/**',
							'~app/**',
						],
						message: 'Direct access to private modules is restricted',
					},
					{
						group: [
							'../**/shared',
							'../**/entities',
							'../**/features',
							'../**/widgets',
							'../**/pages',
							'../**/app',
						],
						message: 'Prefer absolute imports instead of relatives',
					},
				],
			},
		],
		'boundaries/dependencies': [
			2,
			{
				default: 'disallow',
				rules: [
					{
						from: {type: 'pages'},
						allow: [
							{to: {type: 'widgets'}},
							{to: {type: 'features'}},
							{to: {type: 'entities'}},
							{to: {type: 'shared'}}
						],
					},
					{ from: {type: 'widgets'}, allow: [{to: {type: 'features'}}, {to: {type: 'entities'}}, {to: {type: 'shared'}}] },
					{ from: {type: 'features'}, allow: [{to: {type: 'entities'}}, {to: {type: 'shared'}}] },
					{ from: {type: 'entities'}, allow: [{to: {type: 'shared'}}] },
					{ from: {type: 'shared'}, allow: [{to: {type: 'shared'}}] },
				],
			},
		],
	},
};
