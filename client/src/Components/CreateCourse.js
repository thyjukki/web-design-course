import React from "react"
import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import styled from "styled-components"

const CREATE_COURSE_MUTATION = gql`
  mutation Mutation(
    $code: String!
    $name: String!
    $credits: Int!
    $description: String
  ) {
    createCourse(
      code: $code
      name: $name
      credits: $credits
      description: $description
    ) {
      code
      description
      name
      credits
    }
  }
`

export const CreateCourse = () => {
  const [formState, setFormState] = useState({
    code: "",
    name: "",
    description: "",
    credits: 0
  })

  const [createLink, { loading, error, data }] = useMutation(
    CREATE_COURSE_MUTATION,
    {
      variables: {
        code: formState.code,
        name: formState.name,
        description: formState.description,
        credits: formState.credits
      }
    }
  )
  error && console.error(JSON.stringify(error, null, 2))

  return (
    <CreateCourseContainer>
      {error && <Error>{error.message}</Error>}
      {loading && <p>Ladataan...</p>}
      {data ? (
        <H2>Kurssi luotu!</H2>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createLink()
          }}
        >
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={formState.code}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  code: e.target.value
                })
              }
              type="text"
              placeholder="Course code"
            />
            <input
              className="mb2"
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value
                })
              }
              type="text"
              placeholder="Course name"
            />
            <input
              className="mb2"
              value={formState.description}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  description: e.target.value
                })
              }
              type="text"
              placeholder="Course description"
            />

            <input
              className="mb2"
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              value={formState.credits}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  credits: parseInt(e.target.value)
                })
              }
              type="text"
              placeholder="Course credits"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </CreateCourseContainer>
  )
}

const CreateCourseContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const H2 = styled.h2`
  text-align: center;
`

const Error = styled.p`
  color: red;
`
