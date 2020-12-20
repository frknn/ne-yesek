import { Center, CircularProgress } from "@chakra-ui/react";

const LoadingSpinner = ({ size, m, color }) => {
  return (
    <Center
      m={m || 20}
    >
      <CircularProgress
        isIndeterminate
        color={color || "lightRed"}
        size={size || ["125px", "175px", "225px", "275px"]}
      />
    </Center>
  );
}

export default LoadingSpinner;