module.exports = {
	root: true,
	plugins: ['unused-imports', 'sort-keys-fix'],
	extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals'],
	settings: {
		'import/resolver': 'webpack',
	},
	rules: {
		//=========================================================================
		// basic rules
		curly: 'error',
		'lines-between-class-members': ['error', 'always'],
		// Suppress to conflict to @typescript-eslint/explicit-member-accessibility
		'member-access': 'off',
		'no-console': 'error',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-dupe-keys': 'error',
		'no-eval': 'error',
		'no-restricted-imports': [
			'error',
			{
				patterns: ['*../**'],
			},
		],
		'no-restricted-syntax': ['error', 'TSEnumDeclaration'],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: 'function',
				next: 'function',
			},
			{
				blankLine: 'always',
				prev: 'block-like',
				next: 'block-like',
			},
		],
		'spaced-comment': [
			'error',
			'always',
			{
				line: {
					exceptions: ['-', '='],
				},
				block: {
					balanced: true,
				},
				markers: ['/'], // Suppress errors when use Triple-slash directives
			},
		],
		'react/display-name': 'error',

		//=========================================================================
		// react hooks
		'react-hooks/exhaustive-deps': [
			'warn',
			{
				enableDangerousAutofixThisMayCauseInfiniteLoops: true,
			},
		],
		//=========================================================================
		// import
		'import/no-duplicates': ['error'],
		'import/no-namespace': ['error'],
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
				},
				'newlines-between': 'never',
			},
		],
		//=========================================================================
		// unused-imports
		'unused-imports/no-unused-imports': 'error',
	},
};
