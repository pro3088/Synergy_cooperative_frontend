import Navbar from "@components/layout/Navbar";
import Button from "@components/common/Button";
import Form from "@components/common/Form";

const formConfig = [
  { name: "username", label: "Email" },
  { name: "password", label: "Password", type: "password" },
];

const Page = () => {
  return (
    <section className="relative h-screen">
      <Navbar
        buttonText="Back"
        buttonLink="/"
        showBackground={false}
        linkColor="black"
        buttonTextColor="blue"
      />
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl py-4 px-4 md:px-12 lg:px-28">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl font-bold">Log in to your account</h4>
            <p>Welcome back!</p>
          </div>
          <Form formConfig={formConfig} isSignup={false}/>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <h4 className="text-2xl font-bold">No Account?</h4>
          <p>Sign up and start exploring</p>
          <Button
            text="Sign up"
            textColor="blue"
            link={"/signup"}
            border={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
