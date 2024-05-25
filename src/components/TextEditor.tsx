import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  placeholder: string;
}

const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  (props, ref) => {
    const [editorHtml, setEditorHtml] = useState('');

    const handleChange = (html: string) => {
      setEditorHtml(html);
    };

    return (
      <div ref={ref}>
        <ReactQuill
          theme={'snow'}
          onChange={handleChange}
          value={editorHtml}
          modules={modules}
          formats={formats}
          bounds={'.app'}
          placeholder={props.placeholder}
          className="bg-white text-black"
        />
      </div>
    );
  }
);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { indent: '+1' }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'code-block',
];

export default TextEditor;
