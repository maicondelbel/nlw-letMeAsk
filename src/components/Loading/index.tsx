import { CircleNotch } from 'phosphor-react'
import { useTheme } from 'styled-components'

export function Loading() {
  const theme = useTheme()

  return (
    <CircleNotch size={32} color={theme['--purple']}>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="1s"
        from="0 0 0"
        to="360 0 0"
        repeatCount="indefinite"
      ></animateTransform>
    </CircleNotch>
  )
}
