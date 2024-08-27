import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Helmet } from "react-helmet-async";

ChartJS.register(ArcElement, Tooltip, Legend);

const Balance = () => {
  const [forceLoading, setForceLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setForceLoading(false);
    }, 2500);
  }, []);

  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: balanceData = {}, isLoading } = useQuery({
    queryKey: ["balance", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/balance?email=${user?.email}`);
      return data;
    },
  });

  const pieChartData = {
    labels: balanceData?.chartData?.map((item) => item[0]) || [],
    datasets: [
      {
        data: balanceData?.chartData?.map((item) => item[1]) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Paid members / NewsLetter Subscribers",
      },
    },
  };

  if (loading || isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen w-full py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Balance | Fit N Flex Arena</title>
      </Helmet>
      <div className="mx-auto mb-6 w-[300px] lg:mb-8">
        <div className="overflow-hidden rounded-lg border border-amber-500 bg-white text-center shadow-md shadow-amber-200">
          <div className="flex flex-col justify-between gap-8 px-6 py-8">
            <h3 className="mb-4 text-5xl font-bold text-amber-500">Balance</h3>
            <h2 className="mb-8 text-3xl font-bold text-amber-500">
              Total : {balanceData.info[0].totalBalance} $
            </h2>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full lg:w-10/12 2xl:w-3/4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th>#</th>
                <th>Member Email</th>
                <th>Trx Id</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {balanceData.info[0].transactions
                .slice(0, 6)
                .map(({ email, transactionId, price }, index) => (
                  <tr key={index}>
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{email}</td>
                    <td className="p-4">{transactionId}</td>
                    <td className="p-4">{price}$</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {forceLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="mx-auto size-96 py-8 md:py-10 lg:py-12">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      )}
    </div>
  );
};

export default Balance;
