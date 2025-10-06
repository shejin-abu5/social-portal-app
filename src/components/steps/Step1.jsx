import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step1({ formData, setFormData, nextStep }) {
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

  useEffect(() => {
    const handleLanguageChange = () => {
      clearErrors(); // clear all errors when language changes
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, clearErrors]);

  const fields = [
    {
      labelKey: "FullName",
      name: "name",
      type: "text",
      requiredMsgKey: t("FullNameRequired"),
    },
    {
      labelKey: "NationalID",
      name: "nationalId",
      type: "text",
      requiredMsgKey: t("NationalIDRequired"),
      pattern: { value: /^[0-9]+$/, messageKey: t("OnlyNumbers") },
    },
    {
      labelKey: "DateOfBirth",
      name: "dob",
      type: "date",
      requiredMsgKey: t("DateOfBirthRequired"),
    },
    {
      labelKey: "Gender",
      name: "gender",
      type: "select",
      requiredMsgKey: t("GenderRequired"),

      options: [
        { value: "male", labelKey: t("Male") },
        { value: "female", labelKey: t("Female") },
      ],
     
    },
    {
      labelKey: "Address",
      name: "address",
      type: "text",
      requiredMsgKey: t("AddressRequired"),
    },
    {
      labelKey: "City",
      name: "city",
      type: "text",
      requiredMsgKey: t("CityRequired"),
    },
    {
      labelKey: "State",
      name: "state",
      type: "text",
      requiredMsgKey: t("StateRequired"),
    },
    {
      labelKey: "Country",
      name: "country",
      type: "text",
      requiredMsgKey: t("CountryRequired"),
    },
    {
      labelKey: "Phone",
      name: "phone",
      type: "tel",
      pattern: { value: /^[0-9]+$/, messageKey: t("OnlyNumbers") },
      minLength: { value: 10, messageKey: t("minLength") },
      requiredMsgKey: t("PhoneRequired"),
    },
    {
      labelKey: "Email",
      name: "email",
      type: "email",
      requiredMsgKey: t("EmailRequired"),
      pattern: {
        value: /^\S+@\S+$/i,
        messageKey: t("InvalidEmail"),
      },
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <h2 className="text-2xl font-light mb-8">{t("Step1")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <FormField key={field.name} field={field} register={register} errors={errors} />
        ))}
      </div>

      <button type="submit" 
                className="ml-auto flex rounded-full cursor-pointer border border-gray-950 bg-gray-950 px-5 py-3 text-sm font-bold tracking-widest text-white uppercase dark:border-gray-700 dark:bg-gray-700"

      >
        {t("Next")} &nbsp; <span>{t("arrowForward")}</span>
      </button>
    </form>
  );
}
