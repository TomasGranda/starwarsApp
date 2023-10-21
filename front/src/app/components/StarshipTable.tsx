"use client";

import { Table } from "antd";
import { BookOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getIdFromPath } from "../utils";
import Search from "antd/es/input/Search";
import { getAllStarshipsByPage } from "../apiCalls/starshipsApiCalls";
import BookmarkButton from "./BookmarkButton";

interface DataType {
  id: string;
  key: string;
  name: string;
  model: string;
  cost_in_credits: number;
  passengers: number;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Cost in Credits",
    dataIndex: "cost_in_credits",
    key: "cost_in_credits",
  },
  {
    title: "Passengers",
    key: "passengers",
    dataIndex: "passengers",
  },
  {
    title: <InfoCircleOutlined />,
    render: (_, d) => (
      <Link href={`/starships/${d.id}`}>
        <InfoCircleOutlined />
      </Link>
    ),
  },
  {
    title: <BookOutlined />,
    render: (_, d) => (
      <BookmarkButton type="starship" name={d.name} url={d.url} />
    ),
  },
];

export default function StarshipTable() {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([] as DataType[]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const response = await getAllStarshipsByPage(page, search);

    const newData: DataType[] =
      response?.data.results.map((ss, i) => ({
        id: getIdFromPath(new URL(ss.url)) || "1",
        key: i.toString(),
        name: ss.name,
        cost_in_credits: ss.cost_in_credits,
        model: ss.model,
        passengers: ss.passengers,
        url: `/starship/${getIdFromPath(new URL(ss.url))}`,
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
