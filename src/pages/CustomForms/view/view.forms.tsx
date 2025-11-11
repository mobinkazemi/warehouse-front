import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Spin } from "antd";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";

const FormViewPage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { method, url } = BACKEND_ROUTES.form.list;
        const res = await apiClient[method](url);
        const list = res.data?.data || [];
        const found = list.find((f: any) => String(f.id) === String(id));
        setForm(found || null);
      } catch (e) {
        setForm(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Spin />;

  if (!form)
    return (
      <Card title="نمایش فرم">
        <div>فرمی با این شناسه یافت نشد.</div>
      </Card>
    );

  return (
    <Card title={`نمایش فرم: ${form.name}`} className="w-full">
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="شناسه">{form.id}</Descriptions.Item>
        <Descriptions.Item label="نام">{form.name}</Descriptions.Item>
        <Descriptions.Item label="فیلدها">
          <div>
            {Array.isArray(form.fields) && form.fields.length ? (
              form.fields.map((f: any, idx: number) => (
                <div key={idx} style={{ marginBottom: 8 }}>
                  <b>{f.label || f.name}</b>
                  <div>نوع: {f.type}</div>
                  {f.selectItems && f.selectItems.length ? (
                    <div>گزینه‌ها: {f.selectItems.map((s: any) => s.label).join(", ")}</div>
                  ) : null}
                </div>
              ))
            ) : (
              <div>فیلد ثبت نشده است.</div>
            )}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default FormViewPage;
