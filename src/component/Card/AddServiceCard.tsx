import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { ImgView } from './ImgVies';
import { removeImgFromCloud } from '@/lib/utils';
import axios from 'axios';


export const UpdateServiceCard: React.FC<{
  id: string;
  serviceName: string;
  img: { url: string; key: string; _id: string; };
  serviceHours: number;
  serviceMinutes: number;
  serviceType: number;
  servicePrice: number;
  mobile: boolean;
}> = ({ id, serviceName, serviceHours, serviceMinutes, serviceType, servicePrice, img, mobile }) => {

  const [serviceImgFile, setServiceImgFile] = useState<any>(null);
  const validationSchema = Yup.object({
    "serviceName": Yup.string().required('Service Name is required'),
    "serviceHours": Yup.string().required('Duration is required'),
    "serviceMinutes": Yup.string().required('Duration is required'),
    "serviceType": Yup.string().required('Duration is required'),
    "servicePrice": Yup.string().required('Price is required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          serviceId: id,
          serviceName: serviceName,
          serviceHours: serviceHours,
          serviceMinutes: serviceMinutes,
          serviceType: serviceType,
          servicePrice: servicePrice,
          mobile: mobile,
          serviceImg: serviceImgFile,
          img: img,
        }}
        enableReinitialize // Allow Formik to reinitialize when initialValues change
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log({ values });
          setSubmitting(true);
          axios.post("/api/salon/add-service-list", values).then(r => {
            setSubmitting(false);
            console.log({ r });
            if (values.serviceImg) {
              const formData = new FormData();
              formData.append(`file-0`, values.serviceImg);
              formData.append("type", "service");
              formData.append("serviceId", r.data.data._id);
              axios.post('/api/upload/salon', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }).then(r => {
                console.log({ r });
                close();
              }).catch(e => { });
            }
          }).catch(e => { });
          console.log('Form submitted with values:', values);
        }}
      >
        {({ isSubmitting, values, setValues }) => (

          <Form className="w-full max-w-lg mx-auto">
            <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mb-8 mt-4">

              {values.serviceImg || values.img ?
                <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mt-4">
                  <ImgView onDelete={() => {
                    if (isNaN(Number(img._id))) {
                      // delete from cloud
                      removeImgFromCloud("service", img._id).then(r => {
                        setServiceImgFile(null);
                        setValues({ ...values, img: null });
                      });
                    } else {
                      setServiceImgFile(null);
                      setValues({ ...values, img: null });
                    }
                  }} url={values.serviceImg ? URL.createObjectURL(values.serviceImg) : values?.img?.url} />
                </div>
                : <>
                  <label htmlFor="dropzone-file-extra" className="cursor-pointer border-dashed p-4 rounded-xl min-w-[6rem] min-h-[6rem] text-center border-[#D5CFCF] border">
                    <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12H18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 18V6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>Add</p>
                    <input
                      name="serviceImg"
                      onChange={(e) => setServiceImgFile(e.target.files[0])}
                      id="dropzone-file-extra" type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" />
                  </label>
                </>}
              <ErrorMessage name="serviceImg" component="div" className="text-red-500 text-sm" />
            </div>


            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <div
                  style={{ marginTop: '-0.75rem', paddingLeft: '1rem' }}
                  className="absolute"><span className="bg-white ">Service Name</span></div>
                <Field
                  name="serviceName"
                  type="text"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-900 border rounded-xl py-3 px-4 leading-tight focus:outline-none font-semibold focus:bg-white"
                />
                <ErrorMessage name="serviceName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="relative w-full px-3">
                <Field
                  as="select"
                  name="serviceType"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Service Type</option>
                  <option value="1">Service Type 1</option>
                  <option value="2">Service Type 2</option>
                  <option value="3">Service Type 3</option>
                  <option value="4">Service Type 4</option>
                  <option value="5">Service Type 5</option>
                  <option value="6">Service Type 6</option>
                </Field>
                <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm" />
              </div>
            </div>


            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="relative w-1/2 px-3">
                <Field
                  as="select"
                  name="serviceHours"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Hour (s)</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Field>
                <ErrorMessage name="serviceHours" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="relative w-1/2 px-3">
                <Field
                  as="select"
                  name="serviceMinutes"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Minutes</option>
                  <option value="15">0</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                </Field>
                <ErrorMessage name="serviceMinutes" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <span
                  style={{ borderRight: '1px solid #D0D0D0', paddingRight: '1rem' }}
                  className="absolute text-[16px] left-6 text-gray-700 top-0 bottom-0 my-auto h-6">
                  Price $
                </span>
                <Field
                  name="servicePrice"
                  type="text"
                  style={{ paddingLeft: '5.7rem' }}
                  className="appearance-none pl-[5.7rem] block w-full border-b h-14 !border-[#E6E5E5] bg-[#E6E5E5] bg-opacity-60 text-gray-900 font-semibold border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <ErrorMessage name="servicePrice" component="div" className="text-red-500 ml-3 text-sm" />
            </div>

            <span className="flex items-center">
              <span className='ml-2'>
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform='rotate(90)'
                  style={{ marginRight: '1rem' }}
                >
                  <path
                    d="M1.08984 14.1016L7.21653 7.97488L1.08984 1.84819"
                    stroke="#9C9C9C"
                    strokeWidth="2.0051"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <label htmlFor={`mobile-status`} className="flex items-center cursor-pointer">

                <div className="relative pl-10">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValues({ ...values, mobile: true });
                      } else {
                        setValues({ ...values, mobile: false });
                      }
                    }}
                    type="checkbox"
                    checked={values.mobile}
                    id={`mobile-status`}
                    className="sr-only"
                  />
                  <div className="block bg-[#D0D0D0] lg:w-12 lg:h-8 w-11 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-black text-opacity-70 lg:text-[16px] text-[14px] satoshi-black">
                  Mobile Service
                </div>
              </label>
            </span>

            <button
              type="submit"
              className="bg-[#D78B30] rounded-xl py-4 w-full text-white uppercase satoshi-bold mt-8"
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const AddServiceCard: React.FC<{ close: () => void; }> = ({ }) => {
  const [serviceImgFile, setServiceImgFile] = useState<any>(null);

  const validationSchema = Yup.object({
    serviceName: Yup.string().required('Service name is required'),
    serviceHours: Yup.string().required('Service hour is required').matches(/^\d+$/, 'Service hour must be a number'),
    serviceMinutes: Yup.string().required('Service minute is required').matches(/^\d+$/, 'Service minute must be a number'),
    serviceType: Yup.string().required('Service type is required'),
    servicePrice: Yup.string().required('Service Price is required').matches(/^\d+$/, 'Price must be a number').min(1, 'Price must be greater than 0'),
    serviceImg: Yup.mixed().required('Service image is required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          serviceName: "",
          serviceHours: "",
          serviceMinutes: "",
          serviceType: "",
          servicePrice: "",
          mobile: false,
          serviceImg: serviceImgFile
        }}
        enableReinitialize // Allow Formik to reinitialize when initialValues change
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (!values.serviceImg) return;
          console.log({ values });
          setSubmitting(true);
          axios.post("/api/salon/add-service-list", values).then(r => {
            setSubmitting(false);
            console.log({ r });
            const formData = new FormData();
            formData.append(`file-0`, values.serviceImg);
            formData.append("type", "service");
            formData.append("serviceId", r.data.data._id);
            axios.post('/api/upload/salon', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then(r => {
              console.log({ r });
              close();
            }).catch(e => { });
          }).catch(e => { });
          console.log('Form submitted with values:', values);
        }}
      >
        {({ isSubmitting, values, setValues }) => (

          <Form className="w-full max-w-lg mx-auto">
            <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mb-8 mt-4">

              {values.serviceImg ?
                <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mt-4">
                  <ImgView onDelete={() => {
                    // if (isNaN(Number(img.id))) {
                    //   // delete from cloud
                    //   removeImgFromCloud("service", img.id).then(r => {
                    //     setCloudBusinessFiles(p => p.filter(o => o.id != img.id));
                    //   });
                    // } else {
                    //   setBusinessFiles(p => p.filter((o, i) => i != img.id));
                    // }
                    setServiceImgFile(null);
                  }} url={URL.createObjectURL(values.serviceImg)} />
                </div>
                : <>
                  <label htmlFor="dropzone-file-extra" className="cursor-pointer border-dashed p-4 rounded-xl min-w-[6rem] min-h-[6rem] text-center border-[#D5CFCF] border">
                    <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12H18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 18V6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>Add</p>
                    <input
                      name="serviceImg"
                      onChange={(e) => setServiceImgFile(e.target.files[0])}
                      id="dropzone-file-extra" type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" />
                  </label>
                </>}
              <ErrorMessage name="serviceImg" component="div" className="text-red-500 text-sm" />
            </div>


            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <div
                  style={{ marginTop: '-0.75rem', paddingLeft: '1rem' }}
                  className="absolute"><span className="bg-white ">Service Name</span></div>
                <Field
                  name="serviceName"
                  type="text"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-900 border rounded-xl py-3 px-4 leading-tight focus:outline-none font-semibold focus:bg-white"
                />
                <ErrorMessage name="serviceName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="relative w-full px-3">
                <Field
                  as="select"
                  name="serviceType"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Service Type</option>
                  <option value="1">Service Type 1</option>
                  <option value="2">Service Type 2</option>
                  <option value="3">Service Type 3</option>
                  <option value="4">Service Type 4</option>
                  <option value="5">Service Type 5</option>
                  <option value="6">Service Type 6</option>
                </Field>
                <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm" />
              </div>
            </div>


            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="relative w-1/2 px-3">
                <Field
                  as="select"
                  name="serviceHours"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Hour (s)</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Field>
                <ErrorMessage name="serviceHours" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="relative w-1/2 px-3">
                <Field
                  as="select"
                  name="serviceMinutes"
                  className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Minutes</option>
                  <option value="15">0</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                </Field>
                <ErrorMessage name="serviceMinutes" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <span
                  style={{ borderRight: '1px solid #D0D0D0', paddingRight: '1rem' }}
                  className="absolute text-[16px] left-6 text-gray-700 top-0 bottom-0 my-auto h-6">
                  Price $
                </span>
                <Field
                  name="servicePrice"
                  type="text"
                  style={{ paddingLeft: '5.7rem' }}
                  className="appearance-none pl-[5.7rem] block w-full border-b h-14 !border-[#E6E5E5] bg-[#E6E5E5] bg-opacity-60 text-gray-900 font-semibold border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <ErrorMessage name="servicePrice" component="div" className="text-red-500 ml-3 text-sm" />
            </div>

            <span className="flex items-center">
              <span className='ml-2'>
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform='rotate(90)'
                  style={{ marginRight: '1rem' }}
                >
                  <path
                    d="M1.08984 14.1016L7.21653 7.97488L1.08984 1.84819"
                    stroke="#9C9C9C"
                    strokeWidth="2.0051"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <label htmlFor={`mobile-status`} className="flex items-center cursor-pointer">

                <div className="relative pl-10">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValues({ ...values, mobile: true });
                      } else {
                        setValues({ ...values, mobile: false });
                      }
                    }}
                    type="checkbox"
                    checked={values.mobile}
                    id={`mobile-status`}
                    className="sr-only"
                  />
                  <div className="block bg-[#D0D0D0] lg:w-12 lg:h-8 w-11 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-black text-opacity-70 lg:text-[16px] text-[14px] satoshi-black">
                  Mobile Service
                </div>
              </label>
            </span>

            <button
              type="submit"
              className="bg-[#D78B30] rounded-xl py-4 w-full text-white uppercase satoshi-bold mt-8"
            >
              ADD
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
