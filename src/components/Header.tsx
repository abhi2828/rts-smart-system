const Header = () => {
  return (
    <>
      <div className='tw-relative tw-h-[6rem]'>
        <div className='tw-absolute tw-left-0 tw-top-0 '>
          <img
            className='tw-block tw-h-[6rem] tw-w-[15vw] tw-rounded-xl'
            src='/assets/images/photo_2023-08-14_21-58-16.jpg'
            alt='rts-logo'
          />
        </div>
        {/* <div className='tw-absolute tw-right-5 tw-top-0'>
          <img
            src='/assets/images/photo_2023-08-14_23-28-04.jpg'
            alt='profile-alt'
            width='150'
            height='150'
          />
        </div> */}
      </div>
    </>
  );
};
export default Header;
