import * as SimpleMDE from "simplemde";
import * as Types from "./editorjs-smde.type";
import { mdToHTML } from "./md";
// import 'simplemde/src/css/simplemde.css';
// import 'codemirror/lib/codemirror.css';

const ToolBarFuncs = [
  "toggleBold",
  "toggleItalic",
  "toggleStrikethrough",
  "toggleBlockquote",
  "toggleHeadingSmaller",
  "toggleHeadingBigger",
  "toggleHeading1",
  "toggleHeading2",
  "toggleHeading3",
  "toggleCodeBlock",
  "toggleUnorderedList",
  "toggleOrderedList",
  "cleanBlock",
  "drawLink",
  "drawImage",
  "drawTable",
  "drawHorizontalRule",
  "undo",
  "redo",
  "togglePreview",
  "toggleSideBySide",
  "toggleFullScreen",
].reduce((pre, cur) => {
  pre[cur as Types.MarkdownEditorToolbarFuncName] = SimpleMDE[cur]; // as ((editor: Types.SimpleMarkdownEditor) => void);
  return pre;
}, {} as Types.ToolBarFuncs);

const fullToolBar: {
  [key in Types.MarkdownEditorToolBarName]: Types.MarkdownEditorToolBarItem;
} = {
  bold: {
    name: "bold",
    action: ToolBarFuncs.toggleBold,
    className: "fa fa-bold",
    title: "Bold",
  },
  italic: {
    name: "italic",
    action: ToolBarFuncs.toggleItalic,
    className: "fa fa-italic",
    title: "Bold",
  },
  strikethrough: {
    name: "strikethrough",
    action: ToolBarFuncs.toggleStrikethrough,
    className: "fa fa-strikethrough",
    title: "Strikethrough",
  },
  heading: {
    name: "heading",
    action: ToolBarFuncs.toggleHeadingSmaller,
    className: "fa fa-header",
    title: "Heading",
  },
  "heading-smaller": {
    name: "heading-smaller",
    action: ToolBarFuncs.toggleHeadingSmaller,
    className: "fa fa-header fa-header-x fa-header-smaller",
    title: "Smaller Heading",
  },
  "heading-bigger": {
    name: "heading-bigger",
    action: ToolBarFuncs.toggleHeadingBigger,
    className: "fa fa-header fa-header-x fa-header-bigger",
    title: "Bigger Heading",
  },
  "heading-1": {
    name: "heading-1",
    action: ToolBarFuncs.toggleHeading1,
    className: "fa fa-header fa-header-x fa-header-1",
    title: "Big Heading",
  },
  "heading-2": {
    name: "heading-2",
    action: ToolBarFuncs.toggleHeading2,
    className: "fa fa-header fa-header-x fa-header-2",
    title: "Medium Heading",
  },
  "heading-3": {
    name: "heading-3",
    action: ToolBarFuncs.toggleHeading3,
    className: "fa fa-header fa-header-x fa-header-3",
    title: "Small Heading",
  },
  // 'separator-1': {
  //   name: 'separator-1'
  // },
  code: {
    name: "code",
    action: ToolBarFuncs.toggleCodeBlock,
    className: "fa fa-code",
    title: "Code",
  },
  quote: {
    name: "quote",
    action: ToolBarFuncs.toggleBlockquote,
    className: "fa fa-quote-left",
    title: "Quote",
  },
  "unordered-list": {
    name: "unordered-list",
    action: ToolBarFuncs.toggleUnorderedList,
    className: "fa fa-list-ul",
    title: "Generic List",
  },
  "ordered-list": {
    name: "ordered-list",
    action: ToolBarFuncs.toggleOrderedList,
    className: "fa fa-list-ol",
    title: "Numbered List",
  },
  "clean-block": {
    name: "clean-block",
    action: ToolBarFuncs.cleanBlock,
    className: "fa fa-eraser fa-clean-block",
    title: "Clean block",
  },
  // 'separator-2': {
  //   name: 'separator-2'
  // },
  link: {
    name: "link",
    action: ToolBarFuncs.drawLink,
    className: "fa fa-link",
    title: "Create Link",
  },
  image: {
    name: "image",
    action: ToolBarFuncs.drawImage,
    className: "fa fa-picture-o",
    title: "Insert Image",
  },
  "choose-image": {
    name: "choose-image",
    action(editor) {
      if (!(editor as any)._fileInputEl) {
        return false;
      }
      const el: HTMLInputElement = (editor as any)._fileInputEl;
      el.addEventListener("change", onChange);
      el.click();
      async function onChange(e: Event): Promise<any> {
        el.removeEventListener("change", onChange);
        try {
          const target = (e as any).target;
          const files = target.files;
          if (files && files.length > 0) {
            const file = files[0];
            const url = await (editor as any)._fileUploadFun(file);
            const cm = editor.codemirror;
            const stat = editor.getState();
            editor._replaceSelection(cm, stat.image, ["![](", "#url#)"], url);
          }
        } catch (error) {
          console.log("---", error);
        }
      }
    },
    className: "fa fa-picture-o",
    title: "Choose Local Image",
  },
  table: {
    name: "table",
    action: ToolBarFuncs.drawTable,
    className: "fa fa-table",
    title: "Insert Table",
  },
  "horizontal-rule": {
    name: "horizontal-rule",
    action: ToolBarFuncs.drawHorizontalRule,
    className: "fa fa-minus",
    title: "Insert Horizontal Line",
  },
  // 'separator-3': {
  //   name: 'separator-3'
  // },
  preview: {
    name: "preview",
    action: ToolBarFuncs.togglePreview,
    className: "fa fa-eye no-disable",
    title: "Toggle Preview",
  },
  "side-by-side": {
    name: "side-by-side",
    action: ToolBarFuncs.toggleSideBySide,
    className: "fa fa-columns no-disable no-mobile",
    title: "Toggle Side by Side",
  },
  fullscreen: {
    name: "fullscreen",
    action: ToolBarFuncs.toggleFullScreen,
    className: "fa fa-arrows-alt no-disable no-mobile",
    title: "Toggle Fullscreen",
  },
  // 'separator-4': {
  //   name: 'separator-4'
  // },
  guide: {
    name: "guide",
    action: "https://simplemde.com/markdown-guide",
    className: "fa fa-question-circle",
    title: "Markdown Guide",
  },
  // 'separator-5': {
  //   name: 'separator-5'
  // },
  undo: {
    name: "undo",
    action: ToolBarFuncs.undo,
    className: "fa fa-undo no-disable",
    title: "Undo",
  },
  redo: {
    name: "redo",
    action: ToolBarFuncs.redo,
    className: "fa fa-repeat no-disable",
    title: "Redo",
  },
};
const fullToolBarKey = new Map<string, Types.MarkdownEditorToolBarItem>();
Object.entries(fullToolBar).forEach(([key, value]) => {
  let _className = `md-icon md-icon-${key}`;
  if (value.className && value.className.includes("no-disable")) {
    _className += " no-disable";
  }
  if (value.className && value.className.includes("no-mobile")) {
    _className += " no-mobile";
  }
  value.className = _className;
  fullToolBarKey.set(key, value);
});
const separator = "|";
const defaultUploadFun = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = (e.target as any).result;
      if (url) {
        resolve(url);
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject("upload failed");
      }
    };
    reader.readAsDataURL(file);
  });
};

export default class EditorSMDE {
  static defaultToolBar: Types.MarkdownEditorToolBarConfig = [
    "bold",
    "italic",
    "strikethrough",
    separator,
    "heading-1",
    "heading-2",
    "heading-3",
    separator,
    "quote",
    "unordered-list",
    "ordered-list",
    separator,
    "link",
    "table",
    separator,
    "image",
    "choose-image",
    separator,
    "preview",
  ];
  api: any;
  data: { text: any };
  config: any;
  $editor: null | Types.SimpleMarkdownEditor = null;

  get codemirror() {
    return this.$editor?.codemirror;
  }
  static get toolbox() {
    return {
      icon:
        '<svg t="1599395600117" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2345" width="200" height="200"><path d="M85.333333 682.666667 85.333333 341.333333 170.666667 341.333333 298.666667 469.333333 426.666667 341.333333 512 341.333333 512 682.666667 426.666667 682.666667 426.666667 462.08 298.666667 590.08 170.666667 462.08 170.666667 682.666667 85.333333 682.666667M682.666667 341.333333 810.666667 341.333333 810.666667 512 917.333333 512 746.666667 704 576 512 682.666667 512 682.666667 341.333333Z" p-id="2346"></path></svg>',
      // '<svg t="1599375876966" class="icon" width="14" height="14" viewBox="0 -1 14 14"  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1008"><path d="M85.333333 682.666667V341.333333h85.333334l128 128 128-128h85.333333v341.333334h-85.333333v-220.586667l-128 128-128-128V682.666667H85.333333m597.333334-341.333334h128v170.666667h106.666666l-170.666666 192-170.666667-192H682.666667V341.333333z" fill="" p-id="1009"></path></svg>',
      title: "Markdown",
    };
  }

  static get contentless() {
    return true;
  }

  /**
   *
   */
  static get enableLineBreaks() {
    return true;
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: "md-editor",
      input: this.api.styles.input,
      // language: 'cdx-smde__language',
      textarea: "cdx-smde__textarea",
    };
  }

  private get _editorConfig() {
    const { toolbar: toolBarConfig = true } = this.config;
    const _toolbar = !toolBarConfig
      ? []
      : Array.isArray(toolBarConfig)
      ? toolBarConfig
      : EditorSMDE.defaultToolBar;
    const toolBar = _toolbar
      .map((item) => {
        if (typeof item === "string") {
          if (item === separator) {
            return item;
          } else {
            if (fullToolBarKey.get(item)) {
              return fullToolBarKey.get(
                item
              ) as Types.MarkdownEditorToolBarItem;
            } else {
              return null;
            }
          }
        } else if (typeof item === "object") {
          const { name, action, className } = item;
          const _item = fullToolBarKey.get(name);
          const _className = _item ? _item.className : "";
          if (!name || typeof name !== "string") {
            console.warn(`toolbar config error，${item} name not  string`);
            return null;
          }
          if (_item) {
            // tool Name rewrite
            if (name === "guide") {
              if (!action || typeof action !== "string") {
                item.action = _item.action;
              }
            } else if (!action || typeof action !== "function") {
              item.action = _item.action;
            }
          } else {
            // custom toolbar
            if (typeof className !== "string" || (!className && !_className)) {
              console.warn(`toolbar config error，${item} className not exist`);
              return null;
            }

            if (!action || typeof action !== "function") {
              console.warn(
                `toolbar config error，${item} action not a function`
              );
              return null;
            }
          }
          item.className = item.className ? item.className : _className;
          return item;
        }
        return null;
      })
      .filter((item) => item);
    return {
      ...(typeof this.config.initialValue === "string"
        ? { initialValue: this.config.initialValue }
        : {}),
      ...(typeof this.config.editorConfig === "object"
        ? this.config.editorConfig
        : {}),
      toolbar: toolBar.length > 0 ? toolBar : false,
      autoDownloadFontAwesome: false,
    };
  }

  private _getMdToHtml(md: string) {
    // Initialize
    const { editorConfig } = this.config;
    let markedOptions: any = {
      breaks: true,
    };
    // Update options
    if (
      editorConfig &&
      editorConfig.renderingConfig &&
      editorConfig.renderingConfig.singleLineBreaks === false
    ) {
      markedOptions.breaks = false;
    } else {
      markedOptions.breaks = true;
      if (
        editorConfig &&
        editorConfig.renderingConfig &&
        editorConfig.renderingConfig.codeSyntaxHighlighting === true &&
        (window as any).hljs
      ) {
        markedOptions.highlight = function (code: any) {
          return (window as any).hljs.highlightAuto(code).value;
        };
      }
      return mdToHTML(md, markedOptions);
    }
  }

  private _getDomHtml(html: string) {
    return html; //TODO:
    // return htmlDomSanitize(html);
  }

  constructor({ data, config, api }: any) {
    this.config = config;
    this.api = api;

    this.data = {
      text: data.text || "",
    };
    // this.api.caret.focus(true);
    // console.log(
    //   'block index',
    //   this.api.blocks.getCurrentBlockIndex(),
    //   Object.keys(this.api.blocks)
    // );
  }

  appendCallback() {
    console.log("append callback");
    // codemirror = this.codemirror;
    setTimeout(async () => {
      if (!this.codemirror) {
        return;
      }
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
      this.codemirror.refresh();
    }, 100);
  }

  render() {
    const container = this._make(
      "div",
      [this.CSS.wrapper, this.CSS.baseClass],
      {}
    );
    const text = this._make("textarea", [this.CSS.input, this.CSS.textarea], {
      contentEditable: false,
      innerHTML: this.data.text,
    });
    const input = this._make("input", "");

    container.appendChild(text);
    container.appendChild(input);

    SimpleMDE.prototype._replaceSelection = (
      cm: any,
      active: any,
      startEnd: any,
      url: any
    ) => {
      if (
        /editor-preview-active/.test(cm.getWrapperElement().lastChild.className)
      ) {
        return;
      }
      let text;
      let start = startEnd[0];
      let end = startEnd[1];
      let startPoint = cm.getCursor("start");
      let endPoint = cm.getCursor("end");
      if (url) {
        end = end.replace("#url#", url);
      }
      if (active) {
        text = cm.getLine(startPoint.line);
        start = text.slice(0, startPoint.ch);
        end = text.slice(startPoint.ch);
        cm.replaceRange(start + end, {
          line: startPoint.line,
          ch: 0,
        });
      } else {
        text = cm.getSelection();
        cm.replaceSelection(start + text + end);

        startPoint.ch += start.length;
        if (startPoint !== endPoint) {
          endPoint.ch += start.length;
        }
      }
      cm.setSelection(startPoint, endPoint);
      cm.focus();
    };
    SimpleMDE.prototype.markdown = (text: string) => {
      return this._getDomHtml(this._getMdToHtml(text) || "");
    };
    SimpleMDE.prototype._fileInputEl = input;
    SimpleMDE.prototype._fileUploadFun =
      typeof this.config.imageUploadFun === "function"
        ? this.config.imageUploadFun
        : defaultUploadFun;

    this.$editor = new SimpleMDE({
      element: text,
      ...this._editorConfig,
    });
    const codemirror = this.$editor?.codemirror!;
    codemirror.focus();
    codemirror.setCursor({ line: 0, ch: 0 });
    codemirror.refresh();

    const _boxEl = container as HTMLDivElement;
    // const _textarea = _boxEl.querySelector<HTMLTextAreaElement>(
    //   'textarea.cdx-input'
    // );
    const _textarea = text;
    // console.log('=--', _textarea, text, codemirror);
    let _cursor = codemirror.getCursor();

    const onChange = () => {
      const blockEl = _boxEl?.querySelector("div")?.closest(".ce-block");
      // console.log('=--blockEl', blockEl);
      const _value = codemirror.getValue();
      const _cursorIsStart = _cursor?.line === 0 && _cursor?.ch === 0;
      // console.log(
      //   '!!!!!---codemirror change---',
      //   _value,
      //   codemirror.getCursor(),
      //   _cursorIsStart
      // );
      if (!_value) {
        // console.log('---codemirror change empty---');
        if (blockEl) {
          // console.log('--------------@@@@@----');
          blockEl.classList.add("ce-block--selected"); // 没内容时候，这样讨巧设置为选中，以此来让editorjs，移除此区块。
          // 为什么这么做，因为Editorjs，判断能否移除区块的条件是，遍历子组件，输入型组件内容为空，且其他组件textContent也为空(codemirror,做不到(显示行号))
        }
        // language.value = '';
      } else {
        // if (blockEl) {
        //   // console.log('--------------@@@@@----');
        //   blockEl.classList.remove('ce-block--selected');
        // }
      }
      // console.log('==', _textarea);
      // editorJs,通过这个textarea 的selectionEnd来判断，光标是否为在开头
      // codemirror.save(); 这个方法通过 设置value的属性来设置，这样在Safari中，selectionEnd永远为0，
      // 因此退格的话，editorjs会认为，光标需要跳到上一次个卡片
      // 我们通过innerHTML的方式来设置selectionEnd 为字符的长度。
      //
      if (_textarea) {
        // 当codemirror，光标真的在第一位的时候, 我们通过这种方式设置selectionEnd 为0
        if (_cursorIsStart) {
          _textarea.value = _value;
          _textarea.innerHTML = "";
        } else {
          _textarea.innerHTML = _value;
        }
        // _textarea.setSelectionRange(0, _cursorIsStart ? 0 : 1);
        // _textarea.selectionEnd = _cursorIsStart ? 0 : 1;
      }
    };

    // codemirror.on('cursorActivity', (codemirror) => {
    //   _cursor = codemirror.getCursor();
    //   // console.warn('!!!!!---codemirror cursorActivity 0---', _cursor);
    //   onChange();
    // });
    // codemirror.on('change', (codemirror, changeOb) => {
    //   // console.warn('!!!!!---codemirror change 0---', changeOb);
    //   onChange();
    // });

    setTimeout(async function () {
      codemirror.focus();
      codemirror.setCursor(codemirror.lineCount(), 0);
      codemirror.refresh();
    }, 100);

    return container;
  }
  save(codeElement: any) {
    // console.log('---', this.data, this.$editor?.value());
    return Object.assign(this.data, {
      text: this.$editor?.value() ?? "",
    });
  }

  static get sanitize() {
    return {
      text: true,
    };
  }
  _make(tagName: any, classNames: any = null, attributes: any = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }
    // if (tagName === 'select') {
    //   el.innerHTML = Object.entries(LANGUAES).map(([key, value]) => {
    //     return `<option value="${key}">${key}</option>`;
    //   });
    // }
    if (tagName === "input") {
      const input = el as HTMLInputElement;
      input.type = "file";
      input.accept = "image/x-png,image/gif,image/jpeg";
      input.hidden = true;
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
