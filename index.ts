import { EditorConfig } from "@editorjs/editorjs";
import * as Delimiter from "@editorjs/delimiter";
import * as Header from "@editorjs/header";
import * as ImageTool from "@editorjs/image";
import * as InlineCode from "@editorjs/inline-code";
import * as LinkTool from "@editorjs/link";
import * as List from "@editorjs/list";
import * as Marker from "@editorjs/marker";
import * as Quote from "@editorjs/quote";
import * as Table from "@editorjs/table";
import* as  Embed from "@editorjs/embed";
import* as  Underline from "@editorjs/underline";
// import RawTool from '@editorjs/raw';
import * as Warning from "@editorjs/warning";
import * as Checklist from "@editorjs/checklist";
import EditorCodeMirror from "./src/editorjs-codemirror";
import EditorJsInlineDel from "./src/editorjs-inline-del";
import EditorSMDE from "./src/editorjs-smde";
export { EditorConfig, ToolSettings } from "@editorjs/editorjs";
import * as EditorJS from '@editorjs/editorjs' 
const DefaultTools: EditorConfig["tools"] = {
  header: {
    class: Header,
    inlineToolbar: false, //TODO: has some issue
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  del: EditorJsInlineDel,
  underline: Underline,
  list: {
    class: List,
    inlineToolbar: true,
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "/api/fetchUrl", // Your backend endpoint for url data fetching
    },
  },
  code: {
    class: EditorCodeMirror,
    config: {
      languagePlaceholder: "javacript",
    },
  },
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C",
  },
  delimiter: Delimiter,
  Marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  // embed: Embed,
  embed: {
    class: Embed,
    inlineToolbar: true,
    config: {
      services: {
        youtube: true,
        coub: true,
        codepen: true, //https://codesandbox.io/s/charming-sky-ub3hb
        codesandbox: {
          regex: /https?:\/\/codesandbox\.io\/s\/([^\/\?\&]*)(.*)/,
          embedUrl:
            "https://codesandbox.io/embed/<%= remote_id %>?fontsize=14&hidenavigation=1&theme=dark",
          html:
            "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          height: 300,
          width: 600,
          // id: (ids: string[]) => ids.join(''),
        },
        stackblitz: {
          // regex: /https?:\/\/stackblitz\.com\/edit\/([^\/\?\&]*)/,
          regex: /https?:\/\/stackblitz\.com\/edit\/([^\/\?\&]*)(.*)/,
          embedUrl:
            "https://stackblitz.com/edit/<%= remote_id %>?embed=1&file=index.tsx&theme=dark",
          html:
            "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          height: 300,
          width: 600,
          // id: (ids: string[]) => iss.join(''),
        },
      },
    },
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  // urlImage: SimpleImage,
  // raw: RawTool, //TODO:
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+W",
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  image: {
    class: ImageTool,
    config: {},
  },
  md: {
    class: EditorSMDE,
    config: {},
  },
};
// type QuickConfig = {
//   [K in keyof typeof DefaultTools]: Partial<ToolSettings>
// }
class AIOEditorJs extends (EditorJS as any) {
  static get DefaultTools() {
    return DefaultTools!
  }   
  constructor(config: EditorConfig,hideTools?:string[]) {
    const _defaultTooks = Object.keys(DefaultTools!).reduce((pre,cur)=> {
      if (!(hideTools ?? []).includes(cur)) {
        pre![cur] = DefaultTools![cur]
      }
      return pre
    }, {} as EditorConfig["tools"])
    super({
      ...config,
      tools: {
        ..._defaultTooks,
        ...config.tools,
      },
    });
  }
}

(window as any).AIOEditorJs = AIOEditorJs;

export default AIOEditorJs
