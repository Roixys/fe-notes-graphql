"use client";
import { useMutation } from "@apollo/client";
import { ALL_NOTES, DELETE_NOTE } from "@/api/queries";
import { Note } from "@/types";
import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import EditNoteModal from "./EditNoteModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useRouter } from "next/navigation";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: ALL_NOTES }],
  });

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (selectedNote) {
      await deleteNote({
        variables: { id: selectedNote.id },
      });
      setSelectedNote(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (note: Note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  };

  const handleNoteClick = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const cardBg = useColorModeValue("gray.100", "gray.700");
  const cardHoverBg = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.300");

  if (notes.length === 0) {
    return (
      <Text textAlign="center" color="gray.500">
        Empty notes
      </Text>
    );
  }

  return (
    <>
      <VStack spacing={6} align="stretch">
        {notes.map((note) => (
          <Box
            key={note.id}
            p={6}
            shadow="lg"
            borderWidth="1px"
            borderRadius="md"
            bg={cardBg}
            _hover={{ bgColor: cardHoverBg }}
            transition="background-color 0.2s ease-in-out"
            cursor="pointer"
          >
            <Stack spacing={4}>
              <Heading fontSize="2xl" color={textColor}>
                {note.title}
              </Heading>
              <Text color="gray.500" fontSize="sm">
                {`Created at: ${new Date(
                  note.created_at
                ).toLocaleDateString()}`}
              </Text>
              <Text mt={2} color={textColor}>
                {note.body}
              </Text>
              <Stack direction="row" spacing={4} mt={4}>
                <Button
                  colorScheme="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(note);
                  }}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(note);
                  }}
                >
                  Delete
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => handleNoteClick(note.id)}
                >
                  View Details
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </VStack>
      {selectedNote && (
        <>
          <EditNoteModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            note={selectedNote}
          />
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        </>
      )}
    </>
  );
}
