export class MessageList{
    constructor(
        public username: string,
        public message: string,
        public date: string,
        public dateForSort: string,
        public hour: number
    ){}
}