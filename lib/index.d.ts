import EditorJS, { EditorConfig } from "@editorjs/editorjs";
export { EditorConfig, ToolSettings } from "@editorjs/editorjs";
declare class AIOEditorJs extends EditorJS {
    static get DefaultTools(): {
        [toolName: string]: import("@editorjs/editorjs").BlockToolConstructable | import("@editorjs/editorjs").InlineToolConstructable | import("@editorjs/editorjs").ToolSettings;
    };
    constructor(config: EditorConfig, hideTools?: string[]);
}
export default AIOEditorJs;
