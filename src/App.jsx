import "./i18n";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";

function App() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

   useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);


  const totalSteps = 3;
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr"; // Handle direction
     document.documentElement.lang = lng;
  };

  return (
    <div className="max-w-3xl mx-auto  shadow-xl/20 rounded-lg relative bg-white mb-6">
       {/* Progress Bar */}
      <div className="sticky w-full h-1.5 bg-gray-200 rounded-full  top-0 z-10">
        <div
          className="relative h-full bg-black rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      {/* Language Switcher */}
      <div 
      className={`flex justify-end gap-1.5 mb-4 md:pt-8 pt-4 px-4 ${
     i18n.language === "ar" ? "flex-row-reverse" : ""
  }`}
      >
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 border rounded text-sm cursor-pointer ${
            i18n.language === "en" ? "bg-black text-white font-semibold" : ""
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("ar")}
          className={`px-3 py-1 border rounded text-sm cursor-pointer ${
            i18n.language === "ar" ? "bg-black text-white font-semibold" : ""
          }`}
        >
          AR
        </button>
      </div>

     

      {/* Step Indicator */}
      {/* <div className="flex justify-between text-sm font-medium text-gray-600 mb-6">
        <span className={step >= 1 ? "text-blue-600" : ""}>{t("Step 1")}</span>
        <span className={step >= 2 ? "text-blue-600" : ""}>{t("Step 2")}</span>
        <span className={step >= 3 ? "text-blue-600" : ""}>{t("Step 3")}</span>
      </div> */}

      {/* Step Forms */}
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          t={t}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          t={t}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          t={t}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default App;
