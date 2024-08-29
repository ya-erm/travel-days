import { db } from '$lib/server';

export type PostManyJournalRequestData = {
  items: {
    order: number;
    encryption: string;
    data: string;
  }[];
};

export async function postManyJournal(data: PostManyJournalRequestData, uuid: string) {
  // TODO: check if order is already used (already catched by db, but returns 500)

  await db.journal.createMany({
    data: data.items.map((item) => ({
      userId: uuid,
      order: item.order,
      encryption: item.encryption,
      data: item.data,
    })),
  });

  const syncNumber = await db.journal.aggregate({
    _max: { order: true },
    where: { userId: uuid },
  });

  return { syncNumber: syncNumber._max.order };
}

export type PostManyJournalResponseData = Awaited<ReturnType<typeof postManyJournal>>;
