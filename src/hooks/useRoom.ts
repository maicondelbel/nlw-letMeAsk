import { off, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

interface IFirebaseQuestions {
  [x: string]: {
    author: {
      name: string
      avatarUrl: string
    }
    content: string
    isHighlighted: boolean
    isAnswered: boolean
    likes: {
      [x: string]: {
        authorId: string
      }
    }
  }
}

interface IQuestions {
  id: string
  author: {
    name: string
    avatarUrl: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
  likeCount: number
  likeId: string | undefined
}

interface IRoom {
  roomName: string | undefined
  questions: IQuestions[]
  closedAt?: Date
}

export function useRoom(roomId: string | undefined) {
  const { user } = useAuth()
  const [room, setRoom] = useState<IRoom>({
    roomName: undefined,
    questions: [],
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const roomRef = ref(database, `rooms/${roomId}`)

    onValue(roomRef, (snapshot) => {
      const firebaseRoom = snapshot.val()

      if (!firebaseRoom) {
        setIsLoading(false)
        setRoom({
          roomName: undefined,
          questions: [],
        })
        return
      }

      if (firebaseRoom.closedAt) {
        setIsClosed(true)
      }

      if (firebaseRoom.authorId === user?.id) {
        setIsAdmin(true)
      }

      const firebaseQuestions: IFirebaseQuestions = firebaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, value]) => value.authorId === user?.id,
            )?.[0],
          }
        },
      )

      setRoom({
        roomName: firebaseRoom.title,
        questions: parsedQuestions,
        closedAt: firebaseRoom.closedAt,
      })

      setIsLoading(false)

      return () => {
        off(roomRef)
      }
    })
  }, [roomId, user?.id])

  return { room, isLoading, isClosed, isAdmin }
}
