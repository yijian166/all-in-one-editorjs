import { EditorConfig } from "@editorjs/editorjs";
export { EditorConfig, ToolSettings } from "@editorjs/editorjs";
import * as EditorJS from '@editorjs/editorjs';
declare const AIOEditorJs_base: any;
declare class AIOEditorJs extends AIOEditorJs_base {
    static get DefaultTools(): {
        [toolName: string]: EditorJS.BlockToolConstructable | EditorJS.InlineToolConstructable | EditorJS.ToolSettings;
    };
    constructor(config: EditorConfig, hideTools?: string[]);
}
export default AIOEditorJs;
