import { serve } from 'inngest/next'
import {inngest} from '../../../inngest/client'
import { syncUserCreation, syncUserUpdation, syncUserDeletion } from '@/inngest/functions'

export const {GET, POST, PUT} = server({
    client: inngest,
    functions: [syncUserCreation, syncUserUpdation, syncUserDeletion]
})