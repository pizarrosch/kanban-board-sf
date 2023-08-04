import {MouseEventHandler} from "react";

export type ShowMenuType = {
    showMenu: boolean,
    onClick: MouseEventHandler<HTMLImageElement>
}

export type TicketStatusType = 'backlog' | 'ready' | 'progress' | 'finished';

export type TicketType = {
    title: string;
    description: string;
    status: keyof typeof ColumnType;
}

export enum ColumnType {
    backlog = 'Backlog',
    ready = 'Ready',
    progress = 'In Progress',
    finished = 'Finished'
}