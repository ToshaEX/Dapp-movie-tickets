"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { Formik } from "formik";
import { useContext } from "react";
import { notify } from "@/context/utils/notify";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@/components/Button"));
const Heading = dynamic(() => import("@/components/Heading"));
const TextInput = dynamic(() => import("@/components/TextInput"));

type FormPropType = {
  title: string;
  rating: number;
};

const initialValues: FormPropType = { title: "", rating: 0 };

export default function AddMovie() {
  const { addMovie } = useContext<any>(MovieTicketingContext);
  return (
    <div>
      <Heading text="Add Movie" />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!values.rating || !values.title.length) {
            notify({ message: "Please fill all fields", type: "info" });
            setSubmitting(false);
            return;
          }
          setSubmitting(true);
          addMovie(values.title, values.rating).then(() => {
            setSubmitting(false);
            resetForm();
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className=" m-5">
            <div className="flex flex-col w-[50vw] lg:w-[40vw]">
              <TextInput
                name="title"
                type="text"
                label="Title"
                placeHolder="Gajaman 3D"
                handleChange={handleChange}
              />
              <TextInput
                name="rating"
                type="number"
                label="Rating"
                placeHolder="5"
                max={5}
                min={1}
                handleChange={handleChange}
              />
              <Button label="Add Movie" isLoading={isSubmitting} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
