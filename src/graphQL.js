import { gql } from "apollo-boost";

export const GET_TESTDATA = gql`
  {
    getTestData {
      test
    }
  }
`;


export const CREATE_TESTDATA = gql`
  mutation ($test: String) {
    createTestData(input: { test: $test }) {
      test
    }
  }
`;
