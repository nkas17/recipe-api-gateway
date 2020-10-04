module.exports = {
	extends: ['airbnb', 'prettier'],
	plugins: ['prettier'],
	env: {
		browser: true,
		commonjs: true,
		node: true,
		jest: true,
	},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'no-plusplus': 'off',
		'no-underscore-dangle': 'off',
		'import/prefer-default-export': 'off',
		quotes: [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'es5',
				singleQuote: true,
				printWidth: 80,
				useTabs: true,
			},
		],
	},
};
