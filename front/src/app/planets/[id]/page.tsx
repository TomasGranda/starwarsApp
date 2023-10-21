"use client";

import { getCharacterById } from "@/app/apiCalls/charactersApiCalls";
import { getFilmsByOwnerId } from "@/app/apiCalls/filmsApiCalls";
import Character from "@/app/apiCalls/models/character";
import Film from "@/app/apiCalls/models/film";
import Planet from "@/app/apiCalls/models/planet";
import Starship from "@/app/apiCalls/models/starship";
import { getPlanetById } from "@/app/apiCalls/planetsApiCalls";
import { getStarshipsByOwnerId } from "@/app/apiCalls/starshipsApiCalls";
import { getIdFromPath } from "@/app/utils";
import { Card, Col, Descriptions, Row } from "antd";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [planetInfo, setPlanetInfo] = useState({} as Planet);

  const getPlanetInfo = async () => {
    const response = await getPlanetById(parseInt(params.id));
    setPlanetInfo(response?.data || ({} as Planet));
  };

  useEffect(() => {
    getPlanetInfo();
  }, []);

  return (
    <>
      <Row justify={"center"}>
        <Col span={10}>
          <Card title="Main Info" loading={planetInfo.name == undefined}>
            <Descriptions>
              <Descriptions.Item label="Name">
                {planetInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="Birth Year">
                {planetInfo.population}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {planetInfo.climate}
              </Descriptions.Item>
              <Descriptions.Item label="Height">
                {planetInfo.terrain}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col className="mt-5" span={10}>
          <Card title="Extra Info" loading={planetInfo.name == undefined}>
            <Descriptions>
              <Descriptions.Item label="Rotation period">
                {planetInfo.rotation_period}
              </Descriptions.Item>
              <Descriptions.Item label="Orbital Period">
                {planetInfo.orbital_period}
              </Descriptions.Item>
              <Descriptions.Item label="Diameter">
                {planetInfo.diameter}
              </Descriptions.Item>
              <Descriptions.Item label="Gravity">
                {planetInfo.gravity}
              </Descriptions.Item>
              <Descriptions.Item label="Surface Water">
                {planetInfo.surface_water}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}
