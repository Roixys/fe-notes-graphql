import { gql } from "@apollo/client";

const NOTE_DETAILS = gql`
  fragment NoteDetails on Note {
    id
    title
    body
    created_at
  }
`;

export const ALL_NOTES = gql`
  query {
    allNotes {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

export const FIND_NOTE = gql`
  query findNote($id: ID!) {
    findNote(id: $id) {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

export const ADD_NOTE = gql`
  mutation AddNote($title: String!, $body: String!) {
    addNote(title: $title, body: $body) {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

export const EDIT_NOTE = gql`
  mutation EditNote($id: ID!, $title: String!, $body: String!) {
    editNote(id: $id, title: $title, body: $body) {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;
