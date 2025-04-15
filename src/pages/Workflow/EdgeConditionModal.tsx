import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";

export default function EdgeConditionModal({
  open,
  onClose,
  onSubmit,
  fromNode,
  toNode,
}) {
  const [status, setStatus] = useState("any");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [conditions, setConditions] = useState([]);

  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    // واکشی نقش‌ها
    axios.get("/api/roles").then((res) => setRoles(res.data));

    // اگر نود مبدا فرم داشت، فیلدهاشو بگیر
    if (fromNode?.data?.form?.fields?.length) {
      setFormFields(fromNode.data.form.fields);
    } else {
      setFormFields([]);
    }
  }, [fromNode]);

  const handleAddCondition = () => {
    setConditions((prev) => [
      ...prev,
      { fieldId: "", operator: "==", value: "" },
    ]);
  };

  const handleConditionChange = (index, key, value) => {
    setConditions((prev) => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const handleSave = () => {
    onSubmit({
      forStatus: status,
      forRole: selectedRole,
      forStepNumber: parseInt(toNode.data.order),
      conditions: formFields.length ? conditions : [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>تعریف شرایط انتقال</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* وضعیت انتقال */}
          <div>
            <Label>وضعیت انتقال</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">تأیید</SelectItem>
                <SelectItem value="reject">رد</SelectItem>
                <SelectItem value="any">هرکدام</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* نقش کاربری */}
          <div>
            <Label>نقش مربوطه</Label>
            <Select onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب نقش" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role._id} value={role._id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* شرط‌ها فقط اگر فرم داشت */}
          {formFields.length > 0 && (
            <div className="space-y-2">
              <Label>شرط‌ها</Label>
              {conditions.map((cond, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 items-center">
                  <Select
                    value={cond.fieldId}
                    onValueChange={(val) =>
                      handleConditionChange(index, "fieldId", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="فیلد" />
                    </SelectTrigger>
                    <SelectContent>
                      {formFields.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.label || f.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={cond.operator}
                    onValueChange={(val) =>
                      handleConditionChange(index, "operator", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اپراتور" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="==">==</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value="<">&lt;</SelectItem>
                      <SelectItem value=">">&gt;</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="مقدار"
                    value={cond.value}
                    onChange={(e) =>
                      handleConditionChange(index, "value", e.target.value)
                    }
                  />
                </div>
              ))}

              <Button variant="outline" onClick={handleAddCondition}>
                افزودن شرط جدید
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>ذخیره</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}