import React from "react";
import { Box, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Box pos={"absolute"} top={"50%"} left={"50%"}>
      <Loader color="blue" />
    </Box>
  );
}
