import Navbar from "@components/layout/Navbar";
import Button from "@components/common/Button";
import Form from "@components/common/Form";

const formConfig = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'emailAddress', label: 'Email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'referralCode', label: 'Code' },
  ];

const page = () => {
  return (
    <section>
        <Navbar
            buttonText="Back"
            buttonLink="/"
            showBackground={false}
            linkColor="black"
            buttonTextColor="blue"
        />
        <div className="flex flex-row justify-between items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-2xl px-4 md:px-12 lg:px-28">
            <div className="flex flex-col gap-2">
                <h4 className="text-2xl font-bold">
                    Already signed up?
                </h4>
                <p>
                    Log in to your account
                </p>
                <Button text="Log in" textColor="blue" link={"/login"} border={true} />
            </div>
            <div className="flex flex-col gap-4 w-1/3">
                <div className=" flex flex-col gap-1">
                    <h4 className="text-2xl font-bold">
                        Sign up for an account
                    </h4>
                    <p>
                        Welcome!
                    </p>
                </div>
                <Form formConfig={formConfig} isSignup={true}/>
            </div>
        </div>
    </section>
  )
}

export default page
