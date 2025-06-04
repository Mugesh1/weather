import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';
import * as Prism from 'prismjs';

// Import desired Prism languages
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

// Fix: force-cast to any to work around missing 'highlight' in MarkedOptions types
(marked as any).setOptions({
  highlight: (code: string, lang: string): string => {
    const normalizedLang = lang === 'js' ? 'javascript' : lang;
    const grammar = Prism.languages[normalizedLang] || Prism.languages['javascript'];
    return Prism.highlight(code, grammar, normalizedLang);
  },
});

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string = ''): Promise<string> {
    return Promise.resolve(marked.parse(value));
  }
}
