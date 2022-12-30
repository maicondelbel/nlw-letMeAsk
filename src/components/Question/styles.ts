import styled, { css } from 'styled-components'

interface IQuestionContainer {
  isHighlighted?: boolean
  isAnswered?: boolean
}

export const QuestionContainer = styled.article<IQuestionContainer>`
  background-color: ${(props) => props.theme['--white-details']};
  border-radius: 8px;
  padding: 1.5rem;
  user-select: none;

  span {
    line-height: 1.5rem;
  }

  ${(props) => {
    if (props.isHighlighted && !props.isAnswered) {
      return css`
        background-color: #f4f0ff;
      `
    } else if (props.isAnswered) {
      return css`
        opacity: 0.6;
        background-color: #dbdcdd;
      `
    } else {
      return css`
        background-color: none;
      `
    }
  }}
`
export const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`

export const ActionsButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
