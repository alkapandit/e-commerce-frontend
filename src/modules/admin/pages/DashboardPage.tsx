import BackButton from "@/common/components/BackButton"

const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <BackButton fallbackTo="/" />
      <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      <p className="text-sm text-slate-500">Dashboard page placeholder.</p>
    </div>
  )
}

export default DashboardPage
