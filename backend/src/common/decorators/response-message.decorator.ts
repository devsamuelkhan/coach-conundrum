import { SetMetadata } from '@nestjs/common'

export const responseMessage = (message: string) =>
  SetMetadata('response_message', message)
