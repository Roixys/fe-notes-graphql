"use client";
import NoteList from "../components/NoteList";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import AddNoteModal from "@/components/AddNoteModal";
import { ALL_NOTES } from "@/api/queries";
import {
  Container,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";

export default function Home() {
  const { loading, error, data } = useQuery(ALL_NOTES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );

  return (
    <Container maxW="container.md" p={8}>
      <Heading mb={6}>Ahmadhi Notes</Heading>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)} mb={6}>
        Add Note
      </Button>
      <NoteList notes={data.allNotes} />
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}
