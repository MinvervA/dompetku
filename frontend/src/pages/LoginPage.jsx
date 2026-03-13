import { z } from "zod";
import { LoginForm } from "../components/login-form.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api/axios.js";
import { useAuthStore } from "@/store/authStore.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const loadingToas = toast.loading("Sedang login...");
    try {
      console.log(data);
      const res = await api.post("/auth/login", data);
      const token = res.data.token;
      const user = res.data.user;
      login(user, token);
      toast.success("Login Berhasil", {
        description: `Selamat Datang ${user.name}`,
        id: loadingToas,
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login Gagal", {
        description:
          error.response?.data?.message || "Email atau password salah",
        id: loadingToas,
        position: "top-center",
      });
      return;
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center px-4">
      <LoginForm
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
