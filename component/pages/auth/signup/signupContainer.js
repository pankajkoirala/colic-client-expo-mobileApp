import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../../../service/authService";
import Signup from "./signup";
import Loader from "./../../../../common/loader";
import { errorAlert } from "../../../../common/alert";

export default SignupContainer = (props) => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [loaderIsOpen, setLoaderIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setLoaderOff = () => {
    setLoaderIsOpen(false);
  };
  const onSubmit = (data) => {
    const signupData = {
      email: data?.email?.toLowerCase().split(" ")[0],
      username: data?.username?.toLowerCase().split(" ")[0],
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      is_subscribe: data.is_subscribe,
    };
    console.log(
      "🚀 ~ file: signupContainer.js ~ line 30 ~ onSubmit ~ signupData",
      signupData
    );

    if (signupData.username.length <= 3) {
      errorAlert("Username Must Contain More Than 3 Character");
    } else if (signupData.password.length < 8) {
      errorAlert("password must contain 8 character");
    } else if (signupData.password !== signupData.confirmPassword) {
      errorAlert("Password Does Not match");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        signupData.email
      )
    ) {
      errorAlert("invalid email");
    } else {
      console.log("asdadasda");
      setLoaderIsOpen(true);
      signup(signupData, props, setLoaderOff);
    }
  };

  return (
    <>
      <Loader loaderIsOpen={loaderIsOpen} />
      <Signup
        checkedOne={checkedOne}
        setCheckedOne={setCheckedOne}
        checkedTwo={checkedTwo}
        setCheckedTwo={setCheckedTwo}
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        {...props}
      />
    </>
  );
};
