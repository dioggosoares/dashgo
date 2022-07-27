import { Button, Flex, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Input } from '../components/Form/Input'

const signInFormSchema = zod.object({
  email: zod.string().min(1, 'E-mail obrigatório!!').email('E-mail inválido'),
  password: zod.string().min(1, 'Senha obrigatória'),
})

type SignInFormData = zod.infer<typeof signInFormSchema>

export default function SignIn() {
  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = signInForm

  async function handleSignIn(data: SignInFormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    reset()
  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            label="Password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
