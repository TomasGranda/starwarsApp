"use client";

import Starship from "@/app/apiCalls/models/starship";
import { getStarshipById } from "@/app/apiCalls/starshipsApiCalls";
import { Card, Col, Descriptions, Row } from "antd";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [starshipInfo, setStarshipInfo] = useState({} as Starship);

  const getStarshipInfo = async () => {
    const response = await getStarshipById(parseInt(params.id));
    setStarshipInfo(response?.data || ({} as Starship));
  };

  useEffect(() => {
    getStarshipInfo();
  }, []);

  return (
    <>
      <Row justify={"center"}>
        <Col span={10}>
          <Card title="Main Info" loading={starshipInfo.name == undefined}>
            <Descriptions>
              <Descriptions.Item label="Name">
                {starshipInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="Model">
                {starshipInfo.model}
              </Descriptions.Item>
              <Descriptions.Item label="Manufacturer">
                {starshipInfo.manufacturer}
              </Descriptions.Item>
              <Descriptions.Item label="Cost in Credits">
                {starshipInfo.cost_in_credits}
              </Descriptions.Item>
              <Descriptions.Item label="Starship Class">
                {starshipInfo.starship_class}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5" justify={"center"}>
        <Col span={10}>
          <Card title="Extra Info" loading={starshipInfo.name == undefined}>
            <Descriptions>
              <Descriptions.Item label="Max Atmosphere Speed">
                {starshipInfo.max_atmosphering_speed}
              </Descriptions.Item>
              <Descriptions.Item label="Length">
                {starshipInfo.length}
              </Descriptions.Item>
              <Descriptions.Item label="Passengers">
                {starshipInfo.passengers}
              </Descriptions.Item>
              <Descriptions.Item label="Cargo Capacity">
                {starshipInfo.cargo_capacity}
              </Descriptions.Item>
              <Descriptions.Item label="Hyperdrive Rating">
                {starshipInfo.hyperdrive_rating}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}
