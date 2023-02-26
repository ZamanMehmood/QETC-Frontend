import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuItem, Checkbox, Button } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import LeadData from "@/data/lead-table-props";
import plus from "../../../public/img/plus.svg";
import filterIcon from "../../../public/img/filterIcon.svg";
import down from "../../../public/img/downIcon.svg";
import dropdown from "../../../public/img/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import { listLeads } from "@/redux/actions/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../universitymodule/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import Paginate from "@/paginate";
import { ENV } from "@/config";
export function Leads() {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const leadsData = useSelector((state) => state?.universitiesReducer?.leads);

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.leads?.data?.pagination
  );

  console.log("leads data in leads module", leadsData);

  // const leadStatus = leadsData?.data?.programeTable[0].id;
  // console.log("leadStatus", leadStatus);

  const [showModal, setShowModal] = useState(false);
  // list all leads
  useEffect(() => {
    disptach(listLeads(""));

    if (leadsData?.success == true) {
      let { message } = leadsData;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
  }, []);

  const onConfirmation = async () => {
    // here we will delete call
    console.log("university deleted");
    console.log(params.id);
    const data = await axios.delete(`${ENV.baseUrl}/lead/delete/${params.id}`);
    console.log("deleted data", data);
    // // alert("whppp");
  };

  // const handleDelete = () => {
  //   // console.log("delte click", id);
  //   // const id = leadsData?.data?.faqs?.id;
  //   console.log("delted idddd ===>", id);
  //   setShowModal(true);
  //   // navigate(`/dashboard/Leadsmodule/3/${id}`);
  // };
  const handleDelete = (id) => {
    console.log("handle delete function --->");
    console.log("item id --->", id);
    setShowModal(true);
    let itemId = id;
    navigate(`/dashboard/Leadsmodule/${itemId}`);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
        <div className="my-10 grid grid-cols-1">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            Leads Module
          </p>
          <p className=" font text-base text-[#9898A3]">View all leads</p>
        </div>
        <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
          <div>
            <div className=" rounded-[34px] bg-white p-6 md:p-12">
              <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
                <p className="text-2xl font-bold text-black sm:text-3xl">
                  Leads
                </p>
                <NavLink to="createLead">
                  <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                    <img className="m-1 w-[20px]" src={plus} alt="..." />
                    <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                      Add New Lead
                    </p>
                  </Button>
                </NavLink>
              </div>
              <div className="my-3 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#F8F9FB] p-5 md:flex-row">
                <form className="h-full w-full">
                  <div className="relative h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 left-3 my-auto h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full rounded-[15px] border-[1px] border-[#cbd2dc]/50 bg-white py-3 pt-4 pl-12 pr-4 text-gray-500 shadow-md focus:bg-white"
                    />
                  </div>
                </form>
                <div className="flex h-full w-full justify-between gap-3 md:w-auto md:justify-start">
                  <button className="flex w-[135px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                    <img className="w-[20px]" src={filterIcon} alt="..." />
                    <p className="mx-3 text-[16px] ">Filters</p>
                  </button>

                  <Menu>
                    <MenuHandler>
                      <button className="flex h-[57px] w-[135px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                        <img className="w-[20px]" src={down} alt="..." />
                        <p className="mx-3 ">Export</p>
                      </button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]">
                        Export as .csv
                      </MenuItem>
                      <MenuItem className="text-base font-medium text-[#280559] hover:bg-[#F2F4F8] hover:text-[#280559]">
                        Export as .xlsx
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="flex flex-col overflow-x-auto">
                <table className=" w-full border-none">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="w-[50px] py-3 pr-6 text-left text-base font-medium text-[#92929D]"
                      >
                        <Checkbox />
                      </th>
                      <th
                        scope="col"
                        className="w-[200px] py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="w-[83px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="w-[346px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="w-[113px] px-6 py-3 text-center text-base font-medium text-[#92929D]"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="w-[78px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                      >
                        Option
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-none">
                    {leadsData?.data?.faqs.map((ele, ind, color) => (
                      <tr key={ind}>
                        {/* {console.log("leadsiddddd", ele.id)} */}

                        <td className="whitespace-nowrap py-3 pr-6">
                          <Checkbox />
                          {/* 2 */}
                        </td>
                        <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                          {ele?.createdAt}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-[#333]">
                          {ele?.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333] underline">
                          {ele?.email}
                        </td>
                        <td>
                          <p
                            className="mx-auto w-fit rounded-2xl px-5 py-2 text-center text-xs font-medium normal-case"
                            // style={{
                            //   color,
                            //   backgroundColor: `${color}10`,
                            // }}
                            style={{
                              backgroundColor: "#0263FF",
                            }}
                          >
                            {ele?.ProgrameDetail?.status}
                          </p>
                        </td>
                        <td>
                          <Button
                            variant="outlined"
                            className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                            fullWidth
                            onClick={() =>
                              navigate(`/dashboard/Leadsmodule/1/${ele?.id}`)
                            }
                          >
                            <p className="text-center text-xs font-medium capitalize">
                              view
                            </p>
                          </Button>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-lg font-medium">
                          <button
                            className="rounded-full text-[#636363]/50 hover:text-[#7a7a7a]"
                            // id="dropdownDefaultButton"
                            // data-dropdown-toggle="dropdown"
                            type="button"
                            id={`dropdownDefaultButton${ind}`}
                            data-dropdown-toggle={`dropdown${ind}`}
                          >
                            <svg
                              className="h-8 w-8 fill-current"
                              viewBox="0 0 32 32"
                            >
                              <circle cx="16" cy="10" r="2" />
                              <circle cx="16" cy="16" r="2" />
                              <circle cx="16" cy="22" r="2" />
                            </svg>
                          </button>
                          <div
                            // id="dropdown"
                            id={`dropdown${ind}`}
                            className="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              // aria-labelledby="dropdownDefaultButton"
                              aria-labelledby={`dropdownDefaultButton${ind}`}
                            >
                              <li>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    navigate(
                                      `/dashboard/Leadsmodule/2/${ele?.id}`
                                    )
                                  }
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button onClick={() => handleDelete(ele?.id)}>
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Paginate pagination={pagination} method={listLeads} />

              {/* <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] bg-[#F8F9FB] py-4 px-6 md:flex-row md:gap-0">
                <p className="px-5 text-base text-[#92929D]">
                  <span className="text-[#280559]">1</span>-5 of 56
                </p>
                <div className="flex flex-row items-center justify-center">
                  <p className="mr-3 text-base text-[#92929D]">
                    The page you’re on
                  </p>
                  <div className=" mr-2 w-[77px]">
                    <Menu>
                      <MenuHandler>
                        <button className="flex h-[40px] w-[77px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                          <p className="mx-3 font-medium text-[#280559]">1</p>
                          <img src={dropdown} />
                        </button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                        <MenuItem>4</MenuItem>
                        <MenuItem>5</MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                  <button className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md">
                    <svg
                      width={24}
                      height={24}
                      stroke="#280559"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                      />
                    </svg>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md">
                    <svg
                      width={24}
                      height={24}
                      stroke="#280559"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leads;
