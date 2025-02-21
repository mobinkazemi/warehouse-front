import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import apiClient from "../../../configs/axios.config";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import moment from "jalali-moment";
import { jalaliDateToText } from "../../../shared/functions/jalali-date-to-text-converted";
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

const { method, url } = BACKEND_ROUTES.hardeningResult.switches.detailList;
interface IResponse extends IBaseBackendResponse<IResponseDataType[]> {}
const HardeningPage: React.FC = () => {
  const [switchesListData, setSwitchesListData] = useState<IResponseDataType[]>(
    []
  );
  const { switchId } = useParams();

  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "تاریخ آخرین بررسی",
      dataIndex: "checkedAt",
    },
    {
      title: "نسخه",
      dataIndex: "version",
    },
    {
      title: "وضعیت",
      dataIndex: "result",
      render: (status: boolean | null) =>
        status === null ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            درحال بررسی
          </Tag>
        ) : status === true ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            امن
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            غیر امن
          </Tag>
        ),
    },
  ];
  useEffect(() => {
    apiClient[method](setId({ id: switchId as string, url }))
      .then((data: AxiosResponse<IResponse>) => {
        const stateData = data.data.data!.map((item) => {
          return {
            title: item.hardening.title,
            description: item.hardening.description,
            audit: item.hardening.audit,
            recommendations: item.hardening.recommendations,
            result: item.result,
            version: item.version,
            id: item.id,
            // checkedAt: moment(item.checkedAt).format("jYYYY/jM/jD"),
            checkedAt: jalaliDateToText(
              moment(item.checkedAt).format("jYYYY/jM/jD HH:mm")
            ),
            hardening: item.hardening,
          };
        });

        setSwitchesListData(stateData);
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={switchesListData.sort(
          (a, b) => (a.result === true ? 1 : 0) - (b.result === true ? 1 : 0)
        )}
        rowKey="id"
      />
    </>
  );
};

export default HardeningPage;
