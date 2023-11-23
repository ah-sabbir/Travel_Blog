import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Dispatch, FC, SetStateAction, useRef } from "react";

interface Props {
  setContent: Dispatch<SetStateAction<string>>;
  content: string;
}

const TextEditor: FC<Props> = ({ setContent, content }): JSX.Element => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TEXT_EDITOR_KEY}
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          image_title: true,
          image_caption: true,
        }}
        onInit={(evt, editor) => {
          if (editorRef) editorRef.current = editor;
        }}
        onEditorChange={() => {
          if (editorRef.current?.getContent())
            setContent(editorRef.current?.getContent());
        }}
        value={content}
      />
    </>
  );
};

export default TextEditor;
