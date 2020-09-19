import 'codemirror/lib/codemirror.css';
import './code.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/css/css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/php/php';
import 'codemirror/mode/r/r';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/go/go';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/elm/elm';
import 'codemirror/mode/nginx/nginx';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/yaml/yaml';
export default class EditorCodeMirror {
    api: any;
    textPlaceholder: any;
    languagePlaceholder: any;
    format: any;
    data: {
        language?: any;
        text: any;
    };
    codemirror: any;
    language: any;
    static get toolbox(): {
        icon: string;
        title: string;
    };
    static get contentless(): boolean;
    static get enableLineBreaks(): boolean;
    static get DEFAULT_CODE_PLACEHOLDER(): string;
    static get DEFAULT_LANGUAGE_PLACEHOLDER(): string;
    static get DEFAULT_FORMAT_CONFIG(): string[];
    get CSS(): {
        baseClass: any;
        wrapper: string;
        input: any;
        language: string;
        textarea: string;
    };
    constructor({ data, config, api }: any);
    appendCallback(): void;
    render(): any;
    onPaste(event: any): void;
    save(codeElement: any): {
        language?: any;
        text: any;
    } & {
        text: any;
        language: any;
    };
    static get sanitize(): {
        language: boolean;
        text: boolean;
    };
    _make(tagName: any, classNames?: any, attributes?: any): any;
    static get pasteConfig(): {
        tags: string[];
    };
}
