import { Helmet } from "react-helmet-async";
import { useAppSelector } from "@app/store/hooks";
import PageHeader from "@shared/components/common/PageHeader";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div className="container max-w-2xl py-8">
      <Helmet><title>My Profile — ShopEase</title></Helmet>
      <PageHeader title="My Profile" />

      <div className="flex items-center gap-4 rounded-lg border p-5">
        <img src={user.image} alt={user.username} className="h-16 w-16 rounded-full object-cover" />
        <div>
          <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-4 rounded-lg border p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-muted-foreground">Email</dt>
          <dd className="text-sm">{user.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-muted-foreground">Gender</dt>
          <dd className="text-sm capitalize">{user.gender}</dd>
        </div>
      </dl>
    </div>
  );
}
