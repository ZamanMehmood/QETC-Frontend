import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import UniversityModul_university_data from "@/data/UniversityModul-university-data";
import plus from "../../../public/img/plus.svg";
import filterIcon from "../../../public/img/filterIcon.svg";
import down from "../../../public/img/downIcon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Modal } from "react-bootstrap";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
//
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { listUniversities } from "@/redux/actions/actions";
import axios from "axios";
import { ENV } from "../../config";
import Paginate from "../../paginate";

export function University() {
  const [showSelect, setShowSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const disptach = useDispatch();
  const params = useParams();

  const universitiesData = useSelector(
    (state) => state?.universitiesReducer?.universities
  );

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.universities?.data?.pagination
  );

  const universiteies = useSelector(
    (state) => state?.universitiesReducer?.universities?.data?.faqs
  );
  console.log("list universities in university module ===>", universiteies);

  // const universitiesData = useSelector(
  //   (state) => state?.universitiesReducer?.universities
  // );

  // list all universiteies

  useEffect(() => {
    disptach(listUniversities(""));

    if (universitiesData?.success == true) {
      let { message } = universitiesData;

      // const key = message;

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
    console.log("params id", params.id);
    const data = await axios.delete(
      `${ENV.baseUrl}/university/delete/${params.id}`
    );
    console.log("deleted data", data);
    // // alert("whppp");
  };

  const handleDelete = (id) => {
    console.log("handle delete function --->");
    console.log("item id --->", id);
    setShowModal(true);
    let itemId = id;
    navigate(`/dashboard/university_module/${itemId}`);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div className="mt-[30px] w-full bg-[#E8E9EB] font-display">
        <div>
          <div className=" rounded-[34px] bg-white p-6 md:p-12">
            <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
              <p className="text-2xl font-bold text-black sm:text-3xl">
                University
              </p>
              <NavLink to="createUniversity">
                <Button className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6">
                  <img className="m-1 w-[20px]" src={plus} alt="..." />
                  <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                    Create New Form
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
                    // onKeyDown={handleKeyDown}
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
                      className="w-[83px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      University name
                    </th>
                    <th
                      scope="col"
                      className="w-[346px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Universty Info
                    </th>
                    <th
                      scope="col"
                      className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
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
                  {universiteies?.map((ele, ind) => (
                    <tr key={ind}>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-[#333]">
                        {ele?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {ele?.Campuses[0]?.address1}
                        {/* {ele?.Campuses?.address1 ? "a" : "b"} */}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {ele?.Campuses[0]?.name}
                      </td>
                      <td className="w-[115px] px-3">
                        <Button
                          variant="outlined"
                          className="h-[28px] w-[78px] items-center justify-center rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                          fullWidth
                          onClick={() =>
                            navigate(
                              `/dashboard/university_module/1/${ele?.id}`
                            )
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
                          id={`dropdownDefaultButton${ind}`}
                          data-dropdown-toggle={`dropdown${ind}`}
                          type="button"
                          onClick={() => {
                            console.log("hi saqib");
                          }}
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
                          id={`dropdown${ind}`}
                          className="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby={`dropdownDefaultButton${ind}`}
                          >
                            <li>
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/university_module/2/${ele?.id}`
                                  )
                                }
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                // onClick={() =>
                                //   setShowModal(true) && navigate(`/dashboard/university_module/${ele?.id}`)}
                                onClick={() => handleDelete(ele?.id)}
                              >
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
            <Paginate pagination={pagination} method={listUniversities} />
            listUniversities
          </div>
        </div>
      </div>
    </>
  );
}

export default University;
