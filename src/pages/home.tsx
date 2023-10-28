const Home = () => {
  return (
    <section className=''>
      <div className='tw-relative tw-min-h-[15vh]'>
        <div className='tw-absolute tw-right-5 tw-top-5'>
          <img
            src='/assets/images/photo_2023-08-14_23-28-04.jpg'
            alt='profile-alt'
            width='200'
            height='200'
          />
        </div>
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
          className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#211061] tw-p-16 tw-text-2xl tw-font-bold tw-text-white'
        >
          E-PROCUREMENT
        </span>
        <span className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center tw-rounded-xl  tw-bg-gray-700 tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          HR TO SAP-B1
        </span>
        <span className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center tw-rounded-xl  tw-bg-gray-700  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'>
          EMPLOYEE MASTER & COMPETENCE
        </span>
        <span
          onClick={() => {
            window.location.href = '/cmms';
          }}
          className=' tw-flex tw-max-h-[10rem] tw-w-[22rem] tw-items-center tw-justify-center  tw-rounded-xl tw-bg-[#211061] tw-p-16 tw-text-2xl tw-font-bold tw-text-white'
        >
          ASSET MASTER
        </span>
        <span
          onClick={() => {
            window.location.href = '/inventory';
          }}
          className='tw-flex tw-max-h-[10rem] tw-w-[22rem]  tw-items-center tw-justify-center  tw-rounded-xl tw-bg-[#211061]  tw-p-16 tw-text-2xl tw-font-bold tw-text-white'
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
