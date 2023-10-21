import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import TopMenu from "./components/TopMenu";
import { Suspense } from "react";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Star Wars DB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Header>
            <Suspense fallback={<p>Loading feed...</p>}>
              <TopMenu />
            </Suspense>
          </Header>
          <Content className="content">{children}</Content>
        </Layout>
      </body>
    </html>
  );
}
