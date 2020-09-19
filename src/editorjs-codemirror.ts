// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/theme/darcula.css';
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

// import './codemirror.css';

// const CodeMirror = require('codemirror/lib/codemirror.js')
// const _CodeMirrorEditor = require('codemirror')
// const CodeMirrorEditor = window.CodeMirror || _CodeMirrorEditor
// import CodeMirrorEditor from 'codemirror';
import * as CodeMirror from 'codemirror';
// import CodeMirror, { EditorConfiguration } from 'codemirror';

window.CodeMirror = CodeMirror;

const CodeMirrorEditor = CodeMirror;
const EmptyLanguage = 'Please select language';

const LANGUAES: {
  [key: string]:
    | string
    | {
        name: string;
        [key: string]: any;
      };
} = {
  [EmptyLanguage]: '',
  MarkDown: 'MarkDown',
  Javascript: 'Javascript',
  'Javascript Jsx': 'jsx',
  TypeScript: {
    name: 'javascript',
    typescript: true,
  },
  // 'TypeScript Jsx_': {
  //   name: 'jsx',
  //   typescript: true,
  //   base: { name: 'javascript', typescript: true },
  // },
  'TypeScript Jsx': 'text/typescript-jsx',
  Dart: 'Dart',
  Swift: 'swift',
  'Objective-C': 'text/x-objectivec',
  Kotlin: 'text/x-kotlin',
  Java: 'text/x-java',
  Vue: 'vue',
  Go: 'Go',
  CSS: 'CSS',
  Less: 'text/x-less',
  SASS: 'sass',
  Python: 'Python',
  HTML: 'htmlmixed',
  Rust: 'rust',
  Elm: 'text/x-elm',
  PHP: 'PHP',
  R: 'R',
  // Nginx: 'text/x-nginx-conf',
  Nginx: 'Nginx',
  SQL: 'sql',
  XML: 'xmls',
  Shell: 'shell',
  YAML: 'text/x-yaml',
};

export default class EditorCodeMirror {
  api: any;
  textPlaceholder: any;
  languagePlaceholder: any;
  format: any;
  data: { language?: any; text: any };
  codemirror: any;
  language: any;

  static get toolbox() {
    return {
      icon:
        '<svg width="14" height="14" viewBox="0 -1 14 14" xmlns="http://www.w3.org/2000/svg" > <path d="M3.177 6.852c.205.253.347.572.427.954.078.372.117.844.117 1.417 0 .418.01.725.03.92.02.18.057.314.107.396.046.075.093.117.14.134.075.027.218.056.42.083a.855.855 0 0 1 .56.297c.145.167.215.38.215.636 0 .612-.432.934-1.216.934-.457 0-.87-.087-1.233-.262a1.995 1.995 0 0 1-.853-.751 2.09 2.09 0 0 1-.305-1.097c-.014-.648-.029-1.168-.043-1.56-.013-.383-.034-.631-.06-.733-.064-.263-.158-.455-.276-.578a2.163 2.163 0 0 0-.505-.376c-.238-.134-.41-.256-.519-.371C.058 6.76 0 6.567 0 6.315c0-.37.166-.657.493-.846.329-.186.56-.342.693-.466a.942.942 0 0 0 .26-.447c.056-.2.088-.42.097-.658.01-.25.024-.85.043-1.802.015-.629.239-1.14.672-1.522C2.691.19 3.268 0 3.977 0c.783 0 1.216.317 1.216.921 0 .264-.069.48-.211.643a.858.858 0 0 1-.563.29c-.249.03-.417.076-.498.126-.062.04-.112.134-.139.291-.031.187-.052.562-.061 1.119a8.828 8.828 0 0 1-.112 1.378 2.24 2.24 0 0 1-.404.963c-.159.212-.373.406-.64.583.25.163.454.342.612.538zm7.34 0c.157-.196.362-.375.612-.538a2.544 2.544 0 0 1-.641-.583 2.24 2.24 0 0 1-.404-.963 8.828 8.828 0 0 1-.112-1.378c-.009-.557-.03-.932-.061-1.119-.027-.157-.077-.251-.14-.29-.08-.051-.248-.096-.496-.127a.858.858 0 0 1-.564-.29C8.57 1.401 8.5 1.185 8.5.921 8.5.317 8.933 0 9.716 0c.71 0 1.286.19 1.72.574.432.382.656.893.671 1.522.02.952.033 1.553.043 1.802.009.238.041.458.097.658a.942.942 0 0 0 .26.447c.133.124.364.28.693.466a.926.926 0 0 1 .493.846c0 .252-.058.446-.183.58-.109.115-.281.237-.52.371-.21.118-.377.244-.504.376-.118.123-.212.315-.277.578-.025.102-.045.35-.06.733-.013.392-.027.912-.042 1.56a2.09 2.09 0 0 1-.305 1.097c-.2.323-.486.574-.853.75a2.811 2.811 0 0 1-1.233.263c-.784 0-1.216-.322-1.216-.934 0-.256.07-.47.214-.636a.855.855 0 0 1 .562-.297c.201-.027.344-.056.418-.083.048-.017.096-.06.14-.134a.996.996 0 0 0 .107-.396c.02-.195.031-.502.031-.92 0-.573.039-1.045.117-1.417.08-.382.222-.701.427-.954z" /> </svg>',
      title: 'Code',
    };
  }

  static get contentless() {
    return true;
  }

  static get enableLineBreaks() {
    return true;
  }

  static get DEFAULT_CODE_PLACEHOLDER() {
    return 'Enter some code';
  }

  static get DEFAULT_LANGUAGE_PLACEHOLDER() {
    return 'Javascript';
  }

  static get DEFAULT_FORMAT_CONFIG() {
    return Object.keys(LANGUAES);
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-codemirror',
      input: this.api.styles.input,
      language: 'cdx-codemirror__language',
      textarea: 'cdx-codemirror__textarea',
    };
  }

  constructor({ data, config, api }: any) {
    this.api = api;

    this.textPlaceholder =
      config.textPlaceholder || (CodeMirror as any).DEFAULT_CODE_PLACEHOLDER;
    this.languagePlaceholder =
      config.languagePlaceholder ||
      (CodeMirror as any).DEFAULT_LANGUAGE_PLACEHOLDER;
    this.format = config.format || (CodeMirror as any).DEFAULT_FORMAT_CONFIG;

    this.data = {
      language: data.language || 'Javascript',
      text: data.text || '',
    };
    // this.api.caret.focus(true);
    // console.log(
    //   'block index',
    //   this.api.blocks.getCurrentBlockIndex(),
    //   Object.keys(this.api.blocks)
    // );
  }

  appendCallback() {
    console.log('append callback');
    // codemirror = this.codemirror;
    setTimeout(async () => {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
      this.codemirror.refresh();
    }, 100);
  }

  render() {
    const container = this._make(
      'div',
      [this.CSS.wrapper, this.CSS.baseClass],
      {}
    );
    const text = this._make('textarea', [this.CSS.input, this.CSS.textarea], {
      contentEditable: false,
      innerHTML: this.data.text,
    });

    const selectwrapper = this._make('div', this.CSS.input);
    const language = this._make('select', this.CSS.language);

    text.dataset.placeholder = this.textPlaceholder;
    language.dataset.placeholder = this.languagePlaceholder;

    const format = this.format;
    // console.log('--format----', format);
    for (let f in format) {
      let option = document.createElement('option');
      let v = document.createAttribute('value');
      let t = document.createTextNode(format[f]);
      v.value = format[f];
      option.appendChild(t);
      option.setAttributeNode(v);
      language.appendChild(option);
    }

    language.value = this.data.language;
    selectwrapper.appendChild(language);
    container.appendChild(selectwrapper);
    container.appendChild(text);

    let codemirror = CodeMirrorEditor.fromTextArea(text, {
      tabSize: 4,
      styleActiveLine: { nonEmpty: true },
      styleActiveSelected: true,
      lineNumbers: true,
      line: false,
      autofocus: false,
      styleSelectedText: true,
      mode:
        typeof LANGUAES[this.data.language] === 'string'
          ? LANGUAES[this.data.language].toLowerCase()
          : LANGUAES[this.data.language],
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: 'dracula',
      autoCloseTags: true,
      foldGutter: true,
      dragDrop: true,
      lint: true,
      extraKeys: { Ctrl: 'autocomplete' },
      hintOptions: {
        completeSingle: false,
      },
    } as CodeMirror.EditorConfiguration);
    this.codemirror = codemirror;
    this.codemirror.focus();
    this.codemirror.setCursor({ line: 0, ch: 0 });
    this.codemirror.refresh();

    const _boxEl = container as HTMLDivElement;
    // const _textarea = _boxEl.querySelector<HTMLTextAreaElement>(
    //   'textarea.cdx-input'
    // );
    // console.log('=--', _textarea, text);
    const _textarea = text;
    let _cursor = codemirror.getCursor();

    const onChange = () => {
      const blockEl = _boxEl?.querySelector('div')?.closest('.ce-block');
      const _value = this.codemirror.getValue();
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
          blockEl.classList.add('ce-block--selected'); // 没内容时候，这样讨巧设置为选中，以此来让editorjs，移除此区块。
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
          _textarea.innerHTML = '';
        } else {
          _textarea.innerHTML = _value;
        }
        // _textarea.setSelectionRange(0, _cursorIsStart ? 0 : 1);
        // _textarea.selectionEnd = _cursorIsStart ? 0 : 1;
      }
    };

    codemirror.on('cursorActivity', (codemirror) => {
      _cursor = codemirror.getCursor();
      // console.warn('!!!!!---codemirror cursorActivity 0---', _cursor);
      onChange();
    });
    codemirror.on('change', (codemirror, changeOb) => {
      // console.warn('!!!!!---codemirror change 0---', changeOb);
      onChange();
    });

    setTimeout(async function () {
      codemirror.focus();
      codemirror.setCursor(codemirror.lineCount(), 0);
      codemirror.refresh();
    }, 100);
    // console.log('--this.data.language 0', this.data.language);
    language.onchange = (e: any) => {
      this.data.language = e.target.value;
      const language =
        typeof LANGUAES[this.data.language] === 'string'
          ? LANGUAES[this.data.language].toLowerCase()
          : LANGUAES[this.data.language];
      // console.log('--this.data.language', e.target.value, this.data.language);
      codemirror.setOption('mode', language);
      // this.language = language;
    };
    this.language = language;

    return container;
  }

  onPaste(event: any) {
    const content = event.detail.data;
    this.data = {
      text: content.textContent,
    };
  }

  save(codeElement: any) {
    const language =
      typeof LANGUAES[this.language.value] === 'string'
        ? LANGUAES[this.language.value].toLowerCase()
        : LANGUAES[this.language.value];
    // console.log('---save', this.codemirror.getValue(), language);
    return Object.assign(this.data, {
      text: this.codemirror.getValue(),
      language: this.language.value,
    });
  }

  static get sanitize() {
    return {
      language: false,
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
    if (tagName === 'select') {
      el.innerHTML = Object.entries(LANGUAES).map(([key, value]) => {
        return `<option value="${key}">${key}</option>`;
      });
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  static get pasteConfig() {
    return {
      tags: ['pre'],
    };
  }
}
