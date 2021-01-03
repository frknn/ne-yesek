import { useRef } from 'react'
import { Box, Input, Button } from "@chakra-ui/react";

const UploadButton = ({handleImageUpload, text, icon, isImageLoading}) => {

  const fileInputEl = useRef()

  return (
    <Box>
      <Input
        type="file"
        accept="image/*"
        display="none"
        ref={fileInputEl}
        onChange={handleImageUpload}
      />
      <Button
        variant="outline"
        leftIcon={icon}
        isLoading={isImageLoading}
        loadingText="Yükleniyor..."
        onClick={() => fileInputEl.current.click()}
        borderColor="darkRed"
        color="darkRed"
        _hover={{ bgColor: 'darkRed', color: 'lightGray' }}
      >
        {text}
      </Button>
    </Box>
  );
}

export default UploadButton;