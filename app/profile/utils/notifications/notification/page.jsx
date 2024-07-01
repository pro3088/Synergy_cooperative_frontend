"use client";
import Button from "@components/common/Button";
import getDonation from "@/firebase/firestore/getDonationById";
import getRequest from "@/firebase/firestore/getRequestById";
import updateNotification from "@/firebase/firestore/updateNotification";
import addNotification from "@/firebase/firestore/addNotification";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [application, setApplication] = useState([]);
  const status = localStorage.getItem("status");
  const router = useRouter();

  const urlParams = new URLSearchParams(window.location.search);
  const appId = urlParams.get("appId");
  const id = urlParams.get("id");
  const detail = urlParams.get("detail");
  const reciever = urlParams.get("sender")

  const handleDecline = async (event) => {
    event.preventDefault();
    let result, error;

    if (detail == "donor") {
      ({ result, error } = addNotification(
        reciever,
        "Application Declined",
        "Your donor application was declined",
        "response",
        "donor",
        id
      ));
    } else if (detail == "request") {
      ({ result, error } = addNotification(
        reciever,
        "Application Declined",
        "Your recipient application was declined",
        "response",
        "donor",
        id
      ));
    }

    if (error) {
      console.log(error);
    } else {
      return router.push("/notifications");
    }
  };

  const handleApproval = async (event) => {
    event.preventDefault();
    let result, error;

    if (detail == "donor") {
      ({ result, error } = addNotification(
        reciever,
        "Application Approved",
        "Your donor application was approved",
        "response",
        "donor",
        appId
      ));
    } else if (detail == "request") {
      ({ result, error } = addNotification(
        reciever,
        "Application Approved",
        "Your recipient application was approved",
        "response",
        "donor",
        appId
      ));
    }

    if (error) {
      console.log(error);
    } else {
      return router.push("/notifications");
    }
  };

  const fetchApplicationByDonationId = async (id) => {
    let result, error;
    ({ result, error } = await getDonation(id));
    if (error) {
      console.log(error);
    } else {
      setApplication(result);
    }
  };

  const updateNotificationById = async (id) => {
    let result, error;
    ({ result, error } = await updateNotification(id));
    if (error) {
      console.log(error);
    }
  };

  const fetchApplicationByRequestId = async (id) => {
    let result, error;
    ({ result, error } = await getRequest(id));
    if (error) {
      console.log(error);
    } else {
      setApplication(result);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get("appId");
    const id = urlParams.get("id");
    const detail = urlParams.get("detail");
    if (detail == "donor") {
      fetchApplicationByDonationId(appId);
    } else if (detail == "request") {
      fetchApplicationByRequestId(appId);
    }
    updateNotificationById(id);
  }, []);

  return (
    <div className="w-full h-full mt-4 space-y-4">
      <div className="flex flex-col justify-between w-full xl:justify-around space-y-2">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold">Notifications</h3>
            <h4 className="text-md">Check your notifications here</h4>
          </div>
          <Button
            text="Back"
            textColor="blue"
            link={"/notifications"}
            border={true}
          />
        </div>
        {application != null &&
          Object.entries(application).map(([key, value], index) => (
            <div
              key={index}
              className="flex flex-row space-y-4 rounded-md border border-[var(--primary-color)] items-center w-full space-x-40"
            >
              <h4 className="text-md font-bold bg-[var(--primary-color)] p-2 px-4 w-32">
                {key}
              </h4>
              <p className="text-md">{value}</p>
            </div>
          ))}
        {status == "admin" && (
          <div className="flex flex-row w-full items-center justify-center space-x-4">
            <button
              className="p-2 px-4 border rounded-md border-[var(--primary-color)]"
              onClick={handleApproval}
            >
              Approve
            </button>
            <button
              className="p-2 px-4 border rounded-md border-[var(--primary-color)]"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
