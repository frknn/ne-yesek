import { CloseIcon } from '@chakra-ui/icons';
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const CloseButton = ({ mb }) => {
  return (
    <Box mb={mb || 8}>
      <Link href="/">
        <ChakraLink
          fontSize={["1.25rem", "1.5rem", "1.75rem"]}
          fontWeight="semibold"
        >
          <CloseIcon mb={2} mr={2} />
          KAPAT
        </ChakraLink>
      </Link>
    </Box>
  );
}

export default CloseButton;