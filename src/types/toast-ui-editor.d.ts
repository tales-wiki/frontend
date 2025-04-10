declare module "@toast-ui/editor" {
  interface EditorOptions {
    el: HTMLElement;
    height?: string;
    initialEditType?: "markdown" | "wysiwyg";
    previewStyle?: "tab" | "vertical";
    placeholder?: string;
  }

  class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    destroy(): void;
  }

  export default Editor;
}

declare module "@toast-ui/editor/dist/toastui-editor-viewer" {
  export default class Viewer {
    constructor(options: { el: HTMLElement; initialValue?: string });
    setMarkdown(markdown: string): void;
  }
}
