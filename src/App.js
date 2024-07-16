import React, { useState } from "react";
import { IoIosMenu, IoIosPhonePortrait } from "react-icons/io";
import MobileScreen from "./components/MobileScreen";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import axios from "axios";
import CryptoJS from "crypto-js";

const SubscriptionPage = () => {
  const [phone, setPhone] = useState("");

  const endpoint = "https://d3398n96t5wqx9.cloudfront.net/UsersAquisition/";
  const accessToken = "0e186445-0647-417c-ae27-8098533f1914";
  const encryptionKey = "FtmJ7frzTyWOzintybbqIWzwwclcPtaI";
  const iv = encryptionKey.substring(0, 16);

  const encryptData = (data, key, iv) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  };

  const makeApiRequest = async (data) => {
    const encryptedData = encryptData(data, encryptionKey, iv);

    console.log(encryptedData);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post(endpoint, { encryptedData }, config);
      console.log(response.data);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  // Example data to send
  const requestData = {
    DeviceInfo: {
      PackageName: "com.test.com",
      LangCode: "en",
      DeviceID: "test_dev_doc",
    },
    Referrer: {
      Affiliate: {
        Campaign: "will be shared with you",
        ClickID: "your clickid",
        Pub_ID: "your pub id",
        Aff_ID: "your aff id",
        extra: "",
        extra1: "",
        firstPageButtonID: "msisdn-entry",
        secondPageButtonID: "pin-entry",
        Country: "the desired country",
      },
    },
    Request: {
      Action: 1,
      TransactionID: "",
      SessionID: "",
      MSISDN: "",
      PinCode: "",
    },
  };
  const handleSubmit = async () => {
    makeApiRequest(requestData);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-b from-blue-500   via-white to-white ">
      <div className=" mx-auto p-6 max-w-md w-full">
        <div className=" flex justify-between">
          <IoMenu className=" text-gray-700" size={35} />
          <div>
            <select className="text-xs  bg-transparent border border-black">
              <option value="EN" className=" bg-blue-600 text-white">
                EN
              </option>
            </select>
          </div>
        </div>

        <div className=" mt-4 flex flex-col w-fit items-center">
          <img
            src="https://click.afflink.mobi/assets_ua/subpage.png"
            alt=""
            className="w-8 h-10"
          />
          <p className="text-xs text-gray-600 font-medium">STEP 1/2</p>
        </div>

        <div className=" flex gap-x-2 mt-2">
          {Array.from({ length: 2 }).map((item, index) => (
            <div className=" w-full h-2 bg-gray-400 ">
              {index == 0 && <div className="w-2 h-full bg-blue-700"></div>}
            </div>
          ))}
        </div>

        <MobileScreen />

        <div className="flex flex-col ">
          <div className=" relative inputAnimation">
            <label
              htmlFor="mobile-number"
              className="text-sm absolute -top-2 bg-white left-8 px-2 text-blue-700"
            >
              Mobile number
            </label>
            <div className="flex items-center  border-blue-700 rounded-lg border-2 p-4">
              <MdOutlinePhoneIphone className=" text-xl font-normal text-black" />
              <span className="ml-1 text-xl font-normal">91</span>
              <input
                type="text"
                id="mobile-number"
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 ml-4 outline-none text-xl font-normal placeholder:text-gray-500 placeholder:text-4xl"
                placeholder="_ _ _ _ _ _ _ _ _ _ "
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className={`mt-12 font-bold py-4 rounded-lg  text-2xl ${
              phone.length == 10
                ? "text-white bg-gradient-to-r from-blue-900 to-blue-600"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={phone.length != 10}
          >
            CONTINUE
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>
            Entertainment is a subscription service that will automatically
            renew for 1 USD/7 Day(s). You can unsubscribe from the service at
            anytime, by sending STOP to **** for (operator). To make use of this
            service, you must be 18 or more unless you have received permission
            from your parents or the person who is authorized to pay your bill.
          </p>
          <div className="mt-2">
            <a href="#" className="text-blue-500 underline">
              Terms & Conditions
            </a>{" "}
            -{" "}
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
