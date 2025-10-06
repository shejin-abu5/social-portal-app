import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"; 

export default function Step3({ formData, setFormData, prevStep, setStep }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const [aiPopup, setAiPopup] = useState({
    open: false,
    targetField: "",
    suggestion: "",
    loading: false,
    error: "",
  });

 const onSubmit = (data) => {
  const finalData = { ...formData, ...data }; 
  console.log("Final Submission:", finalData);

  localStorage.setItem("formData", JSON.stringify(finalData)); // Store in localStorage

 

  alert("✅ Form submitted successfully!");
  setStep(1); // Go back to step 1
};

  // disabled AI function — popup
  const handleHelpMeWrite = (fieldName) => {
    setAiPopup({
      open: true,
      targetField: fieldName,
      suggestion: t("AiFeatureDisabled"),
      loading: false,
      error: "",
    });
  };

  const handleAccept = () => {
    setValue(aiPopup.targetField, aiPopup.suggestion);
    setAiPopup({ open: false, targetField: "", suggestion: "", error: "" });
  };

  const handleDiscard = () => {
    setAiPopup({ open: false, targetField: "", suggestion: "", error: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative p-6">
      <h2 className="text-2xl font-light mb-8">{t("Step3")}</h2>

      {/* --- Textarea 1 --- */}
      <div className="mb-6">
        <label className="block mb-1 font-bold text-sm">
          1. {t("CurrentFinancialSituation")}  <span className="inline-block text-xs">*</span>
        </label>
        <div className="flex gap-2 md:flex-row flex-col">
          <textarea
            {...register("financialSituation", {
              required: t("FieldRequired"),
            })}
            rows="3"
            className="heroInputArea w-full border border-[#666] p-3 text-[#343434] bg-white focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] transition duration-300 rounded-lg"
          ></textarea>
          <button
            type="button"
            onClick={() => handleHelpMeWrite("financialSituation")}
            className="bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium cursor-pointer"
          >
            ✨ {t("HelpMeWrite")}
          </button>
        </div>
        {errors.financialSituation && (
          <p className="text-red-600 text-sm mt-1">
            {errors.financialSituation.message}
          </p>
        )}
      </div>

      {/* --- Textarea 2 --- */}
      <div className="mb-6">
        <label className="block mb-1 font-bold text-sm">
          2. {t("EmploymentCircumstances")}  <span className="inline-block text-xs">*</span>
        </label>
        <div className="flex gap-2 md:flex-row flex-col">
          <textarea
            {...register("employmentCircumstances", {
              required: t("FieldRequired"),
            })}
            rows="3"
            className="heroInputArea w-full border border-[#666] p-3 text-[#343434] bg-white focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] transition duration-300 rounded-lg"
          ></textarea>
          <button
            type="button"
            onClick={() => handleHelpMeWrite("employmentCircumstances")}
            className="bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium cursor-pointer"
          >
            ✨ {t("HelpMeWrite")}
          </button>
        </div>
        {errors.employmentCircumstances && (
          <p className="text-red-600 text-sm mt-1">
            {errors.employmentCircumstances.message}
          </p>
        )}
      </div>

      {/* --- Textarea 3 --- */}
      <div className="mb-6">
        <label className="block mb-1 font-bold text-sm">
          3. {t("ReasonForApplying")}  <span className="inline-block text-xs">*</span>
        </label>
        <div className="flex gap-2 md:flex-row flex-col">
          <textarea
            {...register("reasonForApplying", {
              required: t("FieldRequired"),
            })}
            rows="3"
            className="heroInputArea w-full border border-[#666] p-3 text-[#343434] bg-white focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] transition duration-300 rounded-lg"
          ></textarea>
          <button
            type="button"
            onClick={() => handleHelpMeWrite("reasonForApplying")}
            className="bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium cursor-pointer"
          >
            ✨ {t("HelpMeWrite")}
          </button>
        </div>
        {errors.reasonForApplying && (
          <p className="text-red-600 text-sm mt-1">
            {errors.reasonForApplying.message}
          </p>
        )}
      </div>

      {/* --- Navigation --- */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
                    className="rounded-full cursor-pointer border border-gray-500 bg-gray-500 px-5 py-2 text-xs/7 font-bold tracking-widest text-white uppercase"

        >
         {t("Back")} &nbsp; <span>{t("arrowBack")}</span>
        </button>
        <button
          type="submit"
                    className="rounded-full border cursor-pointer border-gray-950 bg-gray-950 px-5 py-2 text-xs/7 font-bold tracking-widest text-white uppercase"

        >
          {t("Submit")}
        </button>
      </div>

      {/* --- AI Popup --- */}
      {aiPopup.open && (
        <div className="fixed inset-0 bg-gray-700/85  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 md:w-1/3 w-full relative">
            <h3 className="font-semibold text-lg mb-2">{t("AISuggestion")}</h3>

            {aiPopup.loading && <p className="text-gray-500">⏳ {t("Generating")}</p>}

            {aiPopup.error && <p className="text-red-600">{aiPopup.error}</p>}

            {!aiPopup.loading && !aiPopup.error && (
              <textarea
                value={aiPopup.suggestion}
                onChange={(e) =>
                  setAiPopup((prev) => ({
                    ...prev,
                    suggestion: e.target.value,
                  }))
                }
                rows="5"
                className="border p-2 rounded w-full mb-4"
              />
            )}

            <div className="flex justify-end gap-2">
              {!aiPopup.loading && (
                <>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="bg-gray-300 px-3 py-2 rounded text-sm cursor-pointer"
                  >
                    {t("Discard")}
                  </button>
                  <button
                    type="button"
                    onClick={handleAccept}
                    className=" border-gray-950 bg-gray-950 text-white px-3 py-2 rounded text-sm cursor-pointer"
                  >
                    {t("Accept")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
