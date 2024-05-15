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
    [{ size: [] }],
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { indent: '+1' }],
    ['image', 'video'],
    ['clean'],
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
  'link',
  'image',
  'video',
];

export default TextEditor;
