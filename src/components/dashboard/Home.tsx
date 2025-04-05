import { FC, useEffect, useState } from "react";
import {
  FaSpinner,
  FaThumbsUp,
  FaUserClock,
  FaUserCheck,
  FaThumbsDown,
  FaUserGraduate,
  FaHourglassHalf,
  FaUserCheck as FaUserVerified,
} from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa"
import { Fetch } from "../../hooks/apiUtils";

const Home: FC = () => {
  const [datas, setDatas] = useState<any>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res: any = await Fetch("/api/dashboard", undefined, 5000, false, false);
        if (res?.success) {
          setDatas(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };
    getDashboardData();
  }, []);

  const Card = ({
    value,
    label,
    subtitle,
    gradient,
    Icon,
    total,
  }: {
    Icon: any;
    label: string;
    subtitle: string;
    gradient: string;
    value: string | number;
    total?: string | number;
  }) => (
    <div
      className={`rounded-2xl p-5 text-white ${gradient} transition-transform hover:scale-[1.05] cursor-pointer duration-300`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold">
            {value}
            {total !== undefined && (
              <span className="text-xl text-white/70"> / {total}</span>
            )}
          </h2>
          <p className="text-base font-medium mt-2">{label}</p>
          <p className="text-sm text-white/80 mt-1">{subtitle}</p>
        </div>
        <div className="text-3xl bg-white/20 p-3 rounded-full">{Icon}</div>
      </div>
    </div>
  );

  const loanData = datas?.loanData || {};
  const leadData = datas?.leadData || {};

  return (
    <main className="space-y-10">
      <section>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">📊 CRM Dashboard Overview</h1>
        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            value={datas?.contactCountData || 0}
            label="Total Contact Inquiries"
            subtitle="Users who reached out via contact forms"
            gradient="bg-gradient-to-tr from-blue-500 to-indigo-500"
            Icon={<FaUserCheck />}
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">🎯 Loan Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LOAN Statuses */}
          <Card
            value={loanData?.Approved || 0}
            total={loanData?.total}
            label="Loan Approved"
            subtitle="Applications that have been approved"
            gradient="bg-gradient-to-tr from-green-500 to-emerald-400"
            Icon={<FaThumbsUp />}
          />
          <Card
            value={loanData?.["In Progress"] || 0}
            total={loanData?.total}
            label="Loan In Progress"
            subtitle="Currently under review"
            gradient="bg-gradient-to-tr from-yellow-500 to-amber-400"
            Icon={<FaSpinner />}
          />
          <Card
            value={loanData?.Disapproved || 0}
            total={loanData?.total}
            label="Loan Disapproved"
            subtitle="Applications that were declined"
            gradient="bg-gradient-to-tr from-red-500 to-rose-500"
            Icon={<FaThumbsDown />}
          />
          <Card
            value={loanData?.Pending || 0}
            total={loanData?.total}
            label="Loan Pending"
            subtitle="Awaiting processing or documents"
            gradient="bg-gradient-to-tr from-sky-500 to-cyan-500"
            Icon={<FaHourglassHalf />}
          />
        </div>

        {/* LEAD Statuses */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">🎯 Lead Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            value={leadData?.Pending || 0}
            total={leadData?.total}
            label="Lead Pending"
            subtitle="Leads not yet followed up"
            gradient="bg-gradient-to-tr from-purple-500 to-fuchsia-500"
            Icon={<FaUserClock />}
          />
          <Card
            value={leadData?.Eligible || 0}
            total={leadData?.total}
            label="Lead Eligible"
            subtitle="Leads qualified for next steps"
            gradient="bg-gradient-to-tr from-lime-500 to-green-400"
            Icon={<FaUserVerified />}
          />
          <Card
            value={leadData?.["Not Eligible"] || 0}
            total={leadData?.total}
            label="Lead Not Eligible"
            subtitle="Leads that did not meet criteria"
            gradient="bg-gradient-to-tr from-rose-400 to-pink-500"
            Icon={<FaUserTimes />}
          />
          <Card
            value={leadData?.Completed || 0}
            total={leadData?.total}
            label="Lead Completed"
            subtitle="Leads that completed the funnel"
            gradient="bg-gradient-to-tr from-indigo-500 to-violet-500"
            Icon={<FaUserGraduate />}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
