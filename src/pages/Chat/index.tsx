import React, { useEffect } from "react";
import { post } from "../../utils";

const Chat = () => {
  const test = async () => {
    const res = await fetch("http://118.89.117.111/pdf", {
      method: "POST",
      body: JSON.stringify({
        question: "小明今年5岁了，爸爸今年40岁，请问5年后他们两个一共多少岁",
        definition: [],
        theorem: [],
        answer:
          "5年后，小明的年龄将是5岁+5年=10岁，他的爸爸的年龄将是40岁+5年=45岁。因此，五年后他们两个的总年龄将是10岁+45岁=55岁。",
      }),
      mode: "cors",
    });

    console.log(await res.json());
  };
  useEffect(() => {
    test();
  }, []);

  return <div>123</div>;
};

export default Chat;
