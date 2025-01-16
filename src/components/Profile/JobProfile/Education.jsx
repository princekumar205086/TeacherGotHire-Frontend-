import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../../Input";
import Button from "../../Button";
import {
  getEducationProfile,
  getQualification,
  postEducationProfile,
  putEducationProfile,
  delEducationProfile,
} from "../../../features/jobProfileSlice";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";

const Education = () => {
  const dispatch = useDispatch();
  const qualification = useSelector(
    (state) => state?.jobProfile?.qualification
  );
  console.log("qualification", qualification);
  const educationData = useSelector(
    (state) => state.jobProfile?.educationData || []
  );
  console.log("Education Data", educationData);

  const [editingIndex, setEditingIndex] = useState(null);
  //const [isEditingExprience, setIsEditingExprience] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch education data on component mount
  useEffect(() => {
    dispatch(getQualification());
    dispatch(getEducationProfile());
  }, []);

  const fetchProfile = () => {
    dispatch(getEducationProfile());
  };

  // Handle saving or updating education data
  const onSubmit = async (data) => {
    try {
      console.log("edudata", data);
      console.log("editindex", editingIndex);
      if (editingIndex !== null) {
        const id = educationData[editingIndex].id;
        // Construct payload with only necessary fields
        const payload = {
          institution: data.institution,
          qualification: data.qualification,
          year_of_passing: data.year_of_passing,
          grade_or_percentage: data.grade_or_percentage,
        };
        console.log("payload", payload, id);

        await dispatch(putEducationProfile({ payload, id })).unwrap();
        fetchProfile();
      } else {
        await dispatch(postEducationProfile(data)).unwrap(); // Dispatch with new data
        fetchProfile();
      }

      setIsEditing(false);
      setEditingIndex(null); // Exit editing mode
      reset(); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
    const experience = educationData[index];
    Object.keys(experience).forEach((key) => {
      setValue(key, experience[key]);
    });
  };

  const handleDelete = async (index) => {
    // console.log("in", index);
    try {
      const id = educationData[index].id;
      console.log(id);
      await dispatch(delEducationProfile({ id: id })).unwrap();
      fetchProfile();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="px-5 mt-2">
      <div className="flex mb-4 justify-between items-center">
        <h2 className="text-xl font-bold  text-gray-600">Teacher Education</h2>
        <button
          className="text-white bg-[#3E98C7] transition-colors px-6 py-2 rounded-md text-sm font-medium"
          onClick={() => {
            reset();
            setIsEditing(true);
          }}
        >
          Add Education
        </button>
      </div>
      {educationData.length < 1 && !isEditing && (
        <div className="px-4 border-b">
          <h1 className="text-gray-500 pb-2">No data available</h1>
        </div>
      )}
      

      {!isEditing ? (
        // <div className="grid grid-cols-1 rounded-md bg-slate-50 px-4 gap-4">
        //   {educationData &&
        //     educationData.map((experience, index) => (
        //       <div
        //         key={index}
        //         className="p-4 "
        //       >
        //         <div className="flex justify-between items-center mb-2">
        //           <h2 className="text-lg font-semibold text-gray-800">
        //             {experience.institution || "Institution"}
        //           </h2>
        //           <div className="flex space-x-4">
        //             <button
        //               onClick={() => {
        //                 handleEdit(index);
        //                 setIsFormVisible(true);
        //                 setIsEditing(true);
        //                 setEditingRowIndex(index);
        //               }}
        //               className="text-gray-500 hover:text-gray-600"
        //             >
        //               <HiPencil className="h-6 w-6" />
        //             </button>
        //             <button
        //               onClick={() => handleDelete(index)}
        //               className="text-red-500 hover:text-red-600"
        //             >
        //               <HiOutlineTrash className="h-6 w-6" />
        //             </button>
        //           </div>
        //         </div>
        //         <div className="text-sm text-gray-700 space-y-1">
        //           <p>
        //             <strong className="mr-2">Qualification:</strong>{" "}
        //             {experience.qualification.name || "N/A"}
        //           </p>
        //           <p>
        //             <strong className="mr-2">Year of Passing:</strong>{" "}
        //             {experience.year_of_passing || "N/A"}
        //           </p>
        //           <p>
        //             <strong className="mr-2">Grade:</strong>{" "}
        //             {experience.grade_or_percentage || "N/A"}
        //           </p>
        //         </div>
        //       </div>
        //     ))}
        // </div>
        <div className="border-b px-4 gap-4">
          {educationData &&
            educationData.map((experience, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {experience.qualification.name || "Institution"}
                  </h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        handleEdit(index);
                        setIsFormVisible(true);
                        setIsEditing(true);
                        setEditingRowIndex(index);
                      }}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <HiPencil className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <HiOutlineTrash className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p className="text-[16px] font-medium">
                    {`${experience.institution || "N/A"}, Year of Passing: ${
                      experience.year_of_passing || "N/A"
                    }, Grade: ${experience.grade_or_percentage || "N/A"}`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-6 py-4 rounded-md border border-gray-300"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Institution"
                className="w-full border-b border-gray-300 text-sm focus:outline-none p-3"
                placeholder="Enter Institution"
                type="text"
                {...register("institution", { required: true })}
              />
              {errors.institution && (
                <span className="text-red-500 text-sm">
                  {errors.institution.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                qualification
              </label>
              <select
                {...register("qualification", { required: true })}
                className="w-full border-b border-gray-300 text-sm focus:outline-none p-3 focus:ring-teal-500"
              >
                <option value="" disabled>
                  Select Qualification
                </option>
                {qualification.map((role) => (
                  <option
                    key={role.id}
                    value={role.name}
                    label={role.name}
                  ></option>
                ))}
              </select>
              {errors.qualification && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Input
                label="Year_of_Passing"
                className="w-full border-b border-gray-300 text-sm focus:outline-none p-3 focus:ring-teal-500"
                placeholder="Enter Start Date"
                type="text"
                {...register("year_of_passing")}
              />
              {errors.year_of_passing && (
                <span className="text-red-500 text-sm">
                  {errors.start_date.message}
                </span>
              )}
            </div>
            <div>
              <Input
                label="Grade of percentage"
                className="w-full border-b border-gray-300 text-sm focus:outline-none p-3 focus:ring-teal-500"
                placeholder="Grade of percentage"
                type="text"
                {...register("grade_or_percentage")}
              />
              {errors.grade_or_percentag && (
                <span className="text-red-500 text-sm">
                  {errors.grade_or_percentag.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                type="button"
                textColor="text-[#3E98C7]"
                className="bg-white text-[#3E98C7] py-1.5 px-4 rounded-md border border-[#3E98C7]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                bgcolor="bg-[#3E98C7]"
                className="text-white py-1.5 px-4 rounded-md"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Education;
