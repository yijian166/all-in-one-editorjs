import { EditorFromTextArea } from 'codemirror';
export interface MarkdownEditorFieldProps extends MarkdownEditorProps {
    value?: string;
    onChange?: (value: string, html: string) => void;
}
export interface MarkdownEditorProps {
    editorConfig?: MarkdownEditorConfig;
    height?: number;
    minHeight?: number;
    initialValue?: string;
    toolbar?: MarkdownEditorToolbar;
    outputDOMPurify?: boolean;
    previewDOMPurify?: boolean;
    imageUploadFun?: (file: File) => Promise<string>;
}
export declare type MarkdownEditorToolbar = boolean | MarkdownEditorToolBarConfig;
export declare type MarkdownEditorToolBarConfig = (MarkdownEditorToolBarName | '|' | MarkdownEditorToolBarItem)[];
export interface MarkdownEditorToolBarItem {
    name: MarkdownEditorToolBarName | string;
    action?: ((editor: SimpleMarkdownEditor) => void) | string;
    className?: string;
    title?: string;
}
export declare type MarkdownEditorToolBarName = 'bold' | 'italic' | 'strikethrough' | 'heading' | 'heading-smaller' | 'heading-bigger' | 'heading-1' | 'heading-2' | 'heading-3' | 'code' | 'quote' | 'unordered-list' | 'ordered-list' | 'clean-block' | 'link' | 'image' | 'choose-image' | 'table' | 'horizontal-rule' | 'preview' | 'side-by-side' | 'fullscreen' | 'undo' | 'redo' | 'guide';
export interface SimpleMarkdownEditor extends ToolBarFuncs {
    codemirror: EditorFromTextArea;
    value: (value?: string) => SimpleMarkdownEditor | string;
    isPreviewActive: () => boolean;
    isSideBySideActive: () => boolean;
    isFullscreenActive: () => boolean;
    getState: () => any;
    toTextArea: () => void;
    _replaceSelection: (cm: any, active: any, startEnd: any, url: any) => void;
}
export declare type MarkdownEditorToolbarFuncName = 'toggleBold' | 'toggleItalic' | 'toggleStrikethrough' | 'toggleBlockquote' | 'toggleHeadingSmaller' | 'toggleHeadingBigger' | 'toggleHeading1' | 'toggleHeading2' | 'toggleHeading3' | 'toggleCodeBlock' | 'toggleUnorderedList' | 'toggleOrderedList' | 'cleanBlock' | 'drawLink' | 'drawImage' | 'drawTable' | 'drawHorizontalRule' | 'undo' | 'redo' | 'togglePreview' | 'toggleSideBySide' | 'toggleFullScreen';
export declare type ToolBarFuncs = {
    [key in MarkdownEditorToolbarFuncName]: (editor: SimpleMarkdownEditor) => void;
};
export interface MarkdownEditorConfig {
    autofocus?: boolean;
    autosave?: MarkdownEditorOptionAutoSave;
    blockStyles?: MarkdownEditorOptionBlockStyles;
    forceSync?: boolean;
    indentWithTabs?: boolean;
    insertTexts?: MarkdownEditorOptionInsertTextsRules;
    lineWrapping?: boolean;
    parsingConfig?: MarkdownEditorOptionParsingConfig;
    placeholder?: string;
    previewRender?: (plainText: string) => string;
    promptURLs?: boolean;
    renderingConfig?: MarkdownEditorRenderingConfig;
    shortcuts?: MarkdownEditorShortcuts;
    status: MarkdownEditorStatus;
    styleSelectedText?: boolean;
    tabSize?: number;
    toolbar?: boolean;
}
export declare type MarkdownEditorShortcuts = {
    [key in keyof MarkdownEditorShortcutsKey]: string;
};
export declare type MarkdownEditorStatus = false | ('autosave' | 'lines' | 'words' | 'cursor' | {
    className: string;
    defaultValue: (el: HTMLElement) => void;
    onUpdate: (el: HTMLElement) => void;
})[];
export declare type MarkdownEditorShortcutsKey = 'toggleBlockquote' | 'toggleBold' | 'cleanBlock' | 'toggleHeadingSmaller' | 'toggleItalic' | 'drawLink' | 'toggleUnorderedList' | 'togglePreview' | 'toggleCodeBlock' | 'drawImage' | 'toggleOrderedList' | 'toggleHeadingBigger' | 'toggleSideBySide' | 'toggleFullScreen';
export interface MarkdownEditorRenderingConfig {
    singleLineBreaks?: boolean;
    codeSyntaxHighlighting?: boolean;
}
export interface MarkdownEditorOptionParsingConfig {
    allowAtxHeaderWithoutSpace?: boolean;
    strikethrough?: boolean;
    underscoresBreakWords?: boolean;
}
export interface MarkdownEditorOptionInsertTextsRules {
    horizontalRule?: [string, string];
    image?: [string, string];
    link?: [string, string];
    table?: [string, string];
}
export interface MarkdownEditorOptionBlockStyles {
    bold?: '**' | '__';
    code?: '' | '';
    italic?: '' | '';
}
export interface MarkdownEditorOptionAutoSave {
    enabled?: boolean;
    delay?: number;
    uniqueId: string;
}
