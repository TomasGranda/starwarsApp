import { BookFilled, BookOutlined } from "@ant-design/icons";
import { Bookmark } from "../utils";
import { useEffect, useState } from "react";

export default function BookmarkButton({
  type,
  name,
  url,
}: {
  type: string;
  name: string;
  url: string;
}) {
  const [bookMarks, setBookMarks] = useState(
    JSON.parse(localStorage.getItem(type + "Bookmarks") || "[]") as Bookmark[]
  );

  const refreshLocalStorage = (newBookMarks: Bookmark[]) => {
    localStorage.setItem(type + "Bookmarks", JSON.stringify(newBookMarks));
  };

  const removeBookMarks = () => {
    const newBookMarks = (
      JSON.parse(localStorage.getItem(type + "Bookmarks") || "[]") as Bookmark[]
    ).filter((bm) => bm.name != name);
    setBookMarks(newBookMarks);
  };

  const addBookMark = () => {
    const newBookMark = new Bookmark(name, url, type);
    const prevBookMarks = JSON.parse(
      localStorage.getItem(type + "Bookmarks") || "[]"
    ) as Bookmark[];
    setBookMarks([...prevBookMarks, newBookMark]);
  };

  useEffect(() => {
    setBookMarks(
      JSON.parse(localStorage.getItem(type + "Bookmarks") || "[]") as Bookmark[]
    );
  }, []);

  useEffect(() => {
    refreshLocalStorage(bookMarks);
  }, [bookMarks]);

  return bookMarks.find((bm) => bm.name == name) ? (
    <BookFilled onClick={() => removeBookMarks()} />
  ) : (
    <BookOutlined onClick={() => addBookMark()} />
  );
}
