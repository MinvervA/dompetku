import api from "@/api/axios";
import { RegistForm } from "@/components/regist-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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
    const loadingToas = toast.loading("Sedang diproses...");
    try {
      const res = await api.post("/auth/register", data);
      const user = res.data.user;

      toast.success("Register Berhasil", {
        description: `Selamat akun dengan nama ${user.name} berhasil dibuat!`,
        id: loadingToas,
        position: "top-center",
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Register Gagal", {
        description:
          error.response?.data?.message || "Pastikan data sudah benar!",
        id: loadingToas,
        position: "top-center",
      });
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
