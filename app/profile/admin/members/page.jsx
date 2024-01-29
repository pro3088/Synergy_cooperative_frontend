import Members from "@components/page-sections/profile/admin/members";

const page = () => {
  return (
    <div className="w-3/4 pr-12 pt-12 left-0">
      <div className="flex flex-col w-full h-full space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl">Members</h3>
          <h5>View members here</h5>
        </div>
        <Members />
      </div>
    </div>
  )
}

export default page
