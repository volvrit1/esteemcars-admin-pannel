import { FC, useEffect, useState } from "react";
import { FaUserCheck, FaThumbsUp, FaSpinner, FaThumbsDown } from "react-icons/fa6";
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
    <div className={`rounded-2xl p-5 text-white ${gradient} transition-transform hover:scale-[1.1] cursor-pointer duration-300`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold">
            {value}
            {total !== undefined && <span className="text-xl text-white/70"> / {total}</span>}
          </h2>
          <p className="text-base font-medium mt-2">{label}</p>
          <p className="text-sm text-white/80 mt-1">{subtitle}</p>
        </div>
        <div className="text-3xl bg-white/20 p-3 rounded-full">{Icon}</div>
      </div>
    </div>
  );

  return (
    <main className="space-y-10">
      <section>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">📊 CRM Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            value={datas?.contactCountData || 0}
            label="Total Contact Inquiries"
            subtitle="Users who reached out via contact forms"
            gradient="bg-gradient-to-tr from-blue-500 to-indigo-500"
            Icon={<FaUserCheck />}
          />
          <Card
            value={datas?.loanData?.Approved || 0}
            total={datas?.loanData?.total || 0}
            label="Loan Approved"
            subtitle="Applications that have been approved"
            gradient="bg-gradient-to-tr from-green-500 to-emerald-400"
            Icon={<FaThumbsUp />}
          />
          <Card
            value={datas?.loanData?.["In Progress"] || 0}
            total={datas?.loanData?.total || 0}
            label="Loan In Progress"
            subtitle="Currently under review"
            gradient="bg-gradient-to-tr from-yellow-500 to-amber-400"
            Icon={<FaSpinner />}
          />
          <Card
            value={datas?.loanData?.Disapproved || 0}
            total={datas?.loanData?.total || 0}
            label="Loan Disapproved"
            subtitle="Applications that were declined"
            gradient="bg-gradient-to-tr from-rose-500 to-red-500"
            Icon={<FaThumbsDown />}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
