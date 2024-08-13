import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE, ALL_NOTES } from "@/api/queries";
import {
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNoteModal({ isOpen, onClose }: AddNoteModalProps) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [addNote] = useMutation(ADD_NOTE, {
    refetchQueries: [{ query: ALL_NOTES }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNote({
      variables: { title, body },
    });
    setTitle("");
    setBody("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Body</FormLabel>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Body"
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" size="md">
                Add Note
              </Button>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
