import { Copy } from 'phosphor-react'
import { toast } from 'react-hot-toast'
import { RoomButton } from './styles'

interface ICopyRoomCode {
  roomCode: string | undefined
}

export function CopyRoomCode({ roomCode }: ICopyRoomCode) {
  function handleCopyRoomCodeToClipboard() {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode)
      toast.success('Código copiado')
    }
  }

  return (
    <>
      <RoomButton>
        <button
          onClick={handleCopyRoomCodeToClipboard}
          aria-label="Copiar código para área de transferência"
        >
          <Copy size={20} />
        </button>
        <div>Sala: # {roomCode}</div>
      </RoomButton>
    </>
  )
}
