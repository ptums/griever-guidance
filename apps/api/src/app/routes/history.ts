import { FastifyInstance } from 'fastify';
import type { SendEvent } from '@griever/shared';

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Params: { userId: string } }>(
    '/history/:userId',
    async (): Promise<SendEvent[]> => {
      return [];
    }
  );
}
