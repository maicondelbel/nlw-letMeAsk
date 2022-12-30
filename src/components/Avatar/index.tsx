import { AvatarContainer } from './styles'

interface IAvatarProps {
  avatarUrl: string
  name: string
}

export function Avatar({ avatarUrl, name }: IAvatarProps) {
  return (
    <AvatarContainer>
      <img src={avatarUrl} alt={name} />
      <span>{name}</span>
    </AvatarContainer>
  )
}
