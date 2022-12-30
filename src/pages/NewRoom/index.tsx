import { LoginWrapper, MainContainer, SectionContainer } from './styles'

import HomeIllustration from '../../assets/illustration.svg'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from './../../hooks/useAuth'
import { Loading } from '../../components/Loading'
import { GoogleIcon } from '../../components/GoogleIcon'
import { useForm } from 'react-hook-form'
import { database } from '../../services/firebase'
import { push, ref } from 'firebase/database'
import { WrapperContainer } from '../Home/styles'
import toast from 'react-hot-toast'

interface IFormData {
  roomName: string
}

export function NewRoom() {
  const navigate = useNavigate()
  const { signOutGoogle, signInWithGoogle, user, isLoading } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  async function formSubmit(data: IFormData) {
    try {
      const roomRef = ref(database, 'rooms')

      const firebaseRoom = await push(roomRef, {
        title: data.roomName,
        authorId: user?.id,
      })

      navigate(`/admin/rooms/${firebaseRoom.key}`)
    } catch (error) {
      console.log(error)
      reset()
      toast.error('Erro ao criar a sala')
    }
  }

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle()
    }
  }

  async function handleSignOut() {
    await signOutGoogle()
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
          <h2>Crie uma nova sala</h2>
          {isLoading ? (
            <Loading />
          ) : user ? (
            <>
              <span>
                Você está criando como <strong>{user?.name}</strong>.
                <a onClick={handleSignOut}>Sair?</a>
              </span>
              <form onSubmit={handleSubmit(formSubmit)}>
                <Input
                  placeholder={
                    errors.roomName
                      ? 'Digite um nome para a sala'
                      : 'Nome da sala'
                  }
                  {...register('roomName', {
                    required: true,
                  })}
                  hasError={!!errors.roomName}
                />
                <Button variant="primary" size="large" type="submit">
                  Criar sala
                </Button>
                <span>
                  Quer entrar em uma sala já existente?
                  <Link to={'/'}>Clique aqui</Link>
                </span>
              </form>
            </>
          ) : (
            <>
              <Button variant="login" size="large" onClick={handleSignIn}>
                <GoogleIcon />
                Crie sua sala com o Google
              </Button>
              <span>
                Quer entrar em uma sala já existente?
                <Link to={'/'}>Clique aqui</Link>
              </span>
            </>
          )}
        </LoginWrapper>
      </MainContainer>
    </WrapperContainer>
  )
}
