export default class EditorJsInlineDel {
    static get CSS(): string;
    api: any;
    button: any;
    tag: any;
    iconClasses: any;
    constructor({ api }: any);
    static get isInline(): boolean;
    render(): any;
    surround(range: any): void;
    wrap(range: any): void;
    unwrap(termWrapper: any): void;
    checkState(): void;
    get toolboxIcon(): string;
    static get sanitize(): {
        del: {
            class: string;
        };
    };
}
