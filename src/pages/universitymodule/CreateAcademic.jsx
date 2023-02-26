// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { Button } from "@material-tailwind/react/components/Button";
// import saveIcon from "../../../public/img/saveIcon.svg";
// import axios from "axios";
// // import Loader from "@/loader";
// import FullPageLoader from "@/FullPageLoader/FullPageLoader";
// import { toast } from "react-toastify";
// import { ENV } from "@/config";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { viewProgramme } from "@/redux/actions/actions";

// const CreateAcademic = () => {
//   const initialValues = {
//     name: "",
//     selectUniversity: "",
//     programmeLevel: "",
//     programmeIntake: "",
//     programmeDuration: "",
//     programmeCategory: "",
//     tutionFee: "",
//     otherFee: "",
//     engRequirement: "",
//     entryRequirement: "",
//   };
//   const [formValues, setFormValues] = useState(initialValues);
//   // const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [isViewMode, setIsViewMode] = useState(true);

//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const params = useParams();
//   const dispatch = useDispatch();

//   const programmsData = useSelector(
//     (state) => state?.universitiesReducer?.viewProgramme
//   );
//   console.log(
//     "programme data for update,view,delete in create programme compo",
//     programmsData
//   );

//   useEffect(() => {
//     if (programmsData?.programme) setFormValues(programmsData?.programme);
//   }, [programmsData.programme]);

//   useEffect(() => {
//     if (params.id) dispatch(viewProgramme(params.id));
//     if (params.action == 1) {
//       setIsViewMode(true);
//     } else {
//       setIsViewMode(false);
//     }
//   }, [params.id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("formvalues", formValues);
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const id = params.id;
//     console.log("academic handle submit", formValues);
//     setIsLoading(true);
//     const {
//       name,
//       selectUniversity,
//       programmeLevel,
//       programmeIntake,
//       programmeDuration,
//       programmeCategory,
//       tutionFee,
//       otherFee,
//       engRequirement,
//       entryRequirement,
//     } = formValues;

//     let payload = {
//       name,
//       selectUniversity,
//       programmeLevel,
//       programmeIntake,
//       programmeDuration,
//       programmeCategory,
//       tutionFee,
//       otherFee,
//       engRequirement,
//       entryRequirement,
//       id,
//     };

//     // const apiCall = await axios.post(
//     //   `${ENV.baseUrl}/programme/createProgramme`,
//     //   payload
//     // );
//     const apiCall = await axios[params.action == 2 ? "put" : "post"](
//       `${ENV.baseUrl}/programme/${
//         params.action == 2 ? "edit" : "createProgramme"
//       }`,
//       payload
//     );
//     console.log("apiCall");

//     setIsLoading(false);
//     if (apiCall.data?.success) {
//       let { message } = apiCall.data;
//       toast.success(message, {
//         position: toast.POSITION.TOP_RIGHT,
//         hideProgressBar: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <>
//       {isLoading && <FullPageLoader />}
//       <div className="mt-12 w-full bg-[#E8E9EB] font-display">
//         <div className="my-10">
//           <div className="mr-8 flex items-center justify-between">
//             <p className=" text-4xl font-semibold text-[#280559]">
//               {/* Create Program */}
//               {params.action == 1
//                 ? "View Programme"
//                 : params.action == 2
//                 ? "Edit Programme"
//                 : "Create Programme"}
//             </p>
//             <NavLink to="university">
//               <Button className="rounded-[15px]  bg-[#280559]">
//                 <div className="flex flex-row items-center justify-center">
//                   <img src={saveIcon} alt="..." />
//                   <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
//                     Save Changes
//                   </p>
//                 </div>
//               </Button>
//             </NavLink>
//           </div>
//           <p className=" font text-base text-[#9898A3]">
//             {/* Create or edit program */}
//             {params.action == 1
//               ? "View Programme"
//               : params.action == 2
//               ? "Edit Programme"
//               : "Create Programme"}
//           </p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <div className="mr-8 rounded-[34px] bg-white p-[39px]">
//               <p className="mb-8 text-2xl font-semibold text-[#333333]">
//                 Program Details
//               </p>

//               <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Program Name
//                   </label>
//                   <input
//                     type="text"
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="Program Name"
//                     required
//                     name="name"
//                     value={formValues?.name}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Select University
//                   </label>
//                   <select
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     name="selectUniversity" //
//                     defaultValue={formValues?.selectUniversity}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                   >
//                     <option selected="true">Select University</option>
//                     <option>Punjab University</option>
//                     <option>Virtual University</option>
//                     <option>Central punjab University</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Program Level
//                   </label>
//                   <select
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     name="programmeLevel" //
//                     defaultValue={formValues?.programmeLevel}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                   >
//                     <option selected="true">Select Level</option>
//                     <option> Becolar's Degree</option>
//                     <option>Master's Degree</option>
//                     <option>Phd</option>
//                     <option>Diploma</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Program Intake
//                   </label>
//                   <input
//                     type="text"
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="Program Intake"
//                     name="programmeIntake" //
//                     value={formValues?.programmeIntake}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Program Duration
//                   </label>
//                   <select
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     name="programmeDuration" //
//                     defaultValue={formValues?.programmeDuration}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                   >
//                     <option selected>Select Duration</option>
//                     <option>Duration 1</option>
//                     <option>Duration 2</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Program Category
//                   </label>
//                   <select
//                     className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     name="programmeCategory" //
//                     defaultValue={formValues?.programmeCategory}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                   >
//                     <option selected="true">Select Category</option>
//                     <option>Engineering</option>
//                     <option>Business</option>
//                     <option>Medicine</option>
//                     {/* Engineering, Business, Medicine, */}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Tuition Fees
//                   </label>
//                   <div class="relative">
//                     <span class="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
//                       usd:
//                     </span>
//                     <input
//                       type="text"
//                       className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                       placeholder="0.00"
//                       required
//                       name="tutionFee" //
//                       value={formValues?.tutionFee}
//                       disabled={isViewMode}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-[#333333]">
//                     Other Fees
//                   </label>
//                   <div class="relative">
//                     <span class="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
//                       usd:
//                     </span>
//                     <input
//                       type="text"
//                       className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                       placeholder="0.00"
//                       required
//                       name="otherFee" //
//                       value={formValues?.otherFee}
//                       disabled={isViewMode}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium">
//                     Add Field
//                   </label>
//                   <button
//                     type="button"
//                     class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//                   >
//                     Click to add more field
//                   </button>
//                 </div>
//               </div>
//               {/* </form> */}
//             </div>
//             <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
//               <p className="mb-8 text-2xl font-semibold text-[#333333]">
//                 Program Requirements
//               </p>
//               {/* <form> */}
//               <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2">
//                 <div>
//                   <label class="mb-2 block text-sm font-medium text-[#333]">
//                     Entry Requirements
//                   </label>
//                   <textarea
//                     rows="6"
//                     class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-sm text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="Entry Requirements"
//                     name="entryRequirement" //
//                     value={formValues?.entryRequirement}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                     required
//                   ></textarea>
//                 </div>
//                 <div>
//                   <label class="mb-2 block text-sm font-medium text-[#333]">
//                     English Requirements
//                   </label>
//                   <textarea
//                     rows="6"
//                     class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-sm text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="English Requirements"
//                     name="engRequirement" //
//                     value={formValues?.engRequirement}
//                     disabled={isViewMode}
//                     onChange={handleChange}
//                     required
//                   ></textarea>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium">
//                     Add Field
//                   </label>
//                   <button
//                     type="button"
//                     class="block w-3/5 rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//                   >
//                     Click to add more field
//                   </button>
//                 </div>
//               </div>
//               {/* </form> */}
//             </div>
//             <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
//               <p className="mb-8 text-2xl font-semibold text-[#333333]">
//                 Add Campus
//               </p>

//               <button
//                 type="button"
//                 class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
//               >
//                 Click to add more campus
//               </button>
//             </div>
//             {/* <NavLink to="university"> */}
//             <Button className="rounded-[15px]  bg-[#280559]">
//               <div className="flex flex-row items-center justify-center px-[33px] py-[10px]">
//                 <img src={saveIcon} alt="..." />
//                 <button
//                   className="px-[11px] text-base font-medium normal-case text-white"
//                   type="submit"
//                   disabled={isViewMode}
//                 >
//                   Save Changess
//                 </button>
//               </div>
//             </Button>
//           </div>
//         </form>
//         {/* </NavLink> */}
//       </div>
//     </>
//   );
// };

// export default CreateAcademic;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react/components/Button";
import saveIcon from "../../../public/img/saveIcon.svg";
import axios from "axios";
// import Loader from "@/loader";
import FullPageLoader from "@/FullPageLoader/FullPageLoader";
import { toast } from "react-toastify";
import { ENV } from "@/config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewProgramme } from "@/redux/actions/actions";

const CreateAcademic = () => {
  const initialValues = {
    name: "",
    selectUniversity: "",
    programmeLevel: "",
    programmeIntake: "",
    programmeDuration: "",
    programmeCategory: "",
    tutionFee: "",
    otherFee: "",
    engRequirement: "",
    entryRequirement: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  // const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isViewMode, setIsViewMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const programmsData = useSelector(
    (state) => state?.universitiesReducer?.viewProgramme
  );
  console.log(
    "programme data for update,view,delete in create programme compo",
    programmsData
  );

  useEffect(() => {
    if (programmsData?.programme) setFormValues(programmsData?.programme);
  }, [programmsData.programme]);

  useEffect(() => {
    if (params.id) dispatch(viewProgramme(params.id));
    if (params.action == 1) {
      setIsViewMode(true);
    } else {
      setIsViewMode(false);
    }
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("formvalues", formValues);
    let errors = formErrors;
    delete errors[name];
    setFormErrors(errors);
    setFormValues({ ...formValues, [name]: value });

    if (name === "name" && value === "") {
      errors[name] = "Required";
    }
    if (name === "selectUniversity" && value === "") {
      errors[name] = "Required";
    }
    if (name === "programmeLevel" && value === "") {
      errors[name] = "Required";
    }
    if (name === "programmeIntake" && value === "") {
      errors[name] = "Required";
    }
    if (name === "programmeDuration" && value === "") {
      errors[name] = "Required";
    }
    if (name === "programmeCategory" && value === "") {
      errors[name] = "Required";
    }
    if (name === "tutionFee" && value === "") {
      errors[name] = "Required";
    }
    if (name === "otherFee" && value === "") {
      errors[name] = "Required";
    }
    if (name === "engRequirement" && value === "") {
      errors[name] = "Required";
    }
    if (name === "entryRequirement" && value === "") {
      errors[name] = "Required";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = params.id;
    console.log("academic handle submit", formValues);
    // setFormErrors();
    let err = validate(formValues);
    console.log(err);
    setFormErrors(err);

    if (Object.keys(err).length != 0) return;
    console.log(err);
    setIsLoading(true);
    const {
      name,
      selectUniversity,
      programmeLevel,
      programmeIntake,
      programmeDuration,
      programmeCategory,
      tutionFee,
      otherFee,
      engRequirement,
      entryRequirement,
    } = formValues;

    let payload = {
      name,
      selectUniversity,
      programmeLevel,
      programmeIntake,
      programmeDuration,
      programmeCategory,
      tutionFee,
      otherFee,
      engRequirement,
      entryRequirement,
      id,
    };

    const apiCall = await axios[params.action == 2 ? "put" : "post"](
      `${ENV.baseUrl}/programme/${
        params.action == 2 ? "edit" : "createProgramme"
      }`,
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
    if (values.selectUniversity === "") {
      errors.selectUniversity = "Required  ";
    }
    if (values.programmeLevel === "") {
      errors.programmeLevel = "Required  ";
    }
    if (values.programmeIntake === "") {
      errors.programmeIntake = "Required  ";
    }
    if (values.programmeDuration === "") {
      errors.programmeDuration = "Required  ";
    }
    if (values.programmeCategory === "") {
      errors.programmeCategory = "Required  ";
    }
    if (values.tutionFee === "") {
      errors.tutionFee = " Required";
    }
    if (values.otherFee === "") {
      errors.otherFee = "Required";
    }
    if (values.engRequirement === "") {
      errors.engRequirement = "Required  ";
    }
    if (values.entryRequirement === "") {
      errors.entryRequirement = "Required  ";
    }
    return errors;
  };
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="mt-12 w-full bg-[#E8E9EB] font-display">
        {console.log("formErrors", formErrors)}
        <div className="my-10">
          <div className="mr-8 flex items-center justify-between">
            <p className=" text-4xl font-semibold text-[#280559]">
              {/* Create Program */}
              {params.action == 1
                ? "View Programme"
                : params.action == 2
                ? "Edit Programme"
                : "Create Programme"}
            </p>
            <NavLink to="university">
              <Button className="rounded-[15px]  bg-[#280559]">
                <div className="flex flex-row items-center justify-center">
                  <img src={saveIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Save Changes
                  </p>
                </div>
              </Button>
            </NavLink>
          </div>
          <p className=" font text-base text-[#9898A3]">
            {/* Create or edit program */}
            {params.action == 1
              ? "View Programme"
              : params.action == 2
              ? "Edit Programme"
              : "Create Programme"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mr-8 rounded-[34px] bg-white p-[39px]">
              <p className="mb-8 text-2xl font-semibold text-[#333333]">
                Program Details
              </p>

              <div className="mt-4 mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Program Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Program Name"
                    // required
                    name="name"
                    value={formValues?.name}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          name: "please enter name",
                        });
                      }
                    }}
                  />
                  <p className="text-red-500">{formErrors.name}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Select University
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="selectUniversity" //
                    defaultValue={formValues?.selectUniversity}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          selectUniversity: "please choose one first location",
                        });
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select University
                    </option>
                    <option>Punjab University</option>
                    <option>Virtual University</option>
                    <option>Central punjab University</option>
                  </select>
                  <p className="text-red-500">{formErrors.selectUniversity}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Program Level
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="programmeLevel" //
                    defaultValue={formValues?.programmeLevel}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          programmeLevel: "please choose programme level",
                        });
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select Level
                    </option>
                    <option> Becolar's Degree</option>
                    <option>Master's Degree</option>
                    <option>Phd</option>
                    <option>Diploma</option>
                  </select>
                  <p className="text-red-500">{formErrors.programmeLevel}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Program Intake
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Program Intake"
                    name="programmeIntake" //
                    value={formValues?.programmeIntake}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          programmeIntake: "please enter ",
                        });
                      }
                    }}
                    // required
                  />
                  <p className="text-red-500">{formErrors.programmeIntake}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Program Duration
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="programmeDuration" //
                    defaultValue={formValues?.programmeDuration}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          programmeDuration: "please enter ",
                        });
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select Duration
                    </option>
                    <option>Duration 1</option>
                    <option>Duration 2</option>
                  </select>
                </div>
                <p className="text-red-500">{formErrors.programmeDuration}</p>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Program Category
                  </label>
                  <select
                    className="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    name="programmeCategory" //
                    defaultValue={formValues?.programmeCategory}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          programmeCategory: "please choose one ",
                        });
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Medicine</option>
                    {/* Engineering, Business, Medicine, */}
                  </select>
                  <p className="text-red-500">{formErrors.programmeCategory}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Tuition Fees
                  </label>
                  <div class="relative">
                    <span class="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
                      usd:
                    </span>
                    <input
                      type="text"
                      className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0.00"
                      // required
                      name="tutionFee" //
                      value={formValues?.tutionFee}
                      disabled={isViewMode}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          setFormErrors({
                            ...formErrors,
                            tutionFee: "please choose one ",
                          });
                        }
                      }}
                    />
                  </div>
                  <p className="text-red-500">{formErrors.tutionFee}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Other Fees
                  </label>
                  <div class="relative">
                    <span class="absolute left-0 top-0 flex h-full items-center rounded-xl bg-[#E5E8ED] p-3 text-base font-medium uppercase text-[#333]">
                      usd:
                    </span>
                    <input
                      type="text"
                      className="block h-full w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 pl-16 text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0.00"
                      // required
                      name="otherFee" //
                      value={formValues?.otherFee}
                      disabled={isViewMode}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          setFormErrors({
                            ...formErrors,
                            otherFee: "please choose one",
                          });
                        }
                      }}
                    />
                  </div>
                  <p className="text-red-500">{formErrors.otherFee}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Add Field
                  </label>
                  <button
                    type="button"
                    class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                </div>
              </div>
              {/* </form> */}
            </div>
            <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
              <p className="mb-8 text-2xl font-semibold text-[#333333]">
                Program Requirements
              </p>
              {/* <form> */}
              <div className="mt-12 mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-[#333]">
                    Entry Requirements
                  </label>
                  <textarea
                    rows="6"
                    class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-sm text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Entry Requirements"
                    name="entryRequirement" //
                    value={formValues?.entryRequirement}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          entryRequirement: "please enter ",
                        });
                      }
                    }}
                    // required
                  ></textarea>
                  <p className="text-red-500">{formErrors.entryRequirement}</p>
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium text-[#333]">
                    English Requirements
                  </label>
                  <textarea
                    rows="6"
                    class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-white p-2.5 text-sm text-gray-900 placeholder:text-[#BEBFC3] focus:border-blue-500 focus:ring-blue-500"
                    placeholder="English Requirements"
                    name="engRequirement" //
                    value={formValues?.engRequirement}
                    disabled={isViewMode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormErrors({
                          ...formErrors,
                          engRequirement: "please enter ",
                        });
                      }
                    }}
                    // required
                  ></textarea>
                  <p className="text-red-500">{formErrors.engRequirement}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Add Field
                  </label>
                  <button
                    type="button"
                    class="block w-3/5 rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
                  >
                    Click to add more field
                  </button>
                </div>
              </div>
              {/* </form> */}
            </div>
            <div className="my-[30px] mr-8 rounded-[34px] bg-white p-[39px]">
              <p className="mb-8 text-2xl font-semibold text-[#333333]">
                Add Campus
              </p>
              <button
                type="button"
                class="block w-full rounded-xl border-2 border-[#CBD2DC80] bg-[#F8F9FB] p-2.5 font-medium text-[#BEBFC3]"
              >
                Click to add more campus
              </button>
            </div>
            {/* <NavLink to="university"> */}

     

            {isViewMode ? (
              <Button
                className="rounded-[15px]  bg-[#280559]"
                type="submit"
                onClick={() => navigate("/dashboard/university_module/")}
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
          </div>
        </form>
        {/* </NavLink> */}
      </div>
    </>
  );
};

export default CreateAcademic;
