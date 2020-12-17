import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useState, useEffect } from "react";
import ShareForm from "../components/share-form/ShareForm";
import { CurrentUserContext } from "../context/currentUserContext";

const share = () => {

  return <ShareForm/>
}

export default share;