import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Form,
  Space,
  Table,
  Typography,
} from "@douyinfe/semi-ui";
const { Title, Text } = Typography;
import styles from "./index.module.scss";
import {
  age_options,
  columns,
  desc_list,
  lang_options,
  model_options,
} from "../../utils/const";
import { getAll } from "../api";

const Chat = () => {
  const [questions, setQuestions] = useState([]);
  const [tLoading, setTLoading] = useState(false);
  const get_table_all = async () => {
    try {
      setTLoading(true);
      const { data } = await getAll({});
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTLoading(false);
    }
  };
  useEffect(() => {
    void get_table_all();
  }, []);

  // const test = async () => {
  // let formData = new FormData();
  // formData.append(
  //   "answer",
  //   "5年后，小明的年龄将是5岁+5年=10岁，他的爸爸的年龄将是40岁+5年=45岁。因此，五年后他们两个的总年龄将是10岁+45岁=55岁。",
  // );
  // formData.append("definition", "[]");
  // formData.append(
  //   "question",
  //   "小明今年5岁了，爸爸今年40岁，请问5年后他们两个一共多少岁",
  // );
  // formData.append("theorem", "[]");
  // const res = await fetch("http://118.89.117.111/pdf", {
  //   method: "POST",
  //   body: formData,
  // });
  // const { data } = await res.json();
  // if (data?.pdf_url) {
  //   window.open(`http://118.89.117.111${data?.pdf_url}`, "_blank");
  // }
  // let formData = new FormData();
  // formData.append("text", "1+1=");
  // formData.append("model", "gpt-3.5-turbo");
  // formData.append("age", "小学生");
  // formData.append("language", "Chinese");
  // const res = await fetch("http://118.89.117.111/submitText", {
  //   method: "POST",
  //   body: formData,
  // });
  // };

  return (
    <div className={styles.container}>
      <Card
        style={{ backgroundColor: "rgba(var(--semi-light-blue-0), 1)" }}
        title={<Title>SolveGPT--AI集智数学老师</Title>}
      >
        <Form>
          <Form.Select
            className={styles.item}
            field="model"
            label={"支持模型列表:"}
            placeholder={"请选择模型"}
            optionList={model_options}
          />
          <Form.Select
            className={styles.item}
            field="language"
            label={"答案语种设置:"}
            placeholder={"请选择答案语种"}
            optionList={lang_options}
          />
          <Form.Select
            className={styles.item}
            field="age"
            label={"使用年龄阶段选项:"}
            placeholder={"请选择使用年龄阶段"}
            optionList={age_options}
          />
          <Form.TextArea
            className={styles.item}
            field="text"
            label={"问题:"}
            placeholder={"请输入想问的问题"}
            showCounter
            maxCount={500}
          />
          <Space>
            <Button theme="solid" type="warning">
              图片转文字
            </Button>
            <Button type="primary" theme="solid">
              一键解题
            </Button>
            <Button theme="solid" type="secondary">
              存知识库
            </Button>
            <Button theme="solid" type="tertiary">
              查看PDF
            </Button>
          </Space>
        </Form>
      </Card>

      <Card
        style={{ backgroundColor: "rgba(var(--semi-blue-0), 1)" }}
        title={<Title>知识与答案</Title>}
      >
        <Descriptions row size="large" data={desc_list} />
      </Card>
      <Card title={<Title>知识宝库</Title>}>
        <Table loading={tLoading} columns={columns} dataSource={questions} />
      </Card>
    </div>
  );
};

export default Chat;
