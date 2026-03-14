import { RegistForm } from "@/components/regist-form";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const schema = z.object({
  name: z.string().trim().nonempty("Wajib diisi!"),
  email: z.string().email("Format email tidak valid!").trim(),
  password: z.string().min(6, "Password minimal 6 karakter!"),
});

export const RegisterPage = () => {
  // const {reg} = useAuthStore()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // delay 2 detik

      console.log("submit:", data);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center px-4">
      <RegistForm
        className={"w-full max-w-lg"}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </div>
  );
};
