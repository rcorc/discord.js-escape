/**
 * Escapes all mentions within the given string. Consistent placement makes all backslashes appear
 * before the mention. With it off, backslashes for user and role mentions are placed within the
 * mention so the text does not create a ping.
 * Example input/output:
 * <#1234> => \<#1234>
 * With consistentPlacement off: <@1234> => <\@1234>
 * With consistentPlacement on: <@&1234> => \<@&1234>
 * @param {string} string The text to escape
 * @param {boolean} consistentPlacement If true, places the backslash(es) for user and role mentions
 *     before the mention. If false, places them within the mention
 * @returns The text, escaped
 */
export function escapeMentions(string, consistentPlacement) {
    return consistentPlacement
        ? string.replace(/(<(?:#|@&?|a?:\w+:|(?:\/[\w-](?:[\w-]| (?! )){0,30}(?<! )[\w-]?:))\d+>)/g, '\\$1')
        : (
            string
                .replace(/(<(?:#|a?:\w+:|(?:\/[\w-](?:[\w-]| (?! )){0,30}(?<! )[\w-]?:))\d+>)/g, '\\$1')
                .replace(/<(@&?\d+>)/g, '<\\$1')
        );
}

/**
 * Escapes channel mentions within a string. Channel mentions look like <#1234567890>
 */
export function escapeChannelMentions(string) {
    return string.replace(/<#\d+>/g, '\\$1');
}

/**
 * Escapes command mentions within a string. Command mentions look like </ping:1234567890>
 */
export function escapeCommandMentions(string) {
    return string.replace(/<\/[-_a-zA-Z0-9]{1,32}:\d+>/g, '\\$1');
}

/**
 * Escapes emoji mentions within a string. Emoji mentions look like <:name:1234567890> or
 * <a:name:1234567890>
 */
export function escapeEmojiMentions(string) {
    return string.replace(/(<a?:\w+:\d+>)/g, '\\$1');
}

/**
 * Escapes role mentions within a string. Role mentions look like <@&1234567890>. Consistent
 * placement makes all backslashes appear before the mention. With it off, backslashes for role
 * mentions are placed within the mention so the text does not create a ping.
 */
export function escapeRoleMentions(string, consistentPlacement) {
    return consistentPlacement
        ? string.replace(/(<@&\d+>)/g, '\\$1')
        : string.replace(/<(@&\d+>)/g, '<\\$1');
}

/**
 * Escapes user mentions within a string. User mentions look like <@1234567890>. Consistent
 * placement makes all backslashes appear before the mention. With it off, backslashes for user
 * mentions are placed within the mention so the text does not create a ping.
 */
export function escapeUserMentions(string, consistentPlacement) {
    return consistentPlacement
        ? string.replace(/(<@\d+>)/g, '\\$1')
        : string.replace(/<(@\d+>)/g, '<\\$1');
}
