// pages/index.tsx
import { FC, useEffect, useState } from "react";
import LineGraph from "../chart/Linegraph";
import { IoStatsChart } from "react-icons/io5";
import { ImParagraphLeft } from "react-icons/im";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import ConcentricCircleGraph from "../chart/ConcentricCircleGraph";
import BarChartWithNegativePositiveXAxis from "../chart/BarChartWithNegativePositiveXAxis";
import { CRMStats } from "../../hooks/types";
import { Fetch } from "../../hooks/apiUtils";

const Home: FC = () => {
  const crmStats: CRMStats = {
    totalRevenue: "$150.75k",
    activeUsers: "5.87K",
    totalDeals: "8,654",
    conversionRatio: "4.25%",
    revenueData: [
      { month: "Jan", thisYear: 30, lastYear: 20 },
      { month: "Feb", thisYear: 45, lastYear: 40 },
      { month: "Mar", thisYear: 50, lastYear: 30 },
      { month: "Apr", thisYear: 60, lastYear: 50 },
      { month: "May", thisYear: 70, lastYear: 60 },
      { month: "Jun", thisYear: 50, lastYear: 45 },
      { month: "Jul", thisYear: 40, lastYear: 30 },
      { month: "Aug", thisYear: 60, lastYear: 55 },
      { month: "Sep", thisYear: 65, lastYear: 60 },
      { month: "Oct", thisYear: 55, lastYear: 50 },
    ],
    profitReport: {
      profit: "$3.56K",
      revenue: "$4.25K",
      expenses: "$2.77K",
    },
  };
  const [datas, setDatas] = useState<any>();
  const data = [1, 2, 3, 4, 5];

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res: any = await Fetch(
          `/api/dashboard`,
          undefined,
          5000,
          false,
          false
        );
        if (res?.success) {
          setDatas(res?.data);
        }
      } catch (error) {}
    };
    getDashboardData();
  }, []);

  return (
    <div className="space-y-10">
      {/* CRM Stats */}

      <section className="">
        <h2 className="text-xl font-bold text-iconBlack">CRM Dashboard</h2>
        <div className="grid grid-cols-2 gap-5 mt-6 md:grid-cols-2">
          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[45%] flex flex-col justify-end items-center text-right gap-3">
              {/* <div className="bg-blue-200 p-1.5 w-fit rounded-full">
                <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                 <IoStatsChart className="text-white text-xl" /> 
                </div>
              </div> */}
              <div>
                <p className="text-4xl text-left font-bold text-blue-400">
                  {datas?.contactCountData|| 0}
                </p>
                {/* <h3 className="text-xs text-gray-500 font-semibold">
                  Total Revenue
                </h3> */}
              </div>
            </div>
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {/* 1.23% <FaArrowUp /> */}
              </p>
              <h3 className="text-lg font-semibold text-gray-400">
                Total Contact Inquiries Details
              </h3>
              {/* <LineGraph borderColor="rgba(0, 123, 255, 1)" /> */}
            </div>
          </div>

          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[45%] flex flex-col justify-end items-center text-right gap-3">
              {/* <div className="bg-blue-200 p-1.5 w-fit rounded-full">
                <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                 <IoStatsChart className="text-white text-xl" /> 
                </div>
              </div> */}
              <div>
                <p className="text-4xl text-left font-bold text-green-400">
                  {datas?.loanData?.Approved || 0}{" "}
                  <span className="text-xl">/{datas?.loanData?.total || 0}</span>
                </p>
                {/* <h3 className="text-xs text-gray-500 font-semibold">
                  Total Revenue
                </h3> */}
              </div>
            </div>
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {/* 1.23% <FaArrowUp /> */}
              </p>
              <h3 className="text-lg  font-semibold text-gray-400">
                Loan Approval Details
              </h3>
              {/* <LineGraph borderColor="rgba(0, 123, 255, 1)" /> */}
            </div>
          </div>

          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[45%] flex flex-col justify-end items-center text-right gap-3">
              {/* <div className="bg-blue-200 p-1.5 w-fit rounded-full">
                <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                 <IoStatsChart className="text-white text-xl" /> 
                </div>
              </div> */}
              <div>
                <p className="text-4xl text-left font-bold text-yellow-400">
                  {datas?.loanData?.["In Progress"] || 0}{" "}
                  <span className="text-xl">/{datas?.loanData?.total || 0}</span>
                </p>
                {/* <h3 className="text-xs text-gray-500 font-semibold">
                  Total Revenue
                </h3> */}
              </div>
            </div>
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {/* 1.23% <FaArrowUp /> */}
              </p>
              <h3 className="text-lg  font-semibold text-gray-400">
                Loan Pending Details
              </h3>
              {/* <LineGraph borderColor="rgba(0, 123, 255, 1)" /> */}
            </div>
          </div>

          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[45%] flex flex-col justify-end items-center text-right gap-3">
              {/* <div className="bg-blue-200 p-1.5 w-fit rounded-full">
                <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                 <IoStatsChart className="text-white text-xl" /> 
                </div>
              </div> */}
              <div>
                <p className="text-4xl text-left font-bold text-red-400">
                  {datas?.loanData?.Disapproved || 0}{" "}
                  <span className="text-xl">/{datas?.loanData?.total || 0}</span>
                </p>
                {/* <h3 className="text-xs text-gray-500 font-semibold">
                  Total Revenue
                </h3> */}
              </div>
            </div>
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {/* 1.23% <FaArrowUp /> */}
              </p>
              <h3 className="text-lg  font-semibold text-gray-400">
                Loan Disapproved Details
              </h3>
              {/* <LineGraph borderColor="rgba(0, 123, 255, 1)" /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
