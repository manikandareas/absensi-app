"use client";
import { useState } from "react";
import EmailTab from "./EmailTab";
import AccountRegistrationTab from "./AccountRegistrationTab";

type RegistrationFormProps = {};

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("email");

  return (
    <>
      {activeTab === "email" ? (
        <EmailTab setActiveTab={setActiveTab} />
      ) : (
        <AccountRegistrationTab setActiveTab={setActiveTab} />
      )}
    </>
  );
};
export default RegistrationForm;
