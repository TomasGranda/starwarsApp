"use client";

import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { getAllFilms } from "../apiCalls/filmsApiCalls";
import { useState, useEffect } from "react";
import { getIdFromPath } from "../utils";
import { BookOutlined } from "@ant-design/icons";
import BookmarkButton from "./BookmarkButton";

interface DataType {
  id: string;
  key: string;
  title: string;
  episode_id: string;
  director: string;
  producer: string;
  release_date: string;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Episode",
    dataIndex: "episode_id",
    key: "episode_id",
  },
  {
    title: "Director",
    dataIndex: "director",
    key: "director",
  },
  {
    title: "Producer",
    key: "producer",
    dataIndex: "producer",
  },
  {
    title: "Release",
    key: "release_date",
    dataIndex: "release_date",
  },
  {
    title: <BookOutlined />,
    render: (_, d) => <BookmarkButton type="film" name={d.title} url={d.url} />,
  },
];

export default function FilmsTable() {
  const [data, setData] = useState([] as DataType[]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const response = await getAllFilms();

    const newData: DataType[] =
      response?.data.results.map((f, i) => ({
        id: getIdFromPath(new URL(f.url)) || "1",
        director: f.director,
        episode_id: f.episode_id.toString(),
        key: i.toString(),
        producer: f.producer,
        release_date: f.release_date,
        title: f.title,
        url: `/films/${getIdFromPath(new URL(f.url))}`,
      })) || [];

    setData(() => newData);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      pagination={{ hideOnSinglePage: true }}
      loading={isLoading}
      columns={columns}
      dataSource={data}
    />
  );
}
