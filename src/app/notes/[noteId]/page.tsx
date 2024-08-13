"use client";
import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Center,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FIND_NOTE } from "@/api/queries";
import { Note } from "@/types";
import { useRouter } from "next/navigation";

interface NoteDetailProps {
  params: {
    noteId: string;
  };
}

const DetailNote = ({ params }: NoteDetailProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const createdAtColor = useColorModeValue("gray.500", "gray.400");

  const { loading, error, data } = useQuery(FIND_NOTE, {
    variables: { id: params.noteId },
  });
  const router = useRouter();

  if (loading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  if (error)
    return (
      <Center>
        <Alert status="error" maxW="container.sm" w="full">
          <AlertIcon />
          {error.message}
        </Alert>
      </Center>
    );

  const note: Note = data.findNote;

  return (
    <Center minH="100vh" bg={bgColor}>
      <Box
        maxW="container.md"
        p={8}
        bg={cardBgColor}
        borderRadius="md"
        shadow="md"
      >
        <Stack spacing={6}>
          <Heading mb={4}>Note Details</Heading>
          <Stack spacing={4} p={4} bg={bgColor} borderRadius="md">
            <Text fontSize="md" fontWeight="bold">
              ID:
            </Text>
            <Text fontSize="lg" color={textColor}>
              {note.id}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Title:
            </Text>
            <Heading fontSize="xl" color="teal.600">
              {note.title}
            </Heading>
            <Text fontSize="md" fontWeight="bold">
              Body:
            </Text>
            <Text fontSize="lg" color={textColor}>
              {note.body}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Created At:
            </Text>
            <Text fontSize="lg" color={createdAtColor}>
              {new Date(note.created_at).toLocaleDateString()}{" "}
              {new Date(note.created_at).toLocaleTimeString()}
            </Text>
          </Stack>
          <Button colorScheme="teal" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default DetailNote;
