import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, message } from "antd";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";

const FormUpdatePage: React.FC = () => {
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
        message.error("خطا در دریافت اطلاعات فرم");
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
      <Card title="ویرایش فرم">
        <div>فرمی با این شناسه یافت نشد.</div>
      </Card>
    );

  return (
    <Card title={`ویرایش فرم: ${form.name}`} className="w-full">
      <div>
        <p>صفحه ویرایش فرم فعلاً در دست توسعه است.</p>
        <p>
          شناسه فرم: <b>{form.id}</b>
        </p>
        <p>برای دیدن جزئیات، از صفحه نمایش استفاده کنید.</p>
      </div>
    </Card>
  );
};

export default FormUpdatePage;
