const useValidateImageFile = (file) => {

  let error = ''
  const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']

  if (file.size > 1048576) {
    error = "Resim boyutu 1MB'tan küçük olmalıdır!"
    return error
  }

  if (!allowedFileTypes.includes(file.type)) {
    error = "Sadece JPG, JPEG ve PNG türünde dosya yükleyebilirsiniz!"
    return error
  }

  return null
}

export default useValidateImageFile