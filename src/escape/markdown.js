/**
 * Escapes all Discord markdown. Any of *, _, `, ~~, \, ||, > gets a backslash inserted before it.
 * @param {string} string The unescaped text
 * @returns {string} The input text, but with all markdown that is possible in usernames escaped
 */
export function escapeMarkdown(string) {
    return string.replace(/(\*|_|`|~~|\\|\|\||^> |^>>> )/gm, '\\$1');
}

/**
 * Escapes Discord codeblock markdown
 * @param {string} string The text to escape
 * @returns The text, with codeblocks escaped
 */
export function escapeCode(string) {
    return string.replace(/(`)/g, '\\$1');
}
