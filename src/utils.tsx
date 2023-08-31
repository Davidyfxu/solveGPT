import React from "react";
import { Avatar } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";

const BASE_URL = "https://hb1v2x4vc9.us.aircode.run";
export const post = async (url: string, body: any) => {
  try {
    let response = await fetch(BASE_URL + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
};
export const get = async (url: string, body: any) => {
  try {
    let response = await fetch(BASE_URL + url, {
      method: "GET",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
};

export const data = [
  {
    key: "1",
    name: "Semi Design 设计稿.fig",
    nameIconSrc:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png",
    size: "2M",
    owner: "姜鹏志",
    updateTime: "2020-02-02 05:13",
    avatarBg: "grey",
  },
  {
    key: "2",
    name: "Semi Design 分享演示文稿",
    nameIconSrc:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
    size: "2M",
    owner: "郝宣",
    updateTime: "2020-01-17 05:31",
    avatarBg: "red",
  },
  {
    key: "3",
    name: "设计文档",
    nameIconSrc:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
    size: "34KB",
    owner: "Zoey Edwards",
    updateTime: "2020-01-26 11:01",
    avatarBg: "light-blue",
  },
  {
    key: "4",
    name: "Semi D2C 设计稿.fig",
    nameIconSrc:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png",
    size: "2M",
    owner: "姜鹏志",
    updateTime: "2020-02-02 05:13",
    avatarBg: "grey",
  },
  {
    key: "5",
    name: "Semi D2C 分享演示文稿",
    nameIconSrc:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
    size: "2M",
    owner: "郝宣",
    updateTime: "2020-01-17 05:31",
    avatarBg: "red",
  },
  {
    key: "6",
    name: "Semi D2C 设计文档",
    nameIconSrc:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
    size: "34KB",
    owner: "Zoey Edwards",
    updateTime: "2020-01-26 11:01",
    avatarBg: "light-blue",
  },
];
