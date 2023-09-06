import React from "react";

const BASE_URL = "https://hb1v2x4vc9.us.aircode.run";
const RAW_BASE_URL = "http://solvegpt.cn";
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
export const postForm = async (url: string, body: any) => {
  try {
    let response = await fetch(RAW_BASE_URL + url, {
      method: "POST",
      body,
    });
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
};
export const getForm = async (url: string, body: any) => {
  try {
    let response = await fetch(RAW_BASE_URL + url);
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
};
