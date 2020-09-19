/// <reference types="codemirror" />
import * as Types from "./editorjs-smde.type";
export default class EditorSMDE {
    static defaultToolBar: Types.MarkdownEditorToolBarConfig;
    api: any;
    data: {
        text: any;
    };
    config: any;
    $editor: null | Types.SimpleMarkdownEditor;
    get codemirror(): import("codemirror").EditorFromTextArea | undefined;
    static get toolbox(): {
        icon: string;
        title: string;
    };
    static get contentless(): boolean;
    static get enableLineBreaks(): boolean;
    get CSS(): {
        baseClass: any;
        wrapper: string;
        input: any;
        textarea: string;
    };
    private get _editorConfig();
    private _getMdToHtml;
    private _getDomHtml;
    constructor({ data, config, api }: any);
    appendCallback(): void;
    render(): any;
    save(codeElement: any): {
        text: any;
    } & {
        text: string | Types.SimpleMarkdownEditor;
    };
    static get sanitize(): {
        text: boolean;
    };
    _make(tagName: any, classNames?: any, attributes?: any): any;
}
