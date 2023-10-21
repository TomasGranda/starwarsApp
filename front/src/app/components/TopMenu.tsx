"use client";

import { Menu, MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { usePathname } from "next/navigation";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "/",
  },
  {
    label: <Link href="/characters">Characters</Link>,
    key: "/characters",
  },
  {
    label: <Link href="/films">Films</Link>,
    key: "/films",
  },
  {
    label: <Link href="/starships">Starships</Link>,
    key: "/starships",
  },
  {
    label: <Link href="/planets">Planets</Link>,
    key: "/planets",
  },
  {
    label: <Link href="/bookmarks">Bookmarks</Link>,
    key: "/bookmarks",
  },
];

export default function TopMenu() {
  const route = usePathname();

  return (
    <Menu selectedKeys={[route]} items={items} theme="dark" mode="horizontal" />
  );
}
