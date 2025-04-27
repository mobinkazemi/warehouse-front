import React, { useEffect, useState } from "react";
import { Eye, Trash2, Activity, Users, ChevronLeft } from "lucide-react"; // Using more Lucide React icons
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { IWorkflowStep } from "../workflow.interface";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./parts/DeleteButton";

interface DataType {
  id: React.Key;
  name: string;
  starterRoles: string;
  steps: IWorkflowStep[];
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.workflow.list;

const WorkflowListPage: React.FC = () => {
  const [workflowsData, setWorkflowsData] = useState<DataType[]>([]);
  const [deletedWorkflows, setDeletedWorkflows] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setWorkflowsData(
        data.data.map((sw: any) => ({
          ...sw,
          starterRoles: sw.starterRoles
            .map((role: any) => role.name)
            .join(", "),
        }))
      );
    });
  }, []);

  const handleDelete = (id: React.Key) => {
    setDeletedWorkflows([...deletedWorkflows, id as number]);
    // You would also call your API to delete the workflow here
  };

  const filteredWorkflows = workflowsData.filter(
    (item) => deletedWorkflows.indexOf(item.id as number) === -1
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center">
        <Activity className="ml-2 text-orange-500" size={24} />
        لیست فرایندها
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <div 
            key={workflow.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="border-b border-gray-100 bg-orange-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white truncate transition-colors duration-300">
                {workflow.name}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-start mb-4">
                <Users className="text-orange-500 ml-3 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">نقش های شروع کننده:</p>
                  <p className="text-gray-700">{workflow?.starterRoles || "ندارد"}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <Activity className="text-orange-500 ml-3 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">تعداد مراحل:</p>
                  <p className="text-gray-700">{workflow.steps?.length || 0} مرحله</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => handleDelete(workflow.id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
                title="حذف"
              >
                <DeleteButton  projectId={workflow.id as string}
              setDeletedProject={setDeletedWorkflows}
              deletedProject={deletedWorkflows} />
              </button>
              
              <button
                onClick={() => navigate(`/workflow/steps/${workflow.id}`)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 transition-colors duration-200 font-medium"
                title="مشاهده مراحل"
              >
                <span className="ml-1">مشاهده مراحل</span>
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredWorkflows.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <Activity className="mx-auto text-orange-500 opacity-30" size={64} />
          <p className="text-gray-500 mt-4 text-lg">هیچ فرایندی یافت نشد.</p>
        </div>
      )}
    </div>
  );
};

export default WorkflowListPage;