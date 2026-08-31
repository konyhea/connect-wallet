

import SignInDialog from "./__component/Dialog"


const Page = () => {
  return (
      <div className="grid h-screen items-center justify-center`">
                    <div className="w-full h-auto min-h-[230px] flex items-center justify-center border rounded-[3px] border-black-a2 px-10 py-15 ">
                      <SignInDialog />
                </div>
      </div>
  )
}

export default Page