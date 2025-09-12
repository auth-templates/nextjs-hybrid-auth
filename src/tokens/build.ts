import StyleDictionary from 'style-dictionary';

// ---------------------------------------------
// Header comment for all generated CSS files
// ---------------------------------------------
const HEADER_COMMENT = `/**
* Do not edit directly, this file was auto-generated.
 */\n\n`;

// ---------------------------------------------
// Build light theme colors
// ---------------------------------------------
const styleDictionaryLight = new StyleDictionary(
	{
		source: ['src/tokens/colors/light.json'],
		platforms: {
			css: {
				transformGroup: 'css',
				// Output directly to public/tokens
				buildPath: 'public/tokens/',
				files: [
					{
						destination: 'colors-light.css',
						format: 'css/variables-light',
						options: {
							outputReferences: true,
						},
					},
				],
			},
		},
	},
	{ verbosity: 'verbose' }
);

// Custom format for light theme variables
StyleDictionary.hooks.formats['css/variables-light'] = function ({ dictionary }) {
	const tokens = dictionary.allTokens.filter((token) => token.filePath.includes('light'));
	const variables = tokens
		.map((token) => {
			const { name, comment, value } = token;
			return `    --${name}: ${value};${comment ? ` /* ${comment} */` : ''}`;
		})
		.join('\n');

	return `${HEADER_COMMENT}:root {\n${variables}\n}`;
};

// Build the light theme CSS
styleDictionaryLight.buildAllPlatforms();

// ---------------------------------------------
// Build dark theme colors
// ---------------------------------------------
const styleDictionaryDark = new StyleDictionary(
	{
		source: ['src/tokens/colors/dark.json'],
		platforms: {
			css: {
				transformGroup: 'css',
				// Output directly to public/tokens
				buildPath: 'public/tokens/',
				files: [
					{
						destination: 'colors-dark.css',
						format: 'css/variables-dark',
						options: {
							outputReferences: true,
						},
					},
				],
			},
		},
	},
	{ verbosity: 'verbose' }
);

// Custom format for dark theme variables
StyleDictionary.hooks.formats['css/variables-dark'] = function ({ dictionary }) {
	const tokens = dictionary.allTokens.filter((token) => token.filePath.includes('dark'));
	const variables = tokens
		.map((token) => {
			const { name, comment, value } = token;
			return `    --${name}: ${value};${comment ? ` /* ${comment} */` : ''}`;
		})
		.join('\n');

	return `${HEADER_COMMENT}:root {\n${variables}\n}`;
};

// Build the dark theme CSS
styleDictionaryDark.buildAllPlatforms();

// ---------------------------------------------
// Build foundation tokens (spacing, radius, breakpoints)
// ---------------------------------------------
const foundation = new StyleDictionary({
	source: ['src/tokens/foundation/*.json'],
	platforms: {
		css: {
			transformGroup: 'css',
			// Output directly to public/tokens
			buildPath: 'public/tokens/',
			files: [
				{
					destination: 'foundation.css',
					format: 'css/variables',
				},
			],
		},
	},
});

// Build the foundation CSS
foundation.buildAllPlatforms();
