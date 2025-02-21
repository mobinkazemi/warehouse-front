import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import { AxiosResponse } from "axios";
import moment from "jalali-moment";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";
import {
  WindowsOutlined,
  LinuxOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
interface DataType {
  id: React.Key;
  name: string;
  ip: string;
  groups: string;
  os: string;
  osIcon: number;
  version: string;
  registerDate: string;
  lastkeepAlive: string;
  status: string;
  synced: string;
}

interface IEachBackendRecord {
  id: React.Key;
  name: string;
  ip: string;
  groups: string;
  operating_system: string;
  version: string;
  registerDate: string;
  lastkeepAlive: string;
  status: string;
  synced: string;
}

interface IListResponse extends IBaseBackendResponse<IEachBackendRecord[]> {}

const { url: listUrl, method: listMethod } =
  BACKEND_ROUTES.operatingSystem.list;

const OSListPage: React.FC = () => {
  const [operatingSystemListData, setOperatingSystemListData] = useState<
    IEachBackendRecord[]
  >([]);
  const [deletedOperatingSystem, setDeletedOperatingSystem] = useState<
    number[]
  >([]);

  const columns = [
    {
      title: "آی‌دی",
      dataIndex: "id",
    },
    {
      title: "",
      dataIndex: "osIcon",
      render: (os: number | null) => {
        // 0 => unknown
        // 1 => windows
        // 2 => linux

        switch (os) {
          case 1:
            return (
              <WindowsOutlined style={{ color: "blue", fontSize: "25px" }} />
            );
            break;
          case 2:
            return (
              <LinuxOutlined style={{ color: "orange", fontSize: "25px" }} />
            );
            break;
          default:
            return (
              <QuestionOutlined
                style={{ color: "darkgrey", fontSize: "25px" }}
              />
            );
            break;
        }
      },
    },
    {
      title: "نام",
      dataIndex: "name",
    },
    {
      title: "آدرس آی‌پی",
      dataIndex: "ip",
    },
    {
      title: "گروه‌ها",
      dataIndex: "groups",
    },
    {
      title: "سیستم عامل",
      dataIndex: "os",
    },
    {
      title: "ورژن",
      dataIndex: "version",
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "registerDate",
    },
    {
      title: "آخرین بررسی",
      dataIndex: "lastkeepAlive",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
    },

    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <DeleteButton
              operatingSystemId={record.id as number}
              setDeletionState={setDeletedOperatingSystem}
              deletedOperatingSystem={deletedOperatingSystem}
            />
            <EditButton operatingSystemId={record.id as number} />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    apiClient[listMethod](listUrl).then(
      (data: AxiosResponse<IListResponse>) => {
        const setMe = (data.data.data || []).map((el) => {
          const osIcon = el.operating_system?.match(/windows/i)
            ? 1
            : el.operating_system?.match(/linux/i)
            ? 2
            : 0;
          return {
            id: el.id,
            osIcon,
            name: el.name,
            ip: el.ip,
            groups: el.groups,
            os: el.operating_system,
            version: el.version,
            registerDate: moment(el.registerDate).format("jYYYY/jMM/jDD HH:mm"),
            lastkeepAlive: moment(el.lastkeepAlive).format(
              "jYYYY/jMM/jDD HH:mm"
            ),
            status: el.status,
            synced: el.synced,
          };
        });

        setOperatingSystemListData(setMe as unknown as any);
      }
    );
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={
          operatingSystemListData.filter(
            (item) => deletedOperatingSystem.indexOf(item.id as number) === -1
          ) as any
        }
        rowKey="id"
      />
    </>
  );
};

export default OSListPage;
