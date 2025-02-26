// import { Button, Flex, Tooltip } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";

// interface IProps {
//   roleId: string;
// }
// export const EditButton: React.FC<IProps> = ({ roleId }: IProps) => {
//   const navigator = useNavigate();

//   return (
//     <Flex wrap gap="small">
//       <Tooltip title="ویرایش نقش">
//         <Button
//           type="primary"
//           onClick={() =>
//             navigator(ROUTES_ENUM.PRODUCT_UPDATE.replace(":id", String(roleId)))
//           }
//           icon={<EditOutlined />}
//         ></Button>
//       </Tooltip>
//     </Flex>
//   );
// };
import { useEffect, useState } from "react";
import { Button, Modal, Table, message, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IProps {
  roleId: string;
}

interface PermissionType {
  id: string;
  name: string;
}

const { method: permissionMethod, url: permissionUrl } =
  BACKEND_ROUTES.permission.list;
const { method: addRoleMethod, url: addRoleUrl } =
  BACKEND_ROUTES.permission.addRoleToPermission;

const { method: currentPermissionsMethod, url: currentPermissionsUrl } =
  BACKEND_ROUTES.role.getCurrentPermissions;

export const EditButton: React.FC<IProps> = ({ roleId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    []
  );

  // Fetch permissions when modal opens
  useEffect(() => {
    if (isModalOpen) {
      apiClient[permissionMethod](permissionUrl).then(({ data }) => {
        setPermissions(data.data);
      });
    }

    apiClient[currentPermissionsMethod](
      currentPermissionsUrl.replace(":id", roleId)
    ).then(({ data }) => {
      const rolePermissions = data.data.map((perm: PermissionType) => perm.id);
      setSelectedPermissionIds(rolePermissions);
    });
  }, [isModalOpen]);

  // Handle row selection in the table
  const rowSelection = {
    selectedRowKeys: selectedPermissionIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedPermissionIds(selectedRowKeys.map(String));
    },
  };

  // Send selected permissions to backend
  const handleApplyPermissions = async () => {
    const apiData = selectedPermissionIds.map((prId) => {
      return { roleId, permissionId: prId };
    });
    try {
      const results = await Promise.allSettled(
        apiData.map((data) => apiClient[addRoleMethod](addRoleUrl, data))
      );

      if (results.every((item) => item.status === "fulfilled")) {
        message.success("تمام مجوز ها با موفقیت اعمال شد");
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش نقش">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<EditOutlined />}
        />
      </Tooltip>

      {/* Modal for selecting permissions */}
      <Modal
        title="انتخاب مجوزها"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            لغو
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={handleApplyPermissions}
            disabled={selectedPermissionIds.length === 0}
          >
            اعمال
          </Button>,
        ]}
      >
        <Table
          rowKey="id"
          columns={[{ title: "نام مجوز", dataIndex: "name" }]}
          dataSource={permissions}
          rowSelection={rowSelection}
        />
      </Modal>
    </Flex>
  );
};
