const makeFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  return formData;
};

export default makeFormData;
