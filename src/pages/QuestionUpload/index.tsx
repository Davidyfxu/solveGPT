import React, { useState } from "react";
import {
  Button,
  List,
  Space,
  Upload,
  Typography,
  Toast,
} from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import { answerGPT, getOCR } from "../api";
const { Title } = Typography;
const QuestionUpload = () => {
  const [OCRs, setOCRs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const handleUpload = async ({ file, fileList }) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64String = reader.result;
        setLoading(true);
        const { data } = await getOCR({ imageLink: base64String });
        console.log(data);
        setOCRs((o) => [...o, ...data]);
        setLoading(false);
        Toast.success("识别成功");
      };
      // 读取文件内容
      reader.readAsDataURL(fileList[0].fileInstance);
    } catch (e) {
      console.error("customRequest", e);
    } finally {
      setLoading(false);
    }
  };
  const getAnswer = async (question: string) => {
    try {
      setLoading(true);
      const { choices } = await answerGPT({ question });
      Toast.info(choices.join("; "));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space style={{ width: "100%" }} vertical align={"center"}>
      <Upload limit={1} showUploadList={false} beforeUpload={handleUpload}>
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      </Upload>
      <List
        style={{ width: "100%" }}
        header={<Title>识别结果</Title>}
        bordered
        loading={loading}
        dataSource={OCRs}
        renderItem={(item) => (
          <List.Item>
            {item?.DetectedText}
            <Button
              style={{ marginLeft: 32 }}
              onClick={() => getAnswer(item?.DetectedText)}
              theme={"borderless"}
            >
              AI解答
            </Button>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default QuestionUpload;
