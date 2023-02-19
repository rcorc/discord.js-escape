import { escapeMarkdown } from '../src/escape/markdown.js';

describe('Combined markdown escape', () => {
    test('basic markdown', () => {
        expect(escapeMarkdown('*italics*')).toBe('\\*italics\\*');
        expect(escapeMarkdown('_italics_')).toBe('\\_italics\\_');
        expect(escapeMarkdown('**bold**')).toBe('\\*\\*bold\\*\\*');
        expect(escapeMarkdown('***bold italics***')).toBe('\\*\\*\\*bold italics\\*\\*\\*');
        expect(escapeMarkdown('__underline__')).toBe('\\_\\_underline\\_\\_');
        expect(escapeMarkdown('__*underline italics*__')).toBe('\\_\\_\\*underline italics\\*\\_\\_');
        expect(escapeMarkdown('__**underline bold**__')).toBe('\\_\\_\\*\\*underline bold\\*\\*\\_\\_');
        expect(escapeMarkdown('__***underline bold italics***__')).toBe('\\_\\_\\*\\*\\*underline bold italics\\*\\*\\*\\_\\_');
        expect(escapeMarkdown('~~Strikethrough~~')).toBe('\\~~Strikethrough\\~~');
        expect(escapeMarkdown('`code`')).toBe('\\`code\\`');
        expect(escapeMarkdown('```multiline code```')).toBe('\\`\\`\\`multiline code\\`\\`\\`');
        expect(escapeMarkdown('```js multiline code```')).toBe('\\`\\`\\`js multiline code\\`\\`\\`');
        expect(escapeMarkdown('||spoiler||')).toBe('\\||spoiler\\||');
        expect(escapeMarkdown('> block quote')).toBe('\\> block quote');
        expect(escapeMarkdown('>>> multiline block quote')).toBe('\\>>> multiline block quote');
    });
    test('tricky markdown gotchas', () => {
        expect(escapeMarkdown('\\||spoiler preceded by backslash||')).toBe('\\\\\\||spoiler preceded by backslash\\||');
        expect(escapeMarkdown('\\\\double backslash')).toBe('\\\\\\\\double backslash');
        expect(escapeMarkdown('\\\\||spoiler preceded by two backslashes||')).toBe('\\\\\\\\\\||spoiler preceded by two backslashes\\||');
    });
    it('escapes single line quotes only at the beginning of lines', () => {
        expect(escapeMarkdown('txt> quote')).toBe('txt> quote');
        expect(escapeMarkdown('txt > quote')).toBe('txt > quote');
        expect(escapeMarkdown('   > quote')).toBe('   > quote');
        expect(escapeMarkdown('txt\n> quote')).toBe('txt\n\\> quote');
    });
    it('escapes multiline quotes only at the beginning of lines', () => {
        expect(escapeMarkdown('txt>>> multiline quote')).toBe('txt>>> multiline quote');
        expect(escapeMarkdown('txt >>> multiline quote')).toBe('txt >>> multiline quote');
        expect(escapeMarkdown('   >>> multiline quote')).toBe('   >>> multiline quote');
        expect(escapeMarkdown('txt\n>>> multiline quote')).toBe('txt\n\\>>> multiline quote');
    });
    it('escapes a quote inside a multiline quote', () => {
        expect(escapeMarkdown('>>> quote\nquote\n> quote')).toBe('\\>>> quote\nquote\n\\> quote');
    });
    it("doesn't escape non-markdown", () => {
        expect(escapeMarkdown('|spoiler|')).toBe('|spoiler|');
        expect(escapeMarkdown('>block quote')).toBe('>block quote');
        expect(escapeMarkdown('>>>multiline block quote')).toBe('>>>multiline block quote');
    });
    it("doesn't escape mentions", () => {
        expect(escapeMarkdown('<@1234567890123456789>')).toBe('<@1234567890123456789>');
        expect(escapeMarkdown('<@1234567890123456789> txt')).toBe('<@1234567890123456789> txt');
        expect(escapeMarkdown('</ping:1234567890123456789> txt')).toBe('</ping:1234567890123456789> txt');
    });
});
