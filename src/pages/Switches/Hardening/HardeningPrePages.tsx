import { Button, Flex, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { useEffect, useState } from "react";
import apiClient from "../../../configs/axios.config";
import { AxiosResponse } from "axios";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import { BACKEND_ROUTES, setId } from "../../../shared/backendRoutes";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";

interface IResponseData {
  result: boolean;
  version: number;
  checkedAt: string;
  hardening: {
    id: number;
    title: string;
    description: string;
    audit: string;
    recommendations: string;
  };
}
interface IReportAPIResponse extends IBaseBackendResponse<IResponseData[]> {}

const { method: detailMethod, url: detailUrl } =
  BACKEND_ROUTES.hardeningResult.switches.detailList;

const { method: checkHardeningMethod, url: checkHardeningUrl } =
  BACKEND_ROUTES.switch.checkHardening;
const convertToCSV = (data: IResponseData[]) => {
  const headers = ["title", "checkedAt", "result"];
  const rows = data.map((item: any) => [
    item.hardening.title,
    item.checkedAt,
    item.result,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row: any) => row.join(",")),
  ].join("\n");

  return csvContent;
};

// Function to trigger CSV download
const downloadCSV = (csvContent: any) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const HardeningPrePage = () => {
  const { switchId } = useParams();
  const navigator = useNavigate();
  const [reportData, setReportData] = useState<IResponseData[]>([]);
  const [loading, setLoading] = useState(false);
  const handleCSVDownload = () => {
    const csvContent = convertToCSV(reportData);
    downloadCSV(csvContent);
  };

  useEffect(() => {
    apiClient[detailMethod](setId({ id: switchId as string, url: detailUrl }))
      .then((data: AxiosResponse<IReportAPIResponse>) => {
        setReportData(data.data.data!);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const checkAgainHardening = async () => {
    setLoading(true);
    try {
      await apiClient[checkHardeningMethod](
        setId({ id: switchId as string, url: checkHardeningUrl })
      );

      message.success("تست ها با موفقیت اجرا شد");
    } catch (error) {
      message.error("اجرای تست ها با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Flex vertical align="center" style={{ width: "100%" }}>
        <Button
          type="primary"
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginTop: "250px",
            width: "20%",
            height: "50px",
            backgroundColor: ColorPalletEnum.Primary,
          }}
          onClick={() =>
            navigator(
              ROUTES_ENUM.SWITCHES_REPORT_HARDENING_SUMMARYDETAIL.replace(
                ":switchId",
                String(switchId)
              )
            )
          }
        >
          نمایش جزییات تست ها
        </Button>
        <Button
          type="primary"
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginTop: "20px",
            width: "20%",
            height: "50px",
            backgroundColor: ColorPalletEnum.Primary,
          }}
          onClick={() =>
            navigator(
              ROUTES_ENUM.SWITCHES_CHARTS_HARDENING.replace(
                ":switchId",
                String(switchId)
              )
            )
          }
        >
          آنالیز نموداری
        </Button>
        <Button
          type="primary"
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginTop: "20px",
            width: "20%",
            height: "50px",
            backgroundColor: ColorPalletEnum.Primary,
          }}
          onClick={
            reportData.length
              ? handleCSVDownload
              : () => message.error("امکان گزارش گیری وجود ندارد", 3)
          }
        >
          گزارش گیری{" "}
        </Button>
        <Button
          type="primary"
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginTop: "20px",
            width: "20%",
            height: "50px",
            backgroundColor: ColorPalletEnum.Primary,
          }}
          onClick={checkAgainHardening}
          loading={loading}
        >
          تست مجدد
        </Button>
      </Flex>
    </>
  );
};

export default HardeningPrePage;
