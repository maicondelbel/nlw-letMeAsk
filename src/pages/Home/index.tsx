import {
  LoginWrapper,
  MainContainer,
  SectionContainer,
  Separator,
  WrapperContainer,
} from './styles'

import { SignIn } from 'phosphor-react'

import HomeIllustration from '../../assets/illustration.svg'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { GoogleIcon } from '../../components/GoogleIcon'
import { Input } from '../../components/Input'

import { useNavigate } from 'react-router-dom'

import { useAuth } from './../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { get, ref } from 'firebase/database'
import { database } from '../../services/firebase'
import toast, { Toaster } from 'react-hot-toast'

interface IFormData {
  roomCode: string
}

export function Home() {
  const navigate = useNavigate()
  const { signInWithGoogle, user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  async function formSubmit(data: IFormData) {
    try {
      const roomRef = await get(ref(database, `rooms/${data.roomCode}`))

      if (!roomRef.exists()) {
        toast.error('Sala não encontrada')
        throw new Error('Room does not exists')
      }

      if (roomRef.val().closedAt) {
        toast.error('Sala já encerrada')
        throw new Error('Room already closed')
      }

      navigate(`/rooms/${data.roomCode}`)
    } catch (error) {
      console.log(error)
      reset()
    }
  }

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle()
    }
    navigate('/rooms/new')
  }

  return (
    <WrapperContainer>
      <SectionContainer>
        <div>
          <img
            src={HomeIllustration}
            alt="Ilustração de simboliza perguntas e respostas"
          />
          <h1>Toda pergunta tem uma resposta.</h1>
          <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
        </div>
      </SectionContainer>
      <MainContainer>
        <LoginWrapper>
          <img src={Logo} alt="Logo da plataforma LetMeAsk" />
          <Button variant="login" size="large" onClick={handleSignIn}>
            <GoogleIcon />
            Crie sua sala com o Google
          </Button>
          <Separator>ou entre em uma sala</Separator>
          <form onSubmit={handleSubmit(formSubmit)}>
            <Input
              placeholder="Digite o código da sala"
              {...register('roomCode', {
                required: true,
              })}
              hasError={!!errors.roomCode}
            />
            <Button variant="primary" size="large" type="submit">
              <SignIn />
              Entrar na sala
            </Button>
          </form>
        </LoginWrapper>
      </MainContainer>
      <Toaster position="top-right" reverseOrder={false} />
    </WrapperContainer>
  )
}
