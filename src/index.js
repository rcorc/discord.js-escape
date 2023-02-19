import { escapeCode, escapeMarkdown } from './escape/markdown.js';

/**
 * Escapes any Discord markdown in the input. Currently a wrapper for this.escapeUsernameMarkdown()
 * but this method exists for future expansion (e.g. sanitizing mentions out of messages)
 * @param {string} string The unescaped text
 * @returns {string} The input text, escaped
 */
function escape(string) {
    return escapeMarkdown(string);
}

export {
    escape,
    escapeMarkdown,
    escapeCode,
};
