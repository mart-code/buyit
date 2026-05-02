import { serve } from 'inngest/next'
import {innjest} from '../../../inngest/client'
import { syncUserCreation, syncUserUpdation, syncUserDeletion } from '@/inngest/functions'

export const {GET, POST, PUT} = server({
    client: innjest,
    functions: [syncUserCreation, syncUserUpdation, syncUserDeletion]
})