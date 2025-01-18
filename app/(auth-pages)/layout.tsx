export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col gap-12 py-40 items-center">{children}</div>
  );
}
