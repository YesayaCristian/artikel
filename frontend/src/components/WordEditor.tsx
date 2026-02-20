import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

type Props = {
  label: string;
  value: string;
  onChange: (data: string) => void;
};

export default function WordEditor({ label, value, onChange }: Props) {
  const editorRef = useRef<any>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border rounded-2xl shadow-sm bg-white">
      {/* Header Label */}
      <div className="px-4 py-3 border-b bg-gray-50 font-semibold">
        {label}
      </div>

      {/* Toolbar Container (unik per instance) */}
      <div ref={toolbarRef} className="border-b px-4 py-2 bg-white" />

      {/* Editor Area */}
      <div className="p-4 min-h-[300px]">
        <CKEditor
          editor={DecoupledEditor as any}
          data={value}
          onReady={(editor: any) => {
            editorRef.current = editor;

            if (toolbarRef.current) {
              // Bersihkan container agar toolbar tidak double
              toolbarRef.current.innerHTML = "";
              toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
            }
          }}
          config={{
            toolbar: {
              items: [
                "undo", "redo",
                "|",
                "heading",
                "|",
                "fontFamily", "fontSize",
                "|",
                "bold", "italic", "underline", "strikethrough",
                "|",
                "fontColor", "fontBackgroundColor",
                "|",
                "alignment",
                "|",
                "numberedList", "bulletedList",
                "|",
                "outdent", "indent",
                "|",
                "insertTable",
                "|",
                "link",
                "|",
                "blockQuote"
              ],
              shouldNotGroupWhenFull: true
            },
            table: {
              contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
            }
          }}
          onChange={(event, editor) => {
            onChange(editor.getData());
          }}
        />
      </div>
    </div>
  );
}