import React, { useEffect, useState } from "react";
import { Play, ArrowRight, Workflow, Loader, ArrowLeft } from "lucide-react"; // Using Lucide React icons
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { IWorkflowStep } from "../workflow.interface";
import { StartButton } from "./parts/startButton";

interface DataType {
  id: React.Key;
  name: string;
  starterRoles: string;
  steps: IWorkflowStep[];
}

const { url: listUrl, method: listMethod } =
  BACKEND_ROUTES.workflow.listOfAvailableWorkflowsToStart;

const ListOfAvailableWorkflowsToStartPage: React.FC = () => {
  const [workflowsListData, setWorkflowsListData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    apiClient[listMethod](listUrl)
      .then(({ data }) => {
        setWorkflowsListData(
          data.data.map((sw: any) => ({
            ...sw,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Workflow className="mr-2 text-orange-500" size={24} />
          فرایندهای قابل شروع
        </h2>
      </div>

      {workflowsListData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Workflow
            className="mx-auto text-orange-500 opacity-30 mb-4"
            size={64}
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            فرایندی برای شروع یافت نشد
          </h3>
          <p className="text-gray-500">
            در حال حاضر هیچ فرایندی برای شروع در دسترس شما نیست.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowsListData.map((workflow) => (
            <div
              key={workflow.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>

              <div className="relative p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold mb-3 text-orange-500 transition-colors duration-300">
                    {workflow.name}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 mr-auto">
                    <Play className="text-orange-500 rotate-180" size={20} />
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-sm">
                  با شروع این فرایند، گردش کار مربوطه آغاز خواهد شد.
                </p>

          
                   <StartButton workflowId={workflow.id as string} /> 
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-100 to-transparent opacity-70 rounded-bl-3xl"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfAvailableWorkflowsToStartPage;
