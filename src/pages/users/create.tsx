import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { api } from '../../services/api'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { queryClient } from '../../services/queryClient'

const createUserFormSchema = zod
  .object({
    name: zod.string().min(1, 'Nome obrigatório!!'),
    email: zod.string().min(1, 'E-mail obrigatório!!').email('E-mail inválido'),
    password: zod.string().min(6, 'No mínimo 6 caracteres'),
    password_confirmation: zod.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas precisam ser iguais',
    path: ['password_confirmation'],
  })

type CreateUserFormData = zod.infer<typeof createUserFormSchema>

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })

      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users', 1])
      },
    },
  )

  const createUserForm = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = createUserForm

  async function handleCreateUser(data: CreateUserFormData) {
    await createUser.mutateAsync(data)
    router.push('/users')
    reset()
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          rounded="8"
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
