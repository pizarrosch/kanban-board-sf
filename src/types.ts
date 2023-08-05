export const Columns = ['backlog', 'ready', 'progress', 'finished'] as const;

export type ColumnType = typeof Columns[number];

export type TicketType = {
    title: string;
    description: string;
    type: ColumnType;
}