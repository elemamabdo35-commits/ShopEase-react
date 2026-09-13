import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useAppSelector } from "@app/store/hooks";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import type { ApiError } from "@shared/types/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
      },
      onError: (error) => {
        const apiError = error as ApiError;
        toast.error(apiError.message ?? "Invalid username or password");
      },
    });
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Helmet>
        <title>Login — ShopEase</title>
      </Helmet>

      <div className="w-full max-w-sm rounded-lg border p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold">Sign in to your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Try DummyJSON demo user: <span className="font-medium">emilys</span> /{" "}
            <span className="font-medium">emilyspass</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" autoComplete="username" {...register("username")} />
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="mt-2 w-full" isLoading={isPending}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
