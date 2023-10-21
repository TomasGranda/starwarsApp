"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "../utils";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import BookmarkButton from "./BookmarkButton";
import { BookOutlined } from "@ant-design/icons";

const bookMarksTypes = [
  "characterBookmarks",
  "starshipBookmarks",
  "filmBookmarks",
  "planetBookmarks",
];

const columns: ColumnsType<Bookmark> = [
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: <BookOutlined />,
    render: (_, d) => (
      <BookmarkButton
        type={d.type || ""}
        name={d.name || ""}
        url={d.link || ""}
      />
    ),
  },
];

export default function BookMarksTable() {
  const [bookmarks, setBookMarks] = useState([] as Bookmark[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let bookmarkList: Bookmark[] = [];
    bookMarksTypes.forEach((bmt) => {
      bookmarkList = [
        ...bookmarkList,
        ...(JSON.parse(localStorage.getItem(bmt) || "[]") as Bookmark[]).map(
          (bm, i) => ({ ...bm, key: i.toString() } as Bookmark)
        ),
      ];
      setBookMarks(bookmarkList);
      setIsLoading(false);
    });
  }, []);

  return (
    <Table
      pagination={{
        total: bookmarks.length,
        pageSize: bookmarks.length,
      }}
      loading={isLoading}
      columns={columns}
      dataSource={bookmarks}
    />
  );
}
