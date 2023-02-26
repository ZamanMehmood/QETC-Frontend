import React from "react";
import { Button } from "@material-tailwind/react/components/Button";
import Canvas from "@/widgets/charts/Canvas";
import applicationCardData from "@/data/application-data";
import tableCardData from "@/data/table-data copy";
import nametableCardData from "@/data/nametable-data";
import { statisticsCardsData } from "@/data";
import { StatisticsCard } from "@/widgets/cards";
import Horizontal from "@/widgets/charts/Horizontal-chart";
import ApexChart from "@/widgets/charts/stackedbar-chart";
import Pie01 from "@/widgets/charts/pie-chart01";
import Pie02 from "@/widgets/charts/pie-chart02";
import ApexChartBar from "@/widgets/charts/bar-chart";

export function Home() {
  return (
    <div className="mt-12 w-full font-display">
      <div className="my-10 grid grid-cols-1">
        <p className=" text-4xl font-semibold text-[#280559] mb-2">Dashboard</p>
        <p className=" font text-sm  text-[#9898A3] xl:text-base">
          View all status from the dashboard
        </p>
      </div>
      <div className="mb-12 mr-10 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 2xl:grid-cols-5">
        {statisticsCardsData.map(({ value, title }) => (
          <StatisticsCard key={title} value={value} title={title} />
        ))}
      </div>
      <div className=" mb-5 mr-10 grid grid-cols-1 gap-y-12 gap-x-6 lg:items-center xl:grid-cols-2 laptop:grid-cols-4">
        <Pie01 />
        <ApexChartBar />
        <Pie02 />
        <Canvas />
      </div>

      <div className=" mb-5 mr-10 grid grid-cols-1 gap-y-12 gap-x-6 2xl:grid-cols-2 laptop:grid-cols-3">
        <Horizontal />
        <ApexChart />
        {nametableCardData.map((items) => (
          <div key={items.subject} className="rounded-xl bg-white p-8">
            <div className=" flex flex-row items-center justify-between mb-3">
              <p className="w-1/2 px-3 text-base font-medium text-black antialiased xl:text-xl">
                {items.subject}
              </p>
              <Button
                variant="outlined"
                className="h-[46px] w-[115px] justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                fullWidth
              >
                <p className="px-3 text-center text-base font-medium normal-case">
                  View All
                </p>
              </Button>
            </div>
            <div className="flex flex-col w-full overflow-x-auto">
              <table className="w-full border-none">
                  <thead>
                    <tr>
                      <td className=" w-full px-3 text-sm font-medium  text-[#92929D] xl:text-base py-3">
                        {items.name}
                      </td>
          
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                  {items.tablelist.map((item) => (
                    <tr key={item.data}>
                      <td className="w-[320px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                      {item.data}
                      </td>
              
                      <td className="px-3">
                      <Button
                  variant="outlined"
                  className="h-[28px] w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                  fullWidth
                >
                  <p className="text-center text-xs font-medium normal-case">
                    View
                  </p>
                </Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>


            <div className="hidden my-5 flex-row items-center justify-between gap-4">
              <p className=" w-[320px] text-sm font-medium text-[#92929D] xl:text-base">
                {items.name}
              </p>
              <p className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base">
                Action
              </p>
            </div>
          </div>
        ))}

          <div className="rounded-xl bg-white p-8">
            <div className=" flex flex-row items-center justify-between mb-3">
              <p className="w-1/2 px-3 text-base font-medium text-black antialiased xl:text-xl">
              Application
            </p>
            <Button
              variant="outlined"
              className="px-3 h-[46px] w-[115px] justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
              fullWidth
            >
              <p className="text-center text-base font-medium normal-case">
                View All
              </p>
            </Button>
          </div>
          <div className="flex flex-col w-full overflow-x-auto sm:overflow-hidden laptop:overflow-x-auto">
              <table className="w-full border-none">
                  <thead>
                    <tr>
                      <td className="whitespace-nowrap w-full md:w-[250px] 2xl:w-[150px] laptop:w-[250px] px-3 text-sm font-medium  text-[#92929D] xl:text-base py-3">
                      University Name
                      </td>
                  
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Status
                      </td>
            
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                  {applicationCardData?.map((item) => (
                    <tr key={item.name}>
                      <td className="block whitespace-nowrap overflow-hidden w-full md:w-[250px] 2xl:w-[150px] laptop:w-[250px] px-3 text-sm font-medium text-black xl:text-lg my-3 text-ellipsis">
                      {item.name}
                      </td>
                      <td className="px-3">
                      <p
                className="mx-auto w-fit rounded-[100px] px-5 py-2 text-center text-xs font-medium normal-case"
                style={{
                  color: `${item.color}`,
                  backgroundColor: `${item.color}10`,
                }}
              >
                {item.status}
              </p>
                      </td>
                      <td className="px-3">
                      <Button
                  variant="outlined"
                  className="h-[28px] mx-auto w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                  fullWidth
                >
                  <p className="text-center text-xs font-medium normal-case">
                    View
                  </p>
                </Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
        </div>
      </div>


      <div className="mb-5 mr-10 grid  grid-cols-1 gap-y-12 gap-x-6  laptop:grid-cols-2">
        {tableCardData.map((data) => (
          <div key={data.subject} className="rounded-xl bg-white p-8">
          <div className=" flex flex-row items-center justify-between mb-3">
            <p className="w-1/2 px-3 text-base font-medium text-black antialiased xl:text-xl">
                {data.subject}
              </p>
              <Button
                variant="outlined"
                className=" h-[46px] w-[115px] rounded-[15px] border border-[#280559] p-0 text-[#280559] hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                fullWidth
              >
                <p className=" text-center text-base font-medium normal-case">
                  View All
                </p>
              </Button>
            </div>

<div className="flex flex-col w-full overflow-x-auto">
              <table className="w-full border-none">
                  <thead>
                    <tr>
                      <td className=" w-[200px] px-3 text-sm font-medium  text-[#92929D] xl:text-base py-3">
                      Recipient
                      </td>
                      <td className="w-[85px] px-3 text-left text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Amount
                      </td>
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Action
                      </td>
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                  {data.tablelist.map((item) => (
                    <tr key={item.name}>
                      <td className="whitespace-nowrap w-[200px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                      {item.name}
                      </td>
                      <td className="whitespace-nowrap w-[200px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                      {item.amount}
                      </td>
                      <td className="px-3">
                      <p
                className="mx-auto w-fit rounded-[100px] px-5 py-2 text-center text-xs font-medium normal-case"
                style={{
                  color: `${item.color}`,
                  backgroundColor: `${item.color}10`,
                }}
              >
                {item.status}
              </p>
                      </td>
                      <td className="px-3">
                      <Button
                  variant="outlined"
                  className="h-[28px] mx-auto w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                  fullWidth
                >
                  <p className="text-center text-xs font-medium normal-case">
                    View
                  </p>
                </Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          </div>
              ))}
      </div>
    </div>
  );
}

export default Home;
