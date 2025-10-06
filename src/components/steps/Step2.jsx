import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step2({ formData, setFormData, nextStep, prevStep }) {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ defaultValues: formData });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  // Clear errors on language change
  useEffect(() => {
    const handleLanguageChange = () => {
      clearErrors();
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, clearErrors]);

  const fields = [
    {
      labelKey: "MaritalStatus",
      name: "maritalStatus",
      type: "select",
      requiredMsgKey: "MaritalStatusRequired",
      options: [
        { labelKey: "Single", value: "single" },
        { labelKey: "Married", value: "married" }
      ]
    },
    {
      labelKey: "Dependents",
      name: "dependents",
      type: "number",
      requiredMsgKey: "DependentsRequired",
      min: { value: 0, messageKey: "DependentsPositive" }
    },
    {
      labelKey: "EmploymentStatus",
      name: "employmentStatus",
      type: "select",
      requiredMsgKey: "EmploymentStatusRequired",
      options: [
        { labelKey: "Employed", value: "employed" },
        { labelKey: "Unemployed", value: "unemployed" },
        { labelKey: "SelfEmployed", value: "self-employed" }
      ]
    },
    {
      labelKey: "MonthlyIncome",
      name: "monthlyIncome",
      type: "number",
      requiredMsgKey: "MonthlyIncomeRequired",
      min: { value: 0, messageKey: "MonthlyIncomePositive" }
    },
    {
      labelKey: "HousingStatus",
      name: "housingStatus",
      type: "select",
      requiredMsgKey: "HousingStatusRequired",
      options: [
        { labelKey: "Own", value: "own" },
        { labelKey: "Rent", value: "rent" },
        { labelKey: "Family", value: "family" }
      ]
    }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-left">
      <h2 className="text-2xl font-light mb-8">{t("Step2")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            register={register}
            errors={errors}
            t={t}
          />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-full cursor-pointer border border-gray-500 bg-gray-500 px-5 py-3 text-sm font-bold tracking-widest text-white uppercase"
        >
  
           {t("Back")} &nbsp; <span>{t("arrowBack")}</span>
        </button>
        <button
          type="submit"
          className="rounded-full border cursor-pointer border-gray-950 bg-gray-950 px-5 py-3 text-sm font-bold tracking-widest text-white uppercase"
        >
           {t("Next")} &nbsp; <span>{t("arrowForward")}</span>
        </button>
      </div>
    </form>
  );
}
