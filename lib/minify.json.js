/**
 * minify.json.js
 * faster state-machine based json-minify.js
 * original version: https://raw.github.com/danielyule/JSON.minify/
 * MIT License
 */
var PARSER_STATE = {
	WHITESPACE: 0,
	NON_WHITESPACE: 1,
	SINGLE_SLASH: 2,
	SINGLE_SLASH_AFTER_WHITESPACE: 3,
	MULTI_LINE_COMMENT: 4,
	MULTI_LINE_COMMENT_STAR : 5,
	SINGLE_LINE_COMMENT:6,
	IN_STRING : 7,
	ESCAPE_CHAR_IN_STRING: 8
};
function minify(json) {
	var state = PARSER_STATE.WHITESPACE,
	index,
	length = json.length,
	char,
	copyStart = 0,
	minified = "";

	for(index = 0; index < length; index++) {
		char = json[index];
		switch(state) {
		case PARSER_STATE.WHITESPACE:
			if(char !== ' ' && char !== '\n' && char !== '\r' && char !== '\t') {
				copyStart = index;
				if(char === '/') {
					state = PARSER_STATE.SINGLE_SLASH_AFTER_WHITESPACE;
				} else if(char === '"'|| char === '\'') {
					state = PARSER_STATE.IN_STRING;
				} else {
					state = PARSER_STATE.NON_WHITESPACE;
				}
			}
			break;
		case PARSER_STATE.NON_WHITESPACE:
			if(char !== ' ' && char !== '\n' && char !== '\r' && char !== '\t') {
				if(char === '/') {
					state = PARSER_STATE.SINGLE_SLASH;
				} else if(char === '"'|| char === '\'') {
					state = PARSER_STATE.IN_STRING;
				} else {
					state = PARSER_STATE.NON_WHITESPACE;
				}
			} else {
				minified += json.substr(copyStart, index - copyStart);
				state = PARSER_STATE.WHITESPACE;
			}
			break;
		case PARSER_STATE.SINGLE_SLASH:
			if(char === '*') {
				minified += json.substr(copyStart, index - copyStart - 1);
				state = PARSER_STATE.MULTI_LINE_COMMENT;
			} else if (char === '/') {
				minified += json.substr(copyStart, index - copyStart - 1);
				state = PARSER_STATE.SINGLE_LINE_COMMENT;
			} else if(char === '"'|| char === '\'') {
				state = PARSER_STATE.IN_STRING;
			} else if(char !== ' ' && char !== '\n' && char !== '\r' && char !== '\t') {
				state = PARSER_STATE.NON_WHITESPACE;
			} else {
				minified += json.substr(copyStart, index - copyStart);
				state = PARSER_STATE.WHITESPACE;
			}
			break;

		case PARSER_STATE.SINGLE_SLASH_AFTER_WHITESPACE:
			if(char === '*') {
				state = PARSER_STATE.MULTI_LINE_COMMENT;
			} else if (char === '/') {
				state = PARSER_STATE.SINGLE_LINE_COMMENT;
			} else if(char === '"'|| char === '\'') {
				state = PARSER_STATE.IN_STRING;
			} else if(char !== ' ' && char !== '\n' && char !== '\r' && char !== '\t') {
				state = PARSER_STATE.NON_WHITESPACE;
			} else {
				minified += json.substr(copyStart, index - copyStart);
				state = PARSER_STATE.WHITESPACE;
			}
			break;

		case PARSER_STATE.MULTI_LINE_COMMENT:
			if(char === '*') {
				state = PARSER_STATE.MULTI_LINE_COMMENT_STAR;
			}
			break;
		case PARSER_STATE.MULTI_LINE_COMMENT_STAR:
			if(char === '/') {
				state = PARSER_STATE.WHITESPACE;
			} else {
				state = PARSER_STATE.MULTI_LINE_COMMENT;
			}
			break;
		case PARSER_STATE.SINGLE_LINE_COMMENT:
			if(char === '\n' || char === '\r') {
				state = PARSER_STATE.WHITESPACE;
			}
			break;
		case PARSER_STATE.IN_STRING:
			if(char === '"' || char === '\'') {
				state = PARSER_STATE.NON_WHITESPACE;
			} else if(char === '\\') {
				state = PARSER_STATE.ESCAPE_CHAR_IN_STRING;
			}
			break;
		case PARSER_STATE.ESCAPE_CHAR_IN_STRING:
			state = PARSER_STATE.IN_STRING;
			break;
		}
	}
	if(state === PARSER_STATE.NON_WHITESPACE) {
		minified += json.substr(copyStart);
	}
	return minified;
}

module.exports = minify;
