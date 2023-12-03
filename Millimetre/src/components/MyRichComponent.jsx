import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function MyRichComponent() {
  const [value, setValue] = useState("");
  var toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ direction: "rtl" }], // text direction
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ align: [] }],
    ["link", "image"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  return (
    <ReactQuill
      placeholder="Start writing magic... "
      modules={module}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}
export default MyRichComponent;
