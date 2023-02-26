import React, { useState, useEffect } from "react";
// import { useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import plus from "../../../public/img/plus.svg";
import saveIcon from "../../../public/img/saveIcon.svg";
import StatusData from "@/data/status-props";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { viewProperties } from "@/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

export function AddProperty() {
  const [statusstate, setStatusstate] = useState(false);
  const [property, setProperty] = useState("");
  const [isViewMode, setIsViewMode] = useState(true);

  const [type, setType] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(viewProperties(params.id));
  // }, [params.id]);

  useEffect(() => {
    if (params.id) dispatch(viewProperties(params.id));

    if (params.action == 1) {
      // dispatch(viewCurrency(params.id));
      // setBranchstate(false);
      setIsViewMode(true);
    } else if (params.action == 2) {
      // setBranchstate(false);
      setIsViewMode(false);
    } else {
      // setBranchstate(true);
      setIsViewMode(false);
      setProperty("");
    }
  }, [params.id, params.action]);

  const viewPropertiesData = useSelector(
    (state) => state?.universitiesReducer?.viewProperty
  );
  console.log("view properties in properties module 0==>", viewPropertiesData);

  // useEffect(() => {
  //   if (viewPropertiesData?.property) {
  //     setProperty(viewPropertiesData?.property);
  //   }
  // }, [viewPropertiesData.property]);

  const handleSubmit = async (e) => {
    console.log("submit", e);
    setIsLoading(true);

    let formData = new FormData();
    formData.append("property", property);
    formData.append("type", params.id);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/properties/${params.action == 2 ? "edit" : "create"}`,
      formData,
      config
    );

    setIsLoading(false);
    if (apiCall.data?.success) {
      let { message } = apiCall.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
    // navigate("university")
  };
  return (
    <>
      <form>
        <div
          className={`mb-10 flex w-full flex-col gap-8 bg-[#E8E9EB] font-display ${
            statusstate ? "hidden" : ""
          }`}
        >
          <div className="my-5">
            <p className=" mb-2 text-4xl font-semibold text-[#280559]">
              {/* Create Status  */}
              {params.action == 1
                ? "View status"
                : params.action == 2
                ? "Edit status"
                : "Create status"}
            </p>
            <p className=" font text-base text-[#9898A3]">
              Create or edit Status
            </p>
          </div>
          <div className="rounded-[34px] bg-white p-[39px]">
            <p className="mb-8 text-2xl font-semibold text-[#333333]">
              Status Details
            </p>

            <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#333333]">
                  Status Name
                </label>
                <input
                  onChange={(e) => setProperty(e.target.value)}
                  type="text"
                  className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Status Name"
                  name="property"
                  defaultValue={viewPropertiesData?.property?.property}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          </div>
          <NavLink>
            <Button
              className="rounded-[15px]  bg-[#280559]"
              type="submit"
              onClick={handleSubmit}
              disabled={isViewMode}
              // AddProperty
            >
              <div className="flex flex-row items-center justify-center">
                <img src={saveIcon} alt="..." />
                <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                  Save Changes
                </p>
              </div>
            </Button>
          </NavLink>
        </div>
      </form>
    </>
  );
}

export default AddProperty;
