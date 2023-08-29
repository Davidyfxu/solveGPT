import React from "react";
import { Button, Upload } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";

const QuestionUpload = () => {
  return (
    <div>
      <input type="file" onChange={(e) => console.log(e)} />
      <Upload
        listType="picture"
        headers={{
          authorization: "authorization-text",
        }}
        beforeUpload={async (file) => {
          try {
            const API_BASE_URL = "http://118.89.117.111";
            const formData = new FormData();
            formData.append("image", file.file.fileInstance);
            console.log("file", file);
            const res = await fetch(API_BASE_URL + "/submitImage", {
              method: "POST",
              body: formData,
            });
            console.log(res);
            const result = await res.json();
            console.log(result);
          } catch (e) {
            console.error("customRequest", e);
          }
        }}
      ></Upload>
    </div>
  );
};

export default QuestionUpload;
