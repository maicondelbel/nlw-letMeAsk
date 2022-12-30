import { Link, useNavigate, useParams } from 'react-router-dom'
import { push, ref, remove } from 'firebase/database'
import { toast } from 'react-hot-toast'
import {
  RoomContainer,
  MainContainer,
  TitleContainer,
  FormContainer,
  FormFooter,
  QuestionContainer,
  EmptyContainer,
  ClosedTitleContainer,
} from './styles'

import { CopyRoomCode } from '../../components/CopyRoomCode'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Avatar } from './../../components/Avatar/index'
import { useAuth } from './../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { database } from '../../services/firebase'
import { Loading } from '../../components/Loading'
import { Question } from '../../components/Question'
import { useRoom } from './../../hooks/useRoom'
import { LikeButton } from '../../components/LikeButton/index'
import { Header } from '../../components/Header'
import EmptyQuestions from '../../assets/empty-questions.svg'

interface IFormData {
  question: string
}

export function Room() {
  const { id: roomId } = useParams()
  const navigate = useNavigate()
  const { room, isLoading, isClosed } = useRoom(roomId)
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  async function formSubmit(data: IFormData) {
    try {
      if (!user) {
        throw new Error()
      }

      const question = {
        content: data.question,
        author: {
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
        isHighlighted: false,
        isAnswered: false,
      }

      const roomRef = ref(database, `rooms/${roomId}/questions`)

      await push(roomRef, question)

      reset()
    } catch (error) {
      console.log(error)
      reset()
      toast.error('Erro ao criar uma pergunta')
    }
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined,
  ) {
    if (likeId) {
      const roomRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes/${likeId}`,
      )

      await remove(roomRef)
    } else {
      const roomRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes`,
      )

      await push(roomRef, { authorId: user?.id })
    }
  }

  function handleGoHome() {
    navigate('/')
  }

  return (
    <RoomContainer>
      <Header>
        {!isLoading && !isClosed && room.roomName && (
          <CopyRoomCode roomCode={roomId} />
        )}
      </Header>
      <MainContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isClosed ? (
              <ClosedTitleContainer>
                <h2>Esta sala foi encerrada pelo administrador.</h2>
                <Button onClick={handleGoHome}>Voltar para Home</Button>
              </ClosedTitleContainer>
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
                    <TitleContainer>
                      <h1>Sala: {room.roomName}</h1>
                      {room.questions.length > 0 && (
                        <span>
                          {room.questions.length === 1
                            ? `${room.questions.length} pergunta`
                            : `${room.questions.length} perguntas`}
                        </span>
                      )}
                    </TitleContainer>
                    <FormContainer onSubmit={handleSubmit(formSubmit)}>
                      <TextArea
                        placeholder={
                          errors.question
                            ? 'Digite sua dúvida'
                            : 'O que você quer perguntar?'
                        }
                        {...register('question', {
                          required: true,
                        })}
                        hasError={!!errors.question}
                        readOnly={!user}
                      />
                      <FormFooter>
                        {user ? (
                          <Avatar avatarUrl={user.avatarUrl} name={user.name} />
                        ) : (
                          <span>
                            Para enviar uma pergunta,
                            <Link to={'/'}>faça seu login.</Link>
                          </span>
                        )}
                        <Button disabled={!user}>Enviar pergunta</Button>
                      </FormFooter>
                    </FormContainer>

                    <QuestionContainer>
                      {room.questions.length === 0 ? (
                        <EmptyContainer>
                          <img
                            src={EmptyQuestions}
                            alt="Nenhuma pergunta por aqui..."
                          />
                          <h2>Nenhuma pergunta por aqui...</h2>
                          {user ? (
                            <p>Seja a primeira pessoa a fazer uma pergunta!</p>
                          ) : (
                            <p>
                              Faça o seu login e seja a primeira pessoa a fazer
                              uma pergunta!
                            </p>
                          )}
                        </EmptyContainer>
                      ) : (
                        room.questions.map((question) => {
                          return (
                            <Question
                              isAnswered={!!question.isAnswered}
                              isHighlighted={!!question.isHighlighted}
                              key={question.id}
                              author={question.author}
                              content={question.content}
                            >
                              <LikeButton
                                disabled={question.isAnswered || !user}
                                hasLiked={question.likeId}
                                count={question.likeCount}
                                onClick={() => {
                                  handleLikeQuestion(
                                    question.id,
                                    question.likeId,
                                  )
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
    </RoomContainer>
  )
}
