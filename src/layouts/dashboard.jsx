import { Routes, Route } from "react-router-dom";
import { Sidenav } from "@/widgets/layout";
import routes from "@/routes";
import CreateAcademic from "@/pages/universitymodule/CreateAcademic";
import CreateUniversity from "@/pages/universitymodule/CreateUniversity";
import CreateInvoice from "@/pages/InvoiceManagement/CreateInvoice";
import CreateMailing from "@/pages/InvoiceManagement/CreateMailing";
import CreateLead from "@/pages/leads/CreateLead";
import { Home } from "@/pages/dashboard";
import { useContext } from "react";
import { NavbarCtx } from "@/App";
import University from "@/pages/universitymodule/University";
import Leads from "@/pages/leads/Leads";
import Academic from "@/pages/universitymodule/Academic";
import AddNewApplication from "@/pages/application/AddNewApplication";
import Applications from "@/pages/application/Applications";
import Currency from "@/pages/currency/currency";
import Branch from "@/pages/settings/branch";
import System from "@/pages/systembackup/system";
import User from "@/pages/settings/user";
import AddProperty from "@/pages/settings/AddProperty";

const defaultRoleType = "superAdmin";

export const roles = {
  superAdmin: [
    "dashboard",
    "university",
    "leads",
    "application",
    "invoice",
    "accounting",
    "system-reports",
    "reports",
    "settings",
    "currency",
    "system",
  ],
  admin: [
    "dashboard",
    "university",
    "leads",
    "application",
    "invoice",
    "accounting",
    "system-reports",
    "reports",
    "settings",
    "currency",
    "system",
  ],
  counselor: ["dashboard", "university", "leads", "application", "currency"],
  accountant: [
    "dashboard",
    "application",
    "invoice",
    "accounting",
    "reports",
    "currency",
  ],
  adminBranch: [
    "dashboard",
    "university",
    "leads",
    "application",
    "invoice",
    "accounting",
    "reports",
    "currency",
  ],
  counselorBranch: [
    "dashboard",
    "university",
    "leads",
    "application",
    "currency",
  ],
  accountantBranch: [
    "dashboard",
    "application",
    "invoice",
    "accounting",
    "reports",
    "currency",
  ],
  applicant: ["applicant_dashboard"],
};

export function Dashboard() {
  const { navbar } = useContext(NavbarCtx);

  return (
    <div className="min-h-screen overflow-y-auto bg-[#E8E9EB]">
      <Sidenav
        routes={routes}
        role={roles[defaultRoleType]}
        lay={"dashboard"}
      />

      <div
        className={`bg-[#E8E9EB] p-8 pr-0 ${
          (navbar.isMobile && navbar.mobileExpand && !navbar.overlap) ||
          (!navbar.isMobile && !navbar.desktopExpand && !navbar.overlap) ||
          (!navbar.isMobile && navbar.desktopExpand && navbar.overlap) ||
          (!navbar.isMobile && !navbar.desktopExpand && navbar.overlap)
            ? "ml-[100px]"
            : (!navbar.isMobile && navbar.desktopExpand && !navbar.overlap) ||
              (!navbar.isMobile && navbar.desktopExpand && navbar.overlap)
            ? "ml-[350px]"
            : "ml-0"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages
                .filter(({ id }) => roles[defaultRoleType].includes(id))
                .map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))
          )}
          <Route
            path="/university_module/createUniversity"
            element={<CreateUniversity />}
          />
          <Route
            path="/university_module/:action/:id"
            element={<CreateUniversity />}
          />
          <Route path="/university_module/:id" element={<University />} />
          <Route path="/Leadsmodule/:action/:id" element={<CreateLead />} />
          <Route
            path="/settingsManagement/properties/:action/:id"
            element={<AddProperty />}
          />
          ,
          {/* <Route path="/Leadsmodule/:action/:id" element={<CreateLead />} /> */}
          <Route path="/Leadsmodule/:id" element={<Leads />} />
          <Route path="/system/:file" element={<System />} />
          {/* System */}
          <Route
            path="/CurrencyManagement/:action/:id"
            element={<Currency />}
          />
          <Route
            path="/settingsManagement/branch/:action/:id"
            element={<Branch />}
          />
          <Route path="/settingsManagement/branch" element={<Branch />} />
          {/* AddProperty */}
          <Route
            path="/settingsManagement/property/:action/:id"
            element={<AddProperty />}
          />
          <Route
            path="/settingsManagement/user/:action/:id"
            element={<User />}
          />
          {/* <Route path="/settingsManagement/:id" element={<User />} /> */}
          {/* CreateLead */}
          {/* new route for academic moduless ---> */}
          {/* <Route
            path="dashboard/university_module/Academic"
            element={<Academic />}
          /> */}
          {/* / */}
          <Route
            path="/university_module/createAcademic"
            element={<CreateAcademic />}
          />
          <Route
            path="/university_module/a/:action/:id"
            element={<CreateAcademic />}
          />
          <Route path="/university_module/a/:id" element={<Academic />} />
          {/* // */}
          <Route
            path="/ApplicationModule/createLead"
            element={<AddNewApplication />}
          />
          <Route
            path="/ApplicationModule/:action/:id"
            element={<AddNewApplication />}
          />
          <Route path="/ApplicationModule/:id" element={<Applications />} />
          <Route
            path="/InvoiceManagement/createInvoice"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/CreateMailing"
            element={<CreateMailing />}
          />
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
