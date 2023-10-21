"use client";

import { Table } from "antd";
import { BookOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getIdFromPath } from "../utils";
import Search from "antd/es/input/Search";
import { getAllPlanetsByPage } from "../apiCalls/planetsApiCalls";
import BookmarkButton from "./BookmarkButton";

interface DataType {
  id: string;
  key: string;
  name: string;
  climate: string;
  terrain: string;
  population: number;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Climate",
    dataIndex: "climate",
    key: "climate",
  },
  {
    title: "Terrain",
    dataIndex: "terrain",
    key: "terrain",
  },
  {
    title: "Population",
    key: "population",
    dataIndex: "population",
  },
  {
    title: <InfoCircleOutlined />,
    render: (_, d) => (
      <Link href={`/planets/${d.id}`}>
        <InfoCircleOutlined />
      </Link>
    ),
  },
  {
    title: <BookOutlined />,
    render: (_, d) => (
      <BookmarkButton type="planet" name={d.name} url={d.url} />
    ),
  },
];

export default function PlanetsTable() {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([] as DataType[]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const response = await getAllPlanetsByPage(page, search);

    const newData: DataType[] =
      response?.data.results.map((p, i) => ({
        id: getIdFromPath(new URL(p.url)) || "1",
        key: i.toString(),
        name: p.name,
        climate: p.climate,
        population: p.population,
        terrain: p.terrain,
        url: `/planet/${getIdFromPath(new URL(p.url))}`,
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
