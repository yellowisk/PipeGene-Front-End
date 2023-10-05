export interface IGroupParticipation {
    id: string,
    status: string,
    createdDate: Date,
}

export interface IGroupParticipationView {
    id: string,
    status: string,
    submitterName: string,
    projectName: string,
    createdDate: Date,
}