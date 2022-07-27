import { Text } from '@chakra-ui/react'

export function Logo() {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontFamily="Ubuntu"
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      dashgo
      <Text as="span" ml="1" color="blue.500">
        .
      </Text>
    </Text>
  )
}
