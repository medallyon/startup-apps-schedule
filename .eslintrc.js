module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"brace-style": [
			"error",
			"allman",
			{ allowSingleLine: true }
		],
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-trailing-spaces": "error",
		"space-before-function-paren": ["error", "never"],
	},
	"globals": {
		"global": true,
		"__filename": true,
		"__dirname": true,
	}
};
