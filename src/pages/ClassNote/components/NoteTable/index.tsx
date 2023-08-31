import React, { useCallback, useState } from "react";

import {
  Button,
  Progress,
  Rating,
  Space,
  Table,
  Toast,
} from "@douyinfe/semi-ui";
import { format } from "date-fns";
import { read, utils, writeFileXLSX } from "xlsx";
const NoteTable = (props: any) => {
  const { noteList, kindMap, loading } = props;
  const [exportItems, setExportItems] = useState([]);
  const rowSelection = {
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onChange: (selectedRowKeys, selectedRows) => {
      setExportItems(selectedRows);
    },
  };

  const exportFile = useCallback(() => {
    if (exportItems.length == 0) {
      Toast.info("导出xlsx不可为空");
      return;
    }
    const ws = utils.json_to_sheet(exportItems);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
  }, [exportItems]);
  console.log(
    Object.keys(kindMap).map((k) => ({
      text: kindMap[k],
      value: Number(k),
    })),
  );
  const columns = [
    {
      title: "分类",
      dataIndex: "id",
      width: 80,
      render: (text: number) => kindMap[text],
    },
    {
      title: "概念",
      dataIndex: "term",
      width: 150,
      render: (text: string) => text,
    },
    {
      title: "定义",
      dataIndex: "definition",
      width: 300,
      render: (text: string) => text,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 120,
      render: (text: string) => format(new Date(text), "yyyy-MM-dd"),
    },
    {
      title: "更新时间",
      dataIndex: "createdAt",
      width: 120,
      render: (text: string) => format(new Date(text), "yyyy-MM-dd"),
    },
    {
      title: "下载数量",
      dataIndex: "download",
      width: 150,
      render: (text: number) => (
        <Progress
          percent={text / 10}
          format={(p) => p * 10}
          showInfo
          type="circle"
          width={100}
          aria-label="disk usage"
        />
      ),
    },
    {
      title: "难度星级",
      dataIndex: "star",
      width: 200,
      render: (text: number) => <Rating disabled defaultValue={text} />,
    },
  ];

  return (
    <Space vertical align={"start"}>
      <Button theme="solid" onClick={exportFile}>
        一键导出
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={noteList.map((n) => ({ ...n, key: n._id }))}
        rowSelection={rowSelection}
      />
    </Space>
  );
};

export default NoteTable;
