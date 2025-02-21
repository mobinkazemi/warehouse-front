import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../configs/axios.config";
import { Flex, message } from "antd";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import { AxiosResponse } from "axios";
import { Line } from "@ant-design/plots";
import React from "react";
import "../background.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Liquid } from "@ant-design/plots";
import { BACKEND_ROUTES, setId } from "../../../shared/backendRoutes";

interface IResponseDataType {
  id: React.Key;
  checkedAt: Date | string;
  result: boolean;
  version?: number;
  hardening: {
    description: string;
    audit: string;
    title: string;
    recommendations: string;
  };
}
interface IResponseVersionDataType {
  version: number;
  true: number;
  false: number;
  percentage: number;
}
interface IAPIResponse extends IBaseBackendResponse<IResponseDataType[]> {}
interface IAPIResponseVersion
  extends IBaseBackendResponse<IResponseVersionDataType[]> {}

const {
  detailList: { method: detailMethod, url: detailUrl },
  version: { method: versionMethod, url: versionUrl },
} = BACKEND_ROUTES.hardeningResult.switches;
const Charts = () => {
  const { switchId } = useParams();
  const [hardeningResults, setHardeningResults] = useState<IResponseDataType[]>(
    []
  );
  const [hardeningVersionResults, setHardeningVersionResults] = useState<
    IResponseVersionDataType[]
  >([]);

  useEffect(() => {
    apiClient[detailMethod]<IAPIResponse>(
      setId({ id: switchId as string, url: detailUrl })
    )
      .then((data: AxiosResponse<IAPIResponse>) => {
        setHardeningResults(data.data.data!);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });

    apiClient[versionMethod]<IAPIResponseVersion>(
      setId({ id: switchId as string, url: versionUrl })
    )
      .then((data: AxiosResponse<IAPIResponseVersion>) => {
        console.log(data.data.data);
        setHardeningVersionResults(data.data.data!);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  }, []);

  if (hardeningResults.length === 0 || hardeningVersionResults.length === 0) {
    return (
      <>
        <Flex align="center" justify="center" gap="middle" vertical>
          <Spin
            style={{ paddingTop: 200 }}
            indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />}
          />
          <span style={{ fontSize: 20, paddingTop: 50 }}>
            در حال دریافت اطلاعات
          </span>
        </Flex>
      </>
    );
  }

  //
  //
  //
  //
  // FOR PIE CHART
  let notSecureCount = 0;
  let secureCount = 0;
  hardeningResults.forEach((result) => {
    if (result.result) {
      secureCount++;
    } else {
      notSecureCount++;
    }
  });

  const pieConfig = {
    data: [
      {
        type: "امن",
        value: secureCount,
      },
      {
        type: "غیر امن",
        value: notSecureCount,
      },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: (d: any) => `${d.type}: ${d.value}`,
      style: {
        fontSize: 15,
        fontWeight: "bold",
      },
    },
  };

  //
  //
  //
  //
  // FOR PROGRESS BAR
  const progress = (secureCount / (secureCount + notSecureCount)).toFixed(2);

  const liquidConfig = {
    percent: Number(progress),
    style: {
      backgroundFill: "pink",
    },
  };

  //
  //
  //
  // FOR LINE CHART
  const lineConfig = {
    data: hardeningVersionResults.map((item) => {
      return {
        version: item.version.toString(),
        percentage: item.percentage * 100,
      };
    }),
    xField: "version",
    yField: "percentage",
    point: {
      shapeField: "circle",
      sizeField: 10,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 5,
      stroke: "#FFC0CA",
    },

    axis: {
      x: { title: "نسخه" },
      y: { title: "درصد امنیت" },
    },
  };

  //
  //
  //
  //
  // SHOW RESULTS
  return (
    <div className="SwitchPage">
      <Flex align="center" justify="center" vertical>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Stack title on top, charts below
            width: "85%",
            height: "30%",
            borderRadius: "10px",
            border: "2px solid lightgray",
            backgroundColor: "white",
            padding: "1rem",
            marginTop: "5rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            position: "relative", // Allows absolute positioning of the title
          }}
        >
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bolder",
              position: "absolute", // Position title absolutely within the container
              top: "10px",
              right: "10px", // Top-right corner
              color: "#454545",
            }}
          >
            میزان امنیت سوییچ
          </span>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "2rem", // Spacing between title and charts
            }}
          >
            <Pie {...pieConfig} />
            <Liquid {...liquidConfig} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Stack title on top, charts below
            width: "85%",
            height: "30%",
            borderRadius: "10px",
            border: "2px solid lightgray",
            backgroundColor: "white",
            padding: "1rem",
            marginTop: "5rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            position: "relative", // Allows absolute positioning of the title
          }}
        >
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bolder",
              position: "absolute", // Position title absolutely within the container
              top: "10px",
              right: "10px", // Top-right corner
              color: "#454545",
            }}
          >
            تغییرات نسخه های امنیت سوییچ
          </span>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "2rem", // Spacing between title and charts
            }}
          >
            {" "}
            <Line {...lineConfig} />
          </div>
        </div>
        <div style={{ marginBottom: "5rem" }}></div>
      </Flex>
    </div>
  );
};

export default Charts;
