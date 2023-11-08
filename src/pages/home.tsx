import axios from "axios";

const Home = () => {
  async function fetchData() {
    try {
      const requestData = { Grant_type: 'password' };
      const token = 'a20f0890-68b8-46ff-94c7-536ab2e40d07:kAIc3sHjA8dP8Q5UfzbPH1CvcNMg7v';
      const customKey = 'D2nGfZbPDVjlvJVK3gRyxZ11EiY2PZRGkLBwyHCEs5MUdLddlWaiokReJXGLJT/kGcz1DzR5L1Fv0bRgnJQ4QQ==';
  
      const headers = {
        Authorization: `Bearer ${token}`,
        customkey: customKey,
      };
  
      const response = await axios.post('https://stgmalhrmsgateway.azurewebsites.net/Authenticate', requestData, {
        headers: headers,
      });
  
      const data = response.data;
  
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  
  fetchData();
  return (
    <section className=''>
      <div className='tw-relative tw-min-h-[15vh]'>
        <div className='tw-absolute tw-left-[50%] tw-top-[20%] tw-w-[25vw] -tw-translate-x-2/4 tw-rounded-xl tw-bg-white'>
          <div>
            <img
              className='tw-block  tw-h-[20vh] tw-w-[25vw] tw-rounded-xl'
              src='/assets/images/photo_2023-08-14_21-58-16.jpg'
              alt='rts-logo'
            />
          </div>
        </div>
      </div>
      <div className='tw-flex tw-min-h-[85vh] tw-flex-wrap tw-justify-center tw-gap-10 tw-bg-[#F4F4F4] tw-px-[20vw] tw-pt-36'>
        <span
          onClick={() => {
            window.location.href = '/eprocurement';
          }}
          className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center tw-rounded-xl tw-cursor-pointer tw-bg-[#211061] tw-p-16 tw-text-2xl tw-font-bold tw-text-white'
        >
          E-PROCUREMENT
        </span>
        <span
         onClick={() => {
          window.location.href = '/hr_to_sap_b1';
        }}
        className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center tw-rounded-xl  tw-cursor-pointer tw-bg-[#211061] tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          HR TO SAP-B1
        </span>
        <span className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center tw-rounded-xl  tw-bg-gray-700  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          EMPLOYEE MASTER & COMPETENCE
        </span>
        <span
          onClick={() => {
            window.location.href = '/cmms';
          }}
          className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center  tw-rounded-xl tw-cursor-pointer tw-bg-[#211061] tw-p-16 tw-text-2xl tw-font-bold tw-text-white'
        >
          ASSET MASTER
        </span>
        <span
          onClick={() => {
            window.location.href = '/inventory';
          }}
          className='tw-flex tw-max-h-[10rem] tw-w-[22rem]  tw-items-center tw-justify-center  tw-rounded-xl tw-cursor-pointer tw-bg-[#211061]  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'
        >
          INVENTORY MANAGEMENT
        </span>
        <span className='tw-flex tw-max-h-[10rem] tw-w-[22rem]  tw-items-center tw-justify-center tw-rounded-xl tw-bg-gray-700  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          WPC FLAT FILES
        </span>
        <span className='tw-flex tw-max-h-[10rem] tw-w-[22rem]  tw-items-center tw-justify-center tw-rounded-xl tw-bg-gray-700  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          SYSTEM SETTINGS
        </span>
        <span className='tw-flex tw-max-h-[10rem] tw-w-[22rem]  tw-items-center tw-justify-center tw-rounded-xl tw-bg-gray-700 tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          SYSTEM USER
        </span>
        <span className='tw-flex tw-max-h-[10rem] tw-w-[22rem]  tw-items-center tw-justify-center tw-rounded-xl tw-bg-gray-700  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          KNOWLEDGE CENTER
        </span>
      </div>
    </section>
  );
};

export default Home;
