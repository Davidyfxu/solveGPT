import React, { useMemo, useState } from "react";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button, Progress, Rating, Table } from "@douyinfe/semi-ui";
import { format } from "date-fns";
import { exportFile } from "../../../../utils/utils";
let draggingIndex = -1;
function BodyRow(props) {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow,
    currentPage,
    ...restProps
  } = props;
  const style = { ...restProps.style, cursor: "move" };

  let { className } = restProps;
  if (isOver) {
    console.log("true");
    if (restProps.index > draggingIndex) {
      className += " drop-over-downward";
    }
    if (restProps.index < draggingIndex) {
      className += " drop-over-upward";
    }
  }

  return connectDragSource(
    connectDropTarget(
      <tr {...restProps} className={className} style={style} />,
    ),
  );
}

const rowSource = {
  beginDrag(props) {
    draggingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

const DraggableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource("row", rowSource, (connect) => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);
const NoteTable = (props: any) => {
  const { noteList, kindMap, loading, setNoteList } = props;
  const [exportItems, setExportItems] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setExportItems(selectedRows);
    },
  };

  const components = useMemo(
    () => ({
      body: {
        row: DraggableBodyRow,
      },
    }),
    [],
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
      width: 160,
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime(),
      render: (text: string) => format(new Date(text), "yyyy-MM-dd HH:mm"),
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      width: 160,
      sorter: (a: any, b: any) =>
        new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime(),
      render: (text: string) => format(new Date(text), "yyyy-MM-dd HH:mm"),
    },
    {
      title: "下载数量",
      dataIndex: "download",
      width: 150,
      sorter: (a: any, b: any) => a.download - b.download,
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
      sorter: (a: any, b: any) => a.star - b.star,
      render: (text: number) => <Rating disabled defaultValue={text} />,
    },
  ];

  const moveRow = (dragIndex, hoverIndex) => {
    const totalDragIndex = dragIndex;
    const totalHoverIndex = hoverIndex;
    const dragRow = noteList[totalDragIndex];
    const newData = [...noteList];
    newData.splice(totalDragIndex, 1);
    newData.splice(totalHoverIndex, 0, dragRow);
    // setNoteList(newData);
    setNoteList(newData);
  };
  return (
    <div style={{ padding: "0 16px" }}>
      <Button theme="solid" onClick={() => exportFile(exportItems)}>
        一键导出
      </Button>
      <DndProvider backend={HTML5Backend}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={noteList}
          components={components}
          rowSelection={rowSelection}
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
        />
      </DndProvider>
    </div>
  );
};

export default NoteTable;
