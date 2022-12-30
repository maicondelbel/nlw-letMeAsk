import {
  RoomContainer,
  MainContainer,
  TitleContainer,
  QuestionContainer,
  EmptyContainer,
  StyledModal,
  ModalWrapper,
} from './styles'

import { CopyRoomCode } from '../../components/CopyRoomCode'

import { Loading } from '../../components/Loading'

import EmptyQuestions from '../../assets/empty-questions.svg'
import { Question } from '../../components/Question'
import { useRoom } from '../../hooks/useRoom'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { ActionsButtons } from '../../components/ActionsButton'
import { ref, remove, update } from 'firebase/database'
import { database } from '../../services/firebase'
import { Header } from '../../components/Header'
import { useState } from 'react'
import { Trash, XCircle } from 'phosphor-react'
import { Badget } from '../../components/Badget'
import { ClosedTitleContainer } from '../Room/styles'
import { ModalProvider } from 'styled-react-modal'
import { ModalBackground } from '../../styles/modal'

export function AdminRoom() {
  const { id: roomId } = useParams()
  const { room, isLoading, isClosed, isAdmin } = useRoom(roomId)
  const [isModalCloseRoomOpen, setIsModalCloseRoomOpen] = useState(false)
  const [isModalDeleteQuestionOpen, setIsModalDeleteQuestionOpen] = useState({
    isOpen: false,
    target: '',
  })
  const navigate = useNavigate()

  function toggleModalCloseRoom() {
    setIsModalCloseRoomOpen(!isModalCloseRoomOpen)
  }

  function toggleModalDeleteQuestion(target?: string) {
    setIsModalDeleteQuestionOpen({
      isOpen: !isModalDeleteQuestionOpen.isOpen,
      target: target || '',
    })
  }

  async function handleCloseRoom(roomId: string | undefined) {
    const roomRef = ref(database, `rooms/${roomId}`)
    await update(roomRef, { closedAt: new Date() })

    toggleModalCloseRoom()
  }

  async function handleDeleteQuestion() {
    const questionId = isModalDeleteQuestionOpen.target

    const roomRef = ref(database, `rooms/${roomId}/questions/${questionId}`)
    await remove(roomRef)

    toggleModalDeleteQuestion()
  }

  async function handleMarkQuestionAsAnswered(questionId: string) {
    const roomRef = ref(database, `rooms/${roomId}/questions/${questionId}`)

    await update(roomRef, { isAnswered: true })
  }

  async function handleMarkQuestionAsHighlighted(questionId: string) {
    const roomRef = ref(database, `rooms/${roomId}/questions/${questionId}`)

    await update(roomRef, { isHighlighted: true })
  }

  function handleGoHome() {
    navigate('/')
  }

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <RoomContainer>
        <Header>
          {!isLoading && !isClosed && isAdmin && (
            <>
              <CopyRoomCode roomCode={roomId} />
              <Button
                variant="outline"
                size="medium"
                onClick={() => {
                  toggleModalCloseRoom()
                }}
              >
                Encerrar
              </Button>
            </>
          )}
        </Header>
        <MainContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {!room.roomName ? (
                <ClosedTitleContainer>
                  <h2>
                    Esta sala não existe. <br />
                    Verifique o código e tente novamente
                  </h2>
                  <Button onClick={handleGoHome}>Voltar para Home</Button>
                </ClosedTitleContainer>
              ) : (
                <>
                  {!isAdmin ? (
                    <ClosedTitleContainer>
                      <h2>Você não tem permissão para acessar essa sala.</h2>
                      <Button onClick={handleGoHome}>Criar minha sala</Button>
                    </ClosedTitleContainer>
                  ) : (
                    <>
                      <TitleContainer>
                        <h1>Sala: {room.roomName}</h1>
                        {room.questions.length > 0 && (
                          <>
                            <Badget>
                              {room.questions.length === 1
                                ? `${room.questions.length} pergunta`
                                : `${room.questions.length} perguntas`}
                            </Badget>
                            {isClosed && (
                              <Badget variant="danger">Sala encerrada</Badget>
                            )}
                          </>
                        )}
                      </TitleContainer>
                      <QuestionContainer>
                        {room.questions.length === 0 ? (
                          <EmptyContainer>
                            <img src={EmptyQuestions} alt="" />
                            <h2>Nenhuma pergunta por aqui...</h2>
                            <p>
                              Envie o código desta sala para seus amigos e
                              comece a responder perguntas!
                            </p>
                          </EmptyContainer>
                        ) : (
                          room.questions.map((question) => {
                            return (
                              <Question
                                isHighlighted={question.isHighlighted}
                                isAnswered={
                                  question.isAnswered || !!room.closedAt
                                }
                                key={question.id}
                                author={question.author}
                                content={question.content}
                              >
                                <ActionsButtons
                                  action="answer"
                                  active={question.isAnswered}
                                  disabled={!!room.closedAt}
                                  onClick={() => {
                                    handleMarkQuestionAsAnswered(question.id)
                                  }}
                                />
                                <ActionsButtons
                                  action="highlight"
                                  active={question.isHighlighted}
                                  disabled={!!room.closedAt}
                                  onClick={() => {
                                    handleMarkQuestionAsHighlighted(question.id)
                                  }}
                                />
                                <ActionsButtons
                                  action="delete"
                                  disabled={!!room.closedAt}
                                  onClick={() => {
                                    // handleDeleteQuestion(question.id)
                                    toggleModalDeleteQuestion(question.id)
                                  }}
                                />
                              </Question>
                            )
                          })
                        )}
                      </QuestionContainer>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </MainContainer>
        <StyledModal
          isOpen={isModalCloseRoomOpen}
          onBackgroundClick={() => toggleModalCloseRoom()}
          onEscapeKeydown={() => toggleModalCloseRoom()}
        >
          <ModalWrapper>
            <XCircle />
            <h2>Encerrar sala</h2>
            <p>Tem certeza que você deseja encerrar esta sala?</p>
            <div>
              <Button variant="cancel" onClick={toggleModalCloseRoom}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => handleCloseRoom(roomId)}>
                Sim, encerrar
              </Button>
            </div>
          </ModalWrapper>
        </StyledModal>
        <StyledModal
          isOpen={isModalDeleteQuestionOpen.isOpen}
          onBackgroundClick={() => toggleModalDeleteQuestion()}
          onEscapeKeydown={() => toggleModalDeleteQuestion()}
        >
          <ModalWrapper>
            <Trash />
            <h2>Excluir pergunta</h2>
            <p>Tem certeza que você deseja excluir esta pergunta?</p>
            <div>
              <Button
                variant="cancel"
                onClick={() => toggleModalDeleteQuestion()}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteQuestion()
                }}
              >
                Sim, encerrar
              </Button>
            </div>
          </ModalWrapper>
        </StyledModal>
      </RoomContainer>
    </ModalProvider>
  )
}
