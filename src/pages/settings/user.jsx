import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import plus from "../../../public/img/plus.svg";
import filterIcon from "../../../public/img/filterIcon.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import Userprops from "@/data/user-props";
// import AddField from "./AddField";
import { NavLink } from "react-router-dom";
import DatePicker from "@/components/DatePicker";
import AddField from "./Addfield";
import dropdown from "../../../public/img/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { listUsers } from "@/redux/actions/actions";
import { viewUser } from "@/redux/actions/actions";
import { ENV } from "@/config";
import Paginate from "@/paginate";
import Modal from "../universitymodule/Modal";
// import { toast } from "react-toastify";
export function User() {
  const [userstate, setUserstate] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const initialValue = {
    name: "",
    email: "",
    number: "",
    role: "",
    branch: "",
    position: "",
    date: "",
  };
  const [formValues, setFormValues] = useState(initialValue);

  const allUsers = useSelector((state) => state?.universitiesReducer?.users);
  console.log("all users in users module ===>", allUsers);

  const viewUsers = useSelector(
    (state) => state?.universitiesReducer?.viewUser
  );

  const pagination = useSelector(
    (state) => state?.universitiesReducer?.users?.data?.pagination
  );

  console.log(" view all users in users module ===>", viewUsers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("formValues ===>", formValues);

    let errors = formErrors;
    delete errors[name];
    setFormErrors(errors);
    setFormValues({ ...formValues, [name]: value });

    if (name === "name" && value === "") {
      errors[name] = "Required";
    }
    if (name === "email" && value === "") {
      errors[name] = "Required";
    }
    if (name === "number" && value === "") {
      errors[name] = "Required";
    }
    if (name === "role" && value === "") {
      errors[name] = "Required";
    }
    if (name === "branch" && value === "") {
      errors[name] = "Requiredty";
    }
    if (name === "position" && value === "") {
      errors[name] = "Required";
    }
    if (name === "date" && value === "") {
      errors[name] = "Required";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let err = validate(formValues);
    console.log(err);
    setFormErrors(err);

    if (Object.keys(err).length != 0) return;
    setIsLoading(true);
    console.log("submit clicked");
    const id = params.id;

    const { name, email, number, role, branch, position, date } = formValues;

    const payload = {
      name,
      email,
      number,
      role,
      branch,
      position,
      date,
      id,
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/users/${params.action == 2 ? "edit" : "create"}`,
      payload
    );
    console.log("apiCall");

    setIsLoading(false);
    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (values.name === "") {
      errors.name = "Required";
    }
    if (values.email === "") {
      errors.email = "Required";
    }

    if (values.number === "") {
      errors.number = "Required";
    }
    if (values.role === "") {
      errors.role = "Required";
    }
    if (values.branch === "") {
      errors.branch = "Required";
    }
    if (values.position === "") {
      errors.position = "Required";
    }
    if (values.date === "") {
      errors.date = "Required";
    }
    return errors;
  };
  useEffect(() => {
    dispatch(listUsers());
    if (allUsers?.success == true) {
      let { message } = allUsers;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
  }, []);

  useEffect(() => {
    if (viewUsers?.user) setFormValues(viewUsers?.user);
  }, [viewUsers.user]);
  useEffect(() => {
    if (params.id) dispatch(viewUser(params.id));

    if (params.action == 1) {
      setUserstate(false);
      setIsViewMode(true);
    } else if (params.action == 2) {
      setUserstate(false);
      setIsViewMode(false);
    } else {
      setUserstate(true);
      setIsViewMode(false);
      // setFormValues("");
    }
  }, [params.id, params.action]);

  const onConfirmation = async () => {
    // here we will delete call
    console.log("university deleted");
    console.log(params.id);
    const data = await axios.delete(`${ENV.baseUrl}/users/delete/${params.id}`);
    console.log("deleted data", data);
    if (data.data.success == true) {
      let { message } = data.data;
      // const message = "Backup Deleted Successfully!";
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
    // // // alert("whppp");
  };

  const handleDelete = (id) => {
    console.log("handle delete function --->");
    console.log("item id --->", id);
    setShowModal(true);
    let itemId = id;
    navigate(`/dashboard/settingsManagement/${itemId}`);
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={onConfirmation}
      />
      <div
        className={`mt-[30px] flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          userstate ? "" : "hidden"
        }`}
      >
        <div>
          <div className=" rounded-[34px] bg-white p-6 md:p-12">
            <div className="my-0 flex w-full flex-col justify-between gap-3 pt-0 pb-5 sm:flex-row sm:items-center">
              <p className=" text-3xl font-semibold text-[#280559]">Users</p>
              <Button
                onClick={() => setUserstate(false)}
                className="ml-auto flex h-[60px] flex-row items-center rounded-2xl bg-[#280559] p-2 sm:py-3 sm:px-6"
              >
                <img className="m-1 w-[20px]" src={plus} alt="..." />
                <p className="m-1 text-sm font-medium normal-case text-white sm:text-base">
                  Create New User
                </p>
              </Button>
            </div>
            <div className="my-3 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#F8F9FB] p-5 md:flex-row">
              <form className="h-full w-full">
                <div className="relative h-full w-full">
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
              <button className="flex h-[57px] w-[135px] items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                <img className="w-[20px]" src={filterIcon} alt="..." />
                <p className="mx-3 text-[16px] ">Filters</p>
              </button>
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
                      className="w-[100px] py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      ID User
                    </th>
                    <th
                      scope="col"
                      className="w-[83px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="w-[220px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="w-[115px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="w-[113px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="w-[200px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="w-[100px] px-6 py-3 text-left text-base font-medium text-[#92929D]"
                    >
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody className="border-none">
                  {allUsers?.data?.faqs?.map((ele, ind) => (
                    <tr key={ind}>
                      <td className="whitespace-nowrap py-3 pr-6">
                        <Checkbox />
                      </td>
                      <td className="whitespace-nowrap py-4 text-lg font-normal text-[#333]">
                        {/* {id} */}
                        {ele?.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                        {/* {name} */}
                        {ele?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333] underline">
                        {/* {email} */}
                        {ele?.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {/* {role} */}
                        {ele?.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-semibold text-[#333]">
                        {/* {number} */}
                        {ele?.number}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-[#333]">
                        {/* {position} */}
                        {ele?.position}
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          className="mx-auto h-[28px] w-[78px] rounded-[15px] border border-[#280559] p-0 text-[#280559] ease-in hover:bg-[#280559] hover:text-white hover:opacity-100"
                          fullWidth
                          onClick={() =>
                            navigate(
                              `/dashboard/settingsManagement/user/1/${ele?.id}`
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
                          class="z-10 hidden w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                        >
                          <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            // aria-labelledby="dropdownDefaultButton"
                            aria-labelledby={`dropdownDefaultButton${ind}`}
                          >
                            <li>
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/settingsManagement/user/2/${ele?.id}`
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
            <Paginate pagination={pagination} method={listUsers} />
          </div>
        </div>
      </div>

      {/* ----------------------------------------- */}

      <div
        className={`flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
          userstate ? "hidden" : ""
        }`}
      >
        <div className="mb-5">
          <p className=" mb-2 text-4xl font-semibold text-[#280559]">
            {/* Add New User */}
            {params.action == 1
              ? "View User"
              : params.action == 2
              ? "Edit User"
              : "Add New User"}
          </p>
          <p className=" font text-base text-[#9898A3]">
            {params.action == 1
              ? "View User"
              : params.action == 2
              ? "Edit User"
              : "Add New User"}
          </p>
        </div>
        <div className="rounded-[34px] bg-white p-[39px]">
          <p className="mb-8 text-2xl font-semibold text-[#333333]">
            User Details
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Name"
                  // required
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
                <p className="text-red-500">{formErrors.name}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Email Address
                </label>
                <input
                  type="email"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="example@email.com"
                  // required
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
                <p className="text-red-500">{formErrors.email}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+91 0123 456 789"
                  name="number"
                  value={formValues.number}
                  onChange={handleChange}
                  disabled={isViewMode}
                  // required
                />
                <p className="text-red-500">{formErrors.number}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Role
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="role"
                  defaultValue={formValues.role}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option selected>Select Role</option>
                  <option>Manager</option>
                  <option>Boss</option>
                </select>
                <p className="text-red-500">{formErrors.role}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Branch
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="branch"
                  defaultValue={formValues.branch}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option selected>Select Branch</option>
                  <option>Mdk</option>
                  <option>Lahore</option>
                </select>
                <p className="text-red-500">{formErrors.branch}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Position
                </label>
                <select
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  name="position"
                  defaultValue={formValues.position}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <option selected>Select Position</option>
                  <option>First Position</option>
                  <option>Second Position</option>
                  <option>Third Position</option>
                </select>
                <p className="text-red-500">{formErrors.position}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Date
                </label>
                <input
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                  // required
                  name="date"
                  defaultValue={formValues.date}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
                <p className="text-red-500">{formErrors.date}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Add Field
                </label>
                <button
                  onClick={() => setOpenModal(true)}
                  type="button"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                >
                  Click to add more field
                </button>
                <AddField open={openModal} close={() => setOpenModal(false)} />
              </div>
            </div>

            {/* <NavLink to=""> */}
            {/* <Button
              className="rounded-[15px]  bg-[#280559]"
              disabled={isViewMode}
            >
              <div className="flex flex-row items-center justify-center">
                <img src={saveIcon} alt="..." />
                <button
                  className="p-1 px-[11px] text-base font-medium normal-case text-white"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </Button> */}
            {isViewMode ? (
              <Button
                className="rounded-[15px]  bg-[#280559]"
                type="submit"
                onClick={() => navigate("/dashboard/settingsManagement/*")}
              >
                <div className="flex flex-row items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Back
                  </p>
                </div>
              </Button>
            ) : (
              <Button className="rounded-[15px]  bg-[#280559]" type="submit">
                <div className="flex flex-row items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            )}
          </form>
        </div>
        {/* </NavLink> */}
      </div>
    </>
  );
}

export default User;
