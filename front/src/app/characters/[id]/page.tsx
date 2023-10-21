"use client";

import { getCharacterById } from "@/app/apiCalls/charactersApiCalls";
import { getFilmsByOwnerId } from "@/app/apiCalls/filmsApiCalls";
import Character from "@/app/apiCalls/models/character";
import Film from "@/app/apiCalls/models/film";
import Planet from "@/app/apiCalls/models/planet";
import Starship from "@/app/apiCalls/models/starship";
import { getPlanetById } from "@/app/apiCalls/planetsApiCalls";
import {
  getStarshipsByOwnerId,
} from "@/app/apiCalls/starshipsApiCalls";
import { getIdFromPath } from "@/app/utils";
import { Card, Col, Descriptions, Row } from "antd";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [characterInfo, setCharacterInfo] = useState({} as Character);
  const [planetInfo, setPlanetInfo] = useState({} as Planet);
  const [starshipsInfo, setStarshipsInfo] = useState([] as Starship[]);
  const [starshipsLoading, setStarshipsLoading] = useState(true);
  const [filmsLoading, setFilmsLoading] = useState(true);
  const [filmsInfo, setFilmsInfo] = useState([] as Film[]);

  const getCharacterInfo = async () => {
    const response = await getCharacterById(parseInt(params.id));
    setCharacterInfo(response?.data || ({} as Character));
    getPlanetInfo(
      parseInt(getIdFromPath(new URL(response?.data.homeworld || "")) || "1")
    );
  };

  const getPlanetInfo = async (planetId: number) => {
    const response = await getPlanetById(planetId);
    setPlanetInfo(response?.data || ({} as Planet));
  };

  const getStarshipInfo = async () => {
    const response = await getStarshipsByOwnerId(parseInt(params.id));
    setStarshipsInfo(response?.data || ([] as Starship[]));
    setStarshipsLoading(false);
  };

  const getFilmsInfo = async () => {
    const response = await getFilmsByOwnerId(parseInt(params.id));
    setFilmsInfo(response?.data || ([] as Film[]));
    setFilmsLoading(false);
  };

  useEffect(() => {
    getCharacterInfo();
    getStarshipInfo();
    getFilmsInfo();
  }, []);

  return (
    <>
      <Row justify={"center"}>
        <Col span={10}>
          <Card
            title="Character info"
            loading={characterInfo.name == undefined}
          >
            <Descriptions>
              <Descriptions.Item label="Name">
                {characterInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="Birth Year">
                {characterInfo.birth_year}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {characterInfo.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Height">
                {characterInfo.height}
              </Descriptions.Item>
              <Descriptions.Item label="Mass">
                {characterInfo.mass}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={1} />
        <Col span={10}>
          <Card title="Films" loading={filmsLoading}>
            {filmsInfo.map((f, i) => (
              <Descriptions title={f.title} key={i}>
                <Descriptions.Item label="Episode">
                  {f.episode_id}
                </Descriptions.Item>
                <Descriptions.Item label="Release Date">
                  {f.release_date}
                </Descriptions.Item>
                <Descriptions.Item label="Director">
                  {f.director}
                </Descriptions.Item>
              </Descriptions>
            ))}
          </Card>
        </Col>
      </Row>
      <Row className="mt-5" justify={"center"}>
        <Col span={11} />
        <Col span={10}>
          <Card title="Extra Info" loading={characterInfo.name == undefined}>
            <Descriptions>
              <Descriptions.Item label="Hair Color">
                {characterInfo.hair_color}
              </Descriptions.Item>
              <Descriptions.Item label="Skin Color">
                {characterInfo.skin_color}
              </Descriptions.Item>
              <Descriptions.Item label="Eye Color">
                {characterInfo.eye_color}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5" justify={"center"}>
        <Col span={11} />
        <Col span={10}>
          <Card title="Planet Info" loading={planetInfo.name == undefined}>
            <Descriptions>
              <Descriptions.Item label="Name">
                {planetInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="Population">
                {planetInfo.population}
              </Descriptions.Item>
              <Descriptions.Item label="Climate">
                {planetInfo.climate}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      {characterInfo.name != undefined &&
        characterInfo.starships.length > 0 && (
          <Row className="mt-5" justify={"center"}>
            <Col span={11} />
            <Col span={10}>
              <Card title="Ships Info" loading={starshipsLoading}>
                {starshipsInfo.map((ss, i) => (
                  <Descriptions title={ss.name} key={i}>
                    <Descriptions.Item label="Max Atmosphering Speed">
                      {ss.max_atmosphering_speed}
                    </Descriptions.Item>
                    <Descriptions.Item label="Manufacturer">
                      {ss.manufacturer}
                    </Descriptions.Item>
                    <Descriptions.Item label="Cost in Credits">
                      {ss.cost_in_credits}
                    </Descriptions.Item>
                  </Descriptions>
                ))}
              </Card>
            </Col>
          </Row>
        )}
    </>
  );
}
