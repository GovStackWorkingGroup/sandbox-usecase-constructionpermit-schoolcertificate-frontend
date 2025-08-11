import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { RPCContext } from "../rpc/rpc";

export default function SessionInUse () {
  const { isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef(null);
  const rpc = useContext(RPCContext);

  const handleLogin = () => {
    if (isOpen) {
      onClose();
    }
    else onOpen();
  }

  return (
    <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay />
      <AlertDialogContent width="80%" background={"white"}>
        <AlertDialogHeader>Another device in use</AlertDialogHeader>
        <AlertDialogBody>
          Signing in will remove an active session from another device. <br/>
          <b>You will lose all unsaved progress!</b><br/><br/>
          Do you still want to sign in?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='admin' ml={3} onClick={() => handleLogin()}>
            Sign in
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
