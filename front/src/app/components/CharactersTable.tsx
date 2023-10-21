"use client";

import { Table } from "antd";
import { BookOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { getAllCharactersByPage } from "../apiCalls/charactersApiCalls";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getIdFromPath } from "../utils";
import Search from "antd/es/input/Search";
import BookmarkButton from "./BookmarkButton";

interface DataType {
  id: string;
  key: string;
  name: string;
  height: number;
  mass: number;
  gender: string;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Height",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Mass",
    dataIndex: "mass",
    key: "mass",
  },
  {
    title: "Gender",
    key: "gender",
    dataIndex: "gender",
  },
  {
    title: <InfoCircleOutlined />,
    render: (_, d) => (
      <Link href={`/characters/${d.id}`}>
        <InfoCircleOutlined />
      </Link>
    ),
  },
  {
    title: <BookOutlined />,
    render: (_, d) => <BookmarkButton type="character" name={d.name} url={d.url} />,
  },
];

export default function CharactersTable() {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([] as DataType[]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const response = await getAllCharactersByPage(page, search);

    const newData: DataType[] =
      response?.data.results.map((c, i) => ({
        id: getIdFromPath(new URL(c.url)) || "1",
        gender: c.gender,
        height: c.height,
        key: i.toString(),
        mass: c.mass,
        name: c.name,
        url: `/character/${getIdFromPath(new URL(c.url))}`,
      })) || [];

    setData(() => newData);
    setTotal(response?.data.count || 0);
    setIsLoading(false);
  };

  const onPageChanges = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getData();
  }, [search, page]);

  return (
    <>
      <Search
        placeholder="Search..."
        allowClear
        disabled={isLoading}
        onSearch={setSearch}
        style={{ width: 304 }}
      />
      <Table
        pagination={{
          total: total,
          pageSize: 10,
          onChange: onPageChanges,
        }}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
    </>
  );
}
