import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shortener {
    constructor(url) {
        this.url = url
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ default: 0 })
    accesses: number;

    @Column({ nullable: true })
    title?: string

    handleAccess() {
        this.accesses = this.accesses + 1
    }
}