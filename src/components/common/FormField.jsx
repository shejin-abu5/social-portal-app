import { useTranslation } from "react-i18next";

export default function FormField({ field, register, errors }) {
  const { t } = useTranslation();
  const { labelKey, name, type, requiredMsgKey, pattern, options, minLength } = field;

  return (
    <div className="mb-4">
      <label className="block mb-1 font-bold text-sm w-max">{t(labelKey)} <span className="inline-block text-xs">*</span></label>

      {type === "select" ? (
       

        <select {...register(field.name, { required: t(field.requiredMsgKey) })}
                  className="heroInputArea w-full border border-[#828282] p-3 text-[#343434] bg-white focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] transition duration-300 rounded-lg"

        >
    <option value="" disabled selected>{t("Selectoption")}</option>
    {field.options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {t(opt.labelKey)}
      </option>
    ))}
  </select>
      ) : (
        <input
          type={type}
          {...register(name, {
            required: t(requiredMsgKey),
            pattern: pattern ? { value: pattern.value, message: t(pattern.messageKey) } : undefined,
           minLength: minLength ? { value: minLength.value, message: t(minLength.messageKey) } : undefined,
          })}
          className="heroInputArea border border-[#828282] p-3 text-[#343434] bg-white focus:outline-none focus:ring-1 focus:ring-[#000] focus:border-[#000] transition duration-300 rounded-lg w-full"
        />
      )}

      {errors[name] && <p className="text-red-600 text-sm mt-1 errorMsg">{errors[name].message}</p>}
    </div>
  );
}
